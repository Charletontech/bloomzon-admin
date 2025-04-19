const {User} = require("../../models");

const bcrypt = require("bcryptjs");

const ErrorResponse = require("../../utils/errorResponse");


const addTransactionPin = async (req) => {
  const user = await User.findByPk(req?.user?.id);

  if (user.pin) throw new ErrorResponse("You have already set your PIN", 403);

  const salt = await bcrypt.genSalt(10);

  const hashedPin = bcrypt.hashSync(req.body.pin, salt);

  await user.update({
    pin: hashedPin
  });
};

module.exports = addTransactionPin;
