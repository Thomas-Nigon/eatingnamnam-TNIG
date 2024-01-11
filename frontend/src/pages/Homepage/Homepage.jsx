import "./Homepage.scss";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Swipper from "../../components/Swipper/Swipper";
import { NavContext } from "../../components/Contexts/navBarContext";

function Homepage() {
  const { setActiveButton, setRecipeID } = useContext(NavContext);
  const [recipe, setRecipe] = useState();
  const [vegan, setVegan] = useState();
  const [mexican, setMexican] = useState();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/randomrecipe`)
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error(error));

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipe`)
      .then((response) => response.json())
      .then((data) => setVegan(data))
      .catch((error) => console.error(error));

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipe`)
      .then((response) => response.json())
      .then((data) => setMexican(data))
      .catch((error) => console.error(error));
  }, []);
  const handleClick = () => {
    setActiveButton("recipe");
    setRecipeID(recipe.id);
  };
  return (
    <main className="home">
      <section className="home__recipeDay">
        <h1 className="home__recipeDay__title">Recette du jour</h1>
        {recipe ? (
          <Link to="/recipe" onClick={handleClick}>
            <RecipeCard recipe={recipe} />{" "}
          </Link>
        ) : (
          "loading"
        )}
      </section>
      <section className="home__Theme">
        <h2 className="home__Theme__title">Recettes vegan</h2>
        {vegan ? <Swipper recipes={vegan} /> : "loading"}
      </section>
      <section className="home__Theme">
        <h3 className="home__Theme__title">Recettes mexicaine</h3>
        {mexican ? <Swipper recipes={mexican} /> : "loading"}
      </section>
    </main>
  );
}

export default Homepage;
