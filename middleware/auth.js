const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const { User, Role, RolePermission } = require("../models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { matchpassword, containsAny } = require("../utils/auth");
const { Op } = require("@sequelize/core");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (!req.headers.authorization) {
    return next(
      new ErrorResponse(
        "authorization headers require to access this route",
        401
      )
    );
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Bad authorization header", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findByPk(decoded.id);
    if (!req.user) {
      return next(
        new ErrorResponse(
          "Unauthenticated, Kindly contact support@bloomzon.com for more information",
          401
        )
      );
    }

    if (req.user?.adminLocked) {
      return next(
        new ErrorResponse(
          "Your access has been disabled, Kindly contact support@bloomzon.com for more information",
          401
        )
      );
    }
    const lastActive = Date.now();
    req.user.update({
      lastActive: lastActive,
    });

    next();
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Bad authorization header", 401));
  }
});

exports.verified = asyncHandler(async (req, res, next) => {
  // console.log(req.user.isVerified)
  if (!req.user.isVerified) {
    return next(
      new ErrorResponse(
        `User not authorised to access this route, verify user`,
        403
      )
    );
  }
  next();
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

exports.verifyPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req?.user?.id);

  const password = req.body?.password;

  if (!password)
    return next(new ErrorResponse("Your password is required", 400));

  const isMatch = await matchpassword(req.body?.password || "", user);

  if (!isMatch) throw new ErrorResponse("Password is incorrect", 400);

  next();
});

exports.verifyPin = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req?.user?.id);

  if (user?.isPinLockedOut) {
    return next(
      new ErrorResponse(
        "Transaction locked on account, please go to Settings > Security and reset your PIN to enable transactions on this account",
        403
      )
    );
  }

  const pin = req?.body?.pin;

  const userPin = user?.pin;

  if (!userPin)
    return next(
      new ErrorResponse(
        `You do not have a transaction PIN set, please set your transaction PIN`,
        400
      )
    );

  if (!pin) return next(new ErrorResponse("Pin is required", 400));

  const is_correct_pin = await bcrypt.compare(pin, userPin);

  if (!is_correct_pin) {
    if (user?.pin_attempts >= 5) {
      // Lockout user
      await user.update({
        isPinLockedOut: true,
      });

      return next(
        new ErrorResponse(
          "Maximum pin trial exceeded, transactions on this account has been locked for safety, please reset your PIN to carry out transaction",
          403
        )
      );
    }
    await user.update({
      pin_attempts: user.pin_attempts + 1,
    });
    return next(
      new ErrorResponse(
        `Pin incorrect, trial ${
          user.pin_attempts
        } of 5. If you try an incorrect PIN for the next ${
          5 - user.pin_attempts
        } times, transactions will be locked on this account until you reset your PIN`,
        400
      )
    );
  }

  if (user.pin_attempts > 0) {
    await user.update({
      pin_attempts: 0,
    });
  }
  next();
});

exports.validateActionToken = asyncHandler(async (req, res, next) => {
  const token = req.body?.token;

  const actionToken = crypto.createHash("sha256").update(token).digest("hex");

  // console.log(actionToken, token);

  const user = await User.findOne({
    where: [
      { appActionToken: actionToken },
      { appActionTokenExpire: { [Op.gt]: Date.now() } },
    ],
  });

  if (!user) return next(new ErrorResponse("Invalid token", 400));

  await user.update({
    appActionToken: "",
    appActionTokenExpire: null,
  });

  next();
});

exports.isUserPermitted = (...roles) => {
  return async (req, res, next) => {
    if (req.user?.roles?.length < 1 && req.user?.extraPermissions?.length < 1) {
      return next(
        new ErrorResponse(
          `You don't have the adequate permissions to access this route.`,
          403
        )
      );
    }
    let userRolesNew = [];
    const userDetails = await User.findByPk(req.user.id);
    let userRoles = userDetails?.roles;
    for (let iv6 = 0; iv6 < userRoles?.length; iv6++) {
      const roleId = userRoles[iv6];
      const userRole = await Role.findByPk(roleId);
      let userRolesPermissions = userRole?.permissions;
      for (let iv4 = 0; iv4 < userRolesPermissions?.length; iv4++) {
        let userRolesPermissionId = userRolesPermissions[iv4];
        const userRolesPermission = await RolePermission.findByPk(
          userRolesPermissionId
        );
        userRolesNew.push(userRolesPermission.name);
      }
    }
    // console.log(userRolesNew)
    // console.log(roles)
    const isAnyIncluded = await containsAny(roles, userRolesNew);
    if (!isAnyIncluded) {
      return next(
        new ErrorResponse(
          `You don't have the adequate permissions to access this route.`,
          403
        )
      );
    }

    next();
  };
};
