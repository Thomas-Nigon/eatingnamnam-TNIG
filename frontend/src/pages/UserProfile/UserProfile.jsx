import { useEffect, useState } from "react";
import Swipper from "../../components/Swipper/Swipper";
import "./UserProfile.scss";

function UserProfil() {
  const [vegan, setVegan] = useState();
  const [mexican, setMexican] = useState();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipe`)
      .then((response) => response.json())
      .then((data) => setVegan(data))
      .catch((error) => console.error(error));
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipe`)
      .then((response) => response.json())
      .then((data) => setMexican(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <img
        className="UserProfil__img__profil"
        src={`${
          import.meta.env.VITE_BACKEND_URL
        }/assets/images/photo-profil-user.jpeg`}
        alt=""
      />
      <img
        className="UserProfil__img"
        src={`${
          import.meta.env.VITE_BACKEND_URL
        }/assets/images/PlateauFromageProfil.png`}
        alt=""
      />
      <h1 className="UserProfil__name">User Profil</h1>
      <section className="Userprofil__form">
        <h4 className="UserProfil__myInfo">Mes infos</h4>

        <form className="UserProfil__info" action="#" method="post">
          <section className="UserProfil__pseudo">
            <label className="UserProfil__Label" htmlFor="pseudo">
              <p className="UserProfil__text">Pseudo:</p>
              <input
                id="pseudo"
                className="UserProfil__pseudo__input"
                type="text"
              />
            </label>
          </section>

          <section className="UserProfil__anniversaire">
            <label className="UserProfil__Label" htmlFor="anniversaire">
              <p className="UserProfil__text__right">Anniversaire:</p>
              <input
                id="anniversaire"
                className="UserProfil__anniversaire__input"
                type="text"
              />
            </label>
          </section>
          <section className="UserProfil__nom">
            <label className="UserProfil__Label" htmlFor="nom">
              <p className="UserProfil__text">Nom:</p>
              <input id="nom" className="UserProfil__nom__input" type="text" />
            </label>
          </section>
          <section className="UserProfil__prenom">
            <label className="UserProfil__Label" htmlFor="prenom">
              <p className="UserProfil__text__right">Prénom:</p>
              <input
                id="prenom"
                className="UserProfil__prenom__input"
                type="text"
              />
            </label>
          </section>
          <section className="UserProfil__mail">
            <label className="UserProfil__Label" htmlFor="email">
              <p className="UserProfil__text__email">Email:</p>
              <input
                id="email"
                className="UserProfil__mail__input"
                type="text"
              />
            </label>
          </section>
        </form>
      </section>
      <button className="UserProfil__button__post" type="button">
        Créer un post +
      </button>
      <h1 className="UserProfil__post__fav">Mes postes</h1>
      <section className="UserProfil__Theme">
        {vegan ? <Swipper recipes={vegan} /> : "loading"}
      </section>

      <h1 className="UserProfil__post__fav">Mes favorits</h1>
      <section className="home__Theme">
        {mexican ? <Swipper recipes={mexican} /> : "loading"}
      </section>
    </>
  );
}

export default UserProfil;
