
module.exports = (sequelize, DataTypes) => {
  
  const Book = sequelize.define('books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    author: {
      type: DataTypes.STRING,
    },
    summary: {
      type: DataTypes.STRING,
    },
    publisher: {
      type: DataTypes.STRING,
    },
    pageCount: {
      type: DataTypes.INTEGER,
    },
    readPage: {
      type: DataTypes.INTEGER,
    },
    reading: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    insertedAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  },{
    timestamps :false
  });
  return Book;
};