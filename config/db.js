const db = require("../models");

const connectDB = async () => {
  try {
    await db.sequelize
      .authenticate()
      .then(() => console.log("Database connected".green.bold))
      .catch((err) =>
        console.error(
          `Error connecting to database:${err.message}`.red.underline.bold
        )
      );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const syncedDB = async () => {
  try {
    await db.sequelize
      .sync()
      .then(() => {
        console.log(`Synced db.`.blue.underline.bold);
      })
      .catch((err) => {
        console.log(`Failed to sync db:  ${err.message}`.red.underline.bold);
      });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    db.sequelize.close();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB, syncedDB, disconnectDB };
