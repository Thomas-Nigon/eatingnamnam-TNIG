import "./Recipe.scss";
import { useEffect, useState } from "react";
import RecipeInfo from "../../components/RecipeInfo/RecipeInfo";
import IngredientCard from "../../components/IngredientCard/IngredientCard";
import AddComment from "../../components/AddComment/AddComment";
import RecipeStep from "../../components/RecipeStep/RecipeStep";
import CommentCard from "../../components/CommentCard/CommentCard";

function Recipe() {
  const [comments, setComments] = useState();
  const [tab, setTab] = useState(1);
  const [ingredientList, setIngredientList] = useState();
  const [ingredientIsActive, setIngredientIsActive] = useState(1);
  const [ustensilIsActive, setUstensilIsActive] = useState(0);
  const [stepIsActive, setStepIsActive] = useState(0);

  const [recipe, setRecipe] = useState();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipe/1`)
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error(error));

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ingredientlist/recipe/1`)
      .then((response) => response.json())
      .then((data) => setIngredientList(data))
      .catch((error) => console.error(error));

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipe/1/comment`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCLickIngredient = () => {
    setTab(1);
    setIngredientIsActive(1);
    setUstensilIsActive(0);
    setStepIsActive(0);
  };
  const handleClickUstensil = () => {
    setTab(2);
    setIngredientIsActive(0);
    setUstensilIsActive(1);
    setStepIsActive(0);
  };

  const handleClickSteps = () => {
    setTab(3);
    setIngredientIsActive(0);
    setUstensilIsActive(0);
    setStepIsActive(1);
  };

  return (
    <div>
      {recipe ? <RecipeInfo recipe={recipe[0]} /> : "loading"}
      {comments
        ? comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              recipe={recipe[0]}
            />
          ))
        : ""}
      <main className="recipe__cardContainer">
        <nav className="recipe__buttonBar">
          <button
            type="submit"
            className={
              ingredientIsActive ? "button__Focus" : "recipe__navButton"
            }
            onClick={handleCLickIngredient}
          >
            Ingrédients
          </button>
          <button
            type="submit"
            className={ustensilIsActive ? "button__Focus" : "recipe__navButton"}
            onClick={handleClickUstensil}
          >
            Ustensiles
          </button>
          <button
            type="submit"
            className={stepIsActive ? "button__Focus" : "recipe__navButton"}
            onClick={handleClickSteps}
          >
            Préparation
          </button>
        </nav>
        <section className="ingredientList">
          {tab === 1 && ingredientList
            ? ingredientList.map((ingredient) => (
                <IngredientCard key={ingredient.id} ingredient={ingredient} />
              ))
            : ""}
        </section>
        {tab === 3 && recipe
          ? recipe.map((step) => (
              <RecipeStep
                key={step.id}
                recipeStep={step.description}
                stepNumber={step.number_step}
              />
            ))
          : ""}
        <AddComment />
      </main>
    </div>
  );
}

export default Recipe;
