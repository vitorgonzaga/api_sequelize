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
