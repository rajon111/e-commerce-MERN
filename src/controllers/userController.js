const createError = require("http-errors");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { findWithId } = require("../services/findItem");
const { deleteImage } = require("../helper/deleteImage");
const { createJSONWebToken } = require("../helper/jsonWebToken");
const { jwtActivationKey } = require("../secret");

const getUserss = async (req, res, next) => {
  try {
    // search and pageination
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    //searching regEXp
    // .* ---> means ki dea start/end hocche baper nah
    // 'i' means ---> case insensitive
    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    // filter with searching
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };

    // hide password field
    const options = { password: 0 };

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments();

    if (!users) {
      throw createError(404, "User not found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Users successfully returned",
      payload: {
        users,
        pagenations: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };

    const user = await findWithId(User, id, options);

    return successResponse(res, {
      statusCode: 200,
      message: "User successfully returned",
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };

    const user = await findWithId(User, id, options);

    //user image delete from path if exists
    const userImagePath = user.image;

    deleteImage(userImagePath);

    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "User was successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const userExists = await User.exists({ email: email });

    if (userExists) {
      throw createError(
        409,
        "User with this email is already exists. Please sign in."
      );
    }

    //CREATE JWT TOKEN
    const token = createJSONWebToken(
      { name, email, password, phone, address },
      jwtActivationKey,
      "10m"
    );
    console.log(token);

    return successResponse(res, {
      statusCode: 200,
      message: "User was successfully registered.",
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserss,
  getUserById,
  deleteUserById,
  processRegister,
};
