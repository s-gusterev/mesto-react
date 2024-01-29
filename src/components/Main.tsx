import "../index.css";
import Card from "./Card";
import { User, Card as cardType } from "../types";
import { useSelector } from "react-redux";

function Main({
  onEditAvatar,
  onAddPlace,
  onEditProfile,
  onCardClick,
  onCardDelete,
}: {
  onEditAvatar: (isOpen: boolean) => void;
  onAddPlace: (isOpen: boolean) => void;
  onEditProfile: (isOpen: boolean) => void;
  onCardClick: (card: cardType) => void;
  onCardDelete: (card: cardType) => void;
}) {
  const user = useSelector(
    (state: { user: { user: User } }) => state.user.user
  );

  const cards = useSelector(
    (state: { cards: { cards: cardType[] } }) => state.cards.cards
  );

  function handleEditAvatarClick() {
    onEditAvatar(true);
  }

  function handleEditProfileClick() {
    onEditProfile(true);
  }
  function handleAddPlaceClick() {
    onAddPlace(true);
  }

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
          {cards.map((card: cardType) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
