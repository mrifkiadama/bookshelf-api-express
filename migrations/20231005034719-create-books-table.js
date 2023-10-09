'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      year:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      author:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      summary :{
        type: Sequelize.STRING,
        allowNull:false,
      },
      publisher :{
        type: Sequelize.STRING,
        allowNull:false,
      },
      pageCount:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      readPage:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      reading :{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false,
      },
      finished:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false,
      },
      insertedAt:{
        type:Sequelize.DATE,
        allowNull:false,
      },
      updatedAt:{
        type:Sequelize.DATE,
        allowNull:false,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
  }
};
