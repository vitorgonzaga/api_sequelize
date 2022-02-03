# **First api with sequelize**

### **Dependências do projeto:**

<div style="margin-bottom: 10px" >
  <p>
    <code style="white-space: pre">
    "dependencies": {
      "body-parser": "^1.19.1",
      "express": "^4.17.2",
      "mysql2": "^2.3.3",
      "sequelize": "^6.15.0",
      "sequelize-cli": "^6.4.1"
    }
    </code>
  </p>
</div>

1. `npx sequelize-cli init` -  cria a estrutura de pastas automaticamente;

2. `sudo systemctl start mysql` - inicia o serviço do mysql;

3. Criar o database (através do workbench) com o mesmo nome descrito no arquivo config/config.json;

<div style="margin-bottom: 10px" >
  <p>
    <code style="white-space: pre">
    "development": {
      "username": "%USER_MYSQL%",
      "password": "%PASSWORD_MYSQL%",
      "database": "db_sequelize",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    </code>
  </p>
</div>

<div align="center">
  <img width="70%" src="pictures/Screenshot from 2022-02-03 11-41-44.png">
</div>

</br>

4. `sudo systemctl start mysql` ou rodar um container do mysql;

5. `npx sequelize-cli model:generate --name Product --attributes name:string` - comando para criar o primeiro model, denominado como Product, com o sequelize. Um model no contexto do sequelize é uma tabela, uma entidade do banco. Nesse caso, a tabela "Product" foi criado com apenas 1 atributo (coluna), denominado como "name" que receberá valores do tipo "string";

> - O arquivo do model Product gerado automaticamente pelo comando acima vem no padrão de classes (programação orientada a objetos) e isso será mudado para programação funcional.

