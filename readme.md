# **First api with sequelize**

### **Dependências do projeto:**

<!-- <div style="margin-bottom: 10px" > -->
  <!-- <p style="white-space: pre"> -->
  <code style="white-space: pre,>

    "dependencies": {
      "body-parser": "^1.19.1",
      "express": "^4.17.2",
      "mysql2": "^2.3.3",
      "sequelize": "^6.15.0",
      "sequelize-cli": "^6.4.1"
    }

  </code>
  <!-- </p> -->
<!-- </div> -->

1. `npx sequelize-cli init` -  cria a estrutura de pastas automaticamente;

2. `sudo systemctl start mysql` - inicia o serviço do mysql;

3. Criar o database (através do workbench) com o mesmo nome descrito no arquivo config/config.json;

  <code style="white-space: pre,">

    // config/config.json -> posteriormente convertido para config.js (para trabalhar com variáveis de ambiente)

    "development": {
      "username": "%USER_MYSQL%",
      "password": "%PASSWORD_MYSQL%",
      "database": "db_sequelize",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },

  </code>

<div align="center">
  <img width="70%" src="pictures/Screenshot from 2022-02-03 11-41-44.png">
</div>

</br>

4. `sudo systemctl start mysql` ou rodar um container do mysql;

5. `npx sequelize-cli model:generate --name Product --attributes name:string` - comando para criar o primeiro model, denominado como Product, com o sequelize. Um model no contexto do sequelize é uma tabela, uma entidade do banco. Nesse caso, a tabela "Product" foi criado com apenas 1 atributo (coluna), denominado como "name" que receberá valores do tipo "string";

6. O arquivo do model Product gerado automaticamente pelo comando acima vem no padrão de classes (programação orientada a objetos) e isso será mudado para programação funcional.

</br>

### **Código gerado automaticamente no arquivo model/product.js:**

</br>

<!-- <div style="margin-bottom: 10px"> -->
  <code style="white-space: pre,">

    // models/product.js

    'use strict';
    const {
      Model
    } = require('sequelize');
    module.exports = (sequelize, DataTypes) => {
      class Product extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models) {
          // define association here
        }
      }
      Product.init({
        name: DataTypes.STRING
      }, {
        sequelize,
        modelName: 'Product',
      });
      return Product;
    };
  </code>
<!-- </div> -->

</br>

### **Convertendo para programação funcional**

</br>

  <code style="white-space: pre,">

    // models/product.js

    const Product = (sequelize, DataTypes) => {
      const Product = sequelize.define("Product", {
        name: DataTypes.STRING,
      });
      return Product;
    };

    module.exports = Product;

  </code>

  7. Além dos arquivos "models/product.js" e "models/index.js" o commando `npx sequelize model:generate` criou também um arquivo na pasta migrations e nele, em linhas gerais, está contido as instruções/settings que o ORM utilizará para modificar o banco de dados, nesse caso o "db_sequelize";

  8. `npx sequelize-cli db:migrate` para executar a migration criando assim a tabela "Products" no banco de dados "db_sequelize";





