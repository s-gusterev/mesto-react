import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../index.css";
import Card from "./Card";

function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick, cards }) {

  const user = React.useContext(CurrentUserContext);

  function handleEditAvatarClick() {
    onEditAvatar(true);
  }

  function handleEditProfileClick() {
    onEditProfile(true);
  }
  function handleAddPlaceClick() {
    onAddPlace(true);
  }
  // console.log(currentUser);
  return (
    <main className="main">
      <section className="profile main__profile">
        <div className="profile__info">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${user.avatar})` }}
          >
            <button
              className="profile__btn-edit-avatar"
              type="button"
              aria-label="Редактировать аватар"
              onClick={handleEditAvatarClick}
            ></button>
          </div>
          <div className="profile__name">
            <h1 className="profile__title">{user.name}</h1>
            <p className="profile__subtitle">{user.about}</p>
            <button
              className="profile__btn-edit-profile"
              type="button"
              aria-label="Редактировать данные профиля"
              onClick={handleEditProfileClick}
            ></button>
          </div>
          <button
            className="profile__btn-add-place"
            type="button"
            aria-label="Добавить место"
            onClick={handleAddPlaceClick}
          ></button>
        </div>
        <ul className="cards">
          {cards.map((card) => (
            // console.log(card.owner._id)
            <Card name={card.name} likes={card.likes.length} link={card.link} key={card._id} onCardClick={onCardClick} card={card} ownerId={card.owner._id} />

          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
