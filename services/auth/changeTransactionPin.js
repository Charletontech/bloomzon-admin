const {User} = require("../../models");
const bcrypt = require("bcryptjs");
const ErrorResponse = require("../../utils/errorResponse");

const changeTransactionPin = async (req) => {
  const user = await User.findByPk(req.user.id);

  const isCurrentPinMatch = await bcrypt.compare(req.body.pin, user.pin);
  // .then((res) => res);

  if (!isCurrentPinMatch) {
    throw new ErrorResponse("Your PIN is incorrect", 400);
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPin = bcrypt.hashSync(req.body.newPin, salt);


  await user.update({
    pin: hashedPin
  });
};

module.exports = changeTransactionPin;
