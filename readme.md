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

2. `sudo systemctl start mysql` - inicia o serviço do mysql / outra opção é rodar um container do mysql;

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

<!-- 4. `sudo systemctl start mysql` ou rodar um container do mysql; -->

4. `npx sequelize-cli model:generate --name Product --attributes name:string` - comando para criar o primeiro model, denominado como Product, com o sequelize. Um model no contexto do sequelize é uma tabela, uma entidade do banco. Nesse caso, a tabela "Product" foi criado com apenas 1 atributo (coluna), denominado como "name" que receberá valores do tipo "string";

5. O arquivo do model Product gerado automaticamente pelo comando acima vem no padrão de classes (programação orientada a objetos) e isso será mudado para programação funcional.

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

  6. Além dos arquivos "models/product.js" e "models/index.js" o commando `npx sequelize model:generate` criou também um arquivo na pasta migrations e nele, em linhas gerais, está contido as instruções/settings que o ORM utilizará para modificar o banco de dados, nesse caso o "db_sequelize";

  7. `npx sequelize-cli db:migrate` para executar a migration criando assim a tabela "Products" no banco de dados "db_sequelize";

  8. Nesse exemplo, note que o model gerado pelo comando descrito no item 4 possui apenas um atributo, o "name". A inclusão de mais colunas, a nível de model, pode ser realizada manualmente no arquivo models/products.js, já a migration, que ao ser executada vai editar a tabela no banco de dados, é boa prática gerar uma nova migration, pois isso gera um "ponto de recuperação".

  9. Editando o models/product.js (adicionando description e price):

  <!-- <code style="white-space: pre,"> -->

    // models/product.js

    const Product = (sequelize, DataTypes) => {
      const Product = sequelize.define("Product", {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.FLOAT
      });
      return Product;
    };

    module.exports = Product;

  <!-- </code> -->

  10. executando o cli para criar nova migration: `npx sequelize-cli migration:generate --name create-price-description-product-table`

  11. Editando a migration (a criação do arquivo ocorreu mediante o commando line acima, mas é necessário incluir as instruções dentro do up e down - analisar a documentação):

    // migrations/create-price-description-product-table.js

    module.exports = {
      up: async (queryInterface, Sequelize) => [
        queryInterface.addColumn(
          'Products',
          'description',
          {
            type: Sequelize.STRING,
          },
        ),
        queryInterface.addColumn(
          'Products',
          'price',
          {
            type: Sequelize.FLOAT,
          },
        ),
      ],

      down: async (queryInterface, Sequelize) => [
        queryInterface.removeColumn('Products', 'description'),
        queryInterface.removeColumn('Products', 'price'),
      ],
    };


  12. Executa as migrations `npx sequelize-cli db:migrate`

  13. Caso precise desfazer a migration: `npx sequelize-cli db:migrate:undo` executa o método down da migration;

  ## **Criando um seeder**

  1. `npx sequelize-cli seed:generate --name create-default-product` vai criar o arquivo padrão na pasta seeders;

  2. Editando/Incluindo o código teremos:

    module.exports = {
      up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('People', [{
          name: 'iPhone',
          description: 'iPhone XII',
          price: 22000,
          createdAt: new Date(),
          updatedAt: new Date(),
        }], {});
      },

      down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Products', null, {});
      },
    };

## **USE TRANSACTIONS**

Obs: The better way to pass multiple actions (async) in sequelize migration is through transactions. It keeps consistent beetween migrations and database:

Example 1:

    module.exports = {
        up: (queryInterface, Sequelize) => {
            return queryInterface.sequelize.transaction((t) => {
                return Promise.all([
                    queryInterface.addColumn('table_name', 'column_name1', {
                        type: Sequelize.STRING
                    }, { transaction: t }),
                    queryInterface.addColumn('table_name', 'column_name2', {
                        type: Sequelize.STRING,
                    }, { transaction: t })
                ])
            })
        },

        down: (queryInterface, Sequelize) => {
            return queryInterface.sequelize.transaction((t) => {
                return Promise.all([
                    queryInterface.removeColumn('table_name', 'column_name1', { transaction: t }),
                    queryInterface.removeColumn('table_name', 'column_name2', { transaction: t })
                ])
            })
        }
    };

Example 2:

    module.exports = {
      up: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
          await queryInterface.addColumn(
            'Products',
            'description',
            {
              type: Sequelize.STRING,
            },
          );
          await queryInterface.addColumn(
            'Products',
            'price',
            {
              type: Sequelize.FLOAT,
            },
          );
          await transaction.commit();
          return Promise.resolve();
        } catch (error) {
          if (transaction) await transaction.rollback();
          return Promise.reject(error);
        }
      },

      down: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
          await queryInterface.removeColumn('Products', 'description', { transaction });
          await queryInterface.removeColumn('Products', 'price', { transaction });
          await transaction.commit();
          return Promise.resolve();
        } catch (error) {
          if (transaction) {
            await transaction.rollback();
          }
          return Promise.reject(error);
        }
      },
    };
