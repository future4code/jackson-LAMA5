import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import DataError from "../error/DataError";

export class UserBusiness {

    public async createUser(user: UserInputDTO) {
        
        if (!user.email || user.email.indexOf("@") === -1) {
            throw new DataError("E-mail inválido!")
        }
        if (!user.password || user.password.length < 6) {
            throw new DataError("Senha inválida!")
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(
            id, 
            user.email, 
            user.name, 
            hashPassword, 
            user.role
        );

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    public async getUserByEmail(user: LoginInputDTO) {

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);

        if (!userFromDB) {
            throw new Error("E-mail inválido!");
        }

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

        if (!hashCompare) {
            throw new Error("Senha inválida!");
        }

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });
    
        return accessToken;
    }

    
}