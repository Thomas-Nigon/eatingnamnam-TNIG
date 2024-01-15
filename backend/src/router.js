const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const recipeControllers = require("./controllers/recipeControllers");
const ustensilControllers = require("./controllers/ustensilControllers");
const tagControllers = require("./controllers/tagControllers");
const userControllers = require("./controllers/userControllers");
const ingredientControllers = require("./controllers/ingredientControllers");
const commentControllers = require("./controllers/commentControllers");
const stepControllers = require("./controllers/stepControllers");

router.get("/recipe", recipeControllers.browse);
router.get("/recipe/:id", recipeControllers.recipeById);
router.get("/recipe/:id/utensils", ustensilControllers.utensilByRecipeId);
router.get("/recipe/:id/comments", commentControllers.commentByRecipeId);
router.get("/recipe/:id/steps", stepControllers.stepByRecipeId);
router.get("/recipe/tag/:id", recipeControllers.recipeByTag);
router.get(
  "/recipe/:id/ingredients",
  ingredientControllers.ingredientListByRecipId
);
router.get("/randomrecipe", recipeControllers.randomRecipe);

router.get("/ustensil", ustensilControllers.browse);
router.get("/tag", tagControllers.browseByTag);
router.get("/user", userControllers.browse);

router.get("/ingredient", ingredientControllers.browse);
router.get("/step", stepControllers.browse);
router.get("/step/:id", stepControllers.stepByRecipeId);

router.get("/grade/:recipeID", commentControllers.rating);

router.get("/items/:id", itemControllers.read);
router.get("/items", itemControllers.browse);
router.post("/items", itemControllers.add);

/* ************************************************************************* */

module.exports = router;
