const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const recipe = await tables.recipe.readAll();

    // Respond with the items in JSON format
    res.json(recipe);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const randomRecipe = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const recipe = await tables.recipe.randomRecipe();

    // Respond with the items in JSON format
    res.json(recipe);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  browse,
  randomRecipe,
};