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
