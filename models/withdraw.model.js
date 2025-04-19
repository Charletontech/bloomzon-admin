

module.exports = (sequelize, Sequelize) => {
    const Withdrawal = sequelize.define("Withdrawals", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        reference: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM("pending", "completed", "failed", "declined"),
            defaultValue: "pending",
        },
        trxHash: {
            type: Sequelize.STRING,
        }
    });
  
    return Withdrawal;
};