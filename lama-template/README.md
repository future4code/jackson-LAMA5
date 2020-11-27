## LAMA

Como você deve saber muito bem, o nosso querido chefinho Astrodev é uma pessoa com Networking incrível e ele conhece vários artistas estrelados. Além disso, ele também é um grande ~~megalomaníaco~~ visionário e está planejando fazer um grande evento: o **LAMA**, *Labenu Musical Awards*, um festival  com várias bandas famosas para a formatura da sua turma e, no final, vocês podem eleger a banda que mais gostaram! Entretanto, na opinião dele, vocês só serão merecedores se entregarem um sistema impecável que permita o gerenciamento completo desses shows.

Para isso já deixamos algumas tabelas prontas para vocês não precisarem se preocupar com a modelagem do banco. Deixamos também um template do projeto já com a estrutura da parte de usuários. Vocês podem usá-las a vontade, mas, se quiser fazer do zero sem esse auxílio, também pode.

**Query que cria a tabela de Bandas**

```sql
CREATE TABLE IF NOT EXISTS NOME_TABELA_BANDAS (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  music_genre VARCHAR(255) NOT NULL,
  responsible VARCHAR(255) UNIQUE NOT NULL 
)
```

**Query que cria a tabela de Shows**

```sql
CREATE TABLE IF NOT EXISTS NOME_TABELA_SHOWS (
  id VARCHAR(255) PRIMARY KEY,
  week_day VARCHAR(255) NOT NULL,
  start_time INT NOT NULL,
  end_time INT NOT NULL,
  band_id VARCHAR(255) NOT NULL,
  FOREIGN KEY(band_id) REFERENCES NOME_TABELA_BANDAS(id)
)
```

**Query que cria tabela de usuários**

```sql
CREATE TABLE IF NOT EXISTS NOME_TABELAS_USUÁRIOS (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
)
```

O festival terá duração fixa de 3 dias (sexta, sábado e domingo), começando sempre as 08h e acabando as 23h, totalizando 15h de show a cada dia. As funcionalidades básicas do projeto devem ser:

- 1. Cadastro

    O nosso sistema deve permitir o registro os usuários que irão usá-lo. Para se cadastrar, é necessário passar um email, um nome e uma senha, e também uma função dentro do sistema. Você pode ser um cliente (usuário normal) ou um administrador do sistema (admin). O usuário deve poder se logar automaticamente após o cadastro. Caso tenha interesse, tente tornar o código de cadastro mais testável utilizando a inversão de dependência.


- 2. Login

    Para realizar o login, basta informar seu e-mail e a sua senha. O retorno deve conter o token de autenticação do usuário. Caso tenha interesse, tente tornar o código de cadastro mais testável utilizando a inversão de dependência.

- 3. Endpoint de registrar banda

    O nosso sistema deve deixar registrado todas as bandas que participarão dos três dias de shows. Para uma banda ser criada, precisamos das informações: nome, gênero musical principal a qual ela se identifica e o nome de um responsável (que pode ser qualquer membro dela). Não podem existir duas bandas com o mesmo nome. **Somente administradores** podem registrar bandas. Faça ao menos dois testes para checar se os dados estão corretos, sendo um em caso de erro e outro em caso de acerto.

- 4. Endpoint de visualização de detalhes sobre a banda

    Esse endpoint deve receber o id **ou** o nome da banda e retornar as todas as informações salvas sobre ela.

- 5. Endpoint de adicionar um show a um dia

    Para cadastrar um show, o endpoint precisa do id da banda, o dia (sexta, sábado ou domingo) e o horário em que ela irá se apresentar. Deve haver uma validação para indicar se o horário é válido (ou seja, se está entre 08h e 23h). Além disso os shows só podem ser marcados em horários redondos, ou seja, pode ser 08h - 09h ou 09h - 13h mas não pode ser 09h - 10h30 ou 10h30 - 14h.

    Caso já exista um show marcado para o dia e o horário em questão, o seu endpoint deve retornar um erro. Faça ao menos dois testes para checar se os dados estão corretos, sendo um em caso de erro e outro em caso de show em data repetida.

- 6. Endpoint de pegar todos os shows de uma data

    Recebe um dia (sexta, sábado ou domingo) e retorna todos os shows daquela data (ordenados pelo horário), mostrando somente o nome da banda e o gênero musical principal.

- Desafios

    Realize os exercícios abaixo em ordem.

    - 7. Endpoint de criar um ingresso

        O caso de uso desse endpoint é o administrador do sistema querendo criar ingressos para serem vendidos. Para criar, precisa indicar: nome do ingresso, valor, o id do evento e a quantidade de ingressos. No banco, você deve guardar a quantidade de ingressos totais e criar um campo "quantidade de ingressos vendidos" com o valor 0 para guardar esse registro. **Somente administradores** podem registrar ingressos.

    - 8. Comprar ingresso

        Deve receber a quantidade de ingressos e o nome. Deve retornar erros específicos para um nome inválido, ingresso não encontrado e quantidade inválida (ou seja se existem menos ingressos disponíveis do que o usuário quer comprar)

    - 9.  Adicionar foto

        Você deve criar um endpoint que adiciona uma foto para a galeria de um evento. Elas devem ser armazenadas como links no banco de dados.

    - 10. Pegar todas as fotos

        O endpoint receberá o identificador do evento e devolverá todas as fotos deste.

        **Bônus:** Crie uma página de Frontend em React e para que o administrador consiga entrar no site e ver todas as fotos que foram tiradas, consumindo o endpoint que você criou. Não precisa fazer o resto do front-end da aplicação, não se preocupe. A forma da página é livre, e você pode criar outro projeto, apartado desse, se preferir, para fazer esse pedacinho.