const createHttpError = require("http-errors");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const findWithId = async (Model,id, options={}) => {
  try {
    
    const item = await Model.findById(id, options);

    if (!item) {
      throw createHttpError(404, `${Model.modelName} does not exists with this id`);
    }
    return item;

  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(404, "Invalid Item id ");
    }
    throw error;
  }
};


module.exports = {findWithId};