module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("Transactions", {
      id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
      },
      category: {
          type: Sequelize.STRING
      },
      description: {
          type: Sequelize.STRING
      },
      amount: {
          type: Sequelize.INTEGER
      },
      metadata: {
        type: Sequelize.STRING
      }
    });
  
    return Transaction;
  };