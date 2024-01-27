import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

import { Card as cardType } from "../types";

function Card({
  card,
  onCardLike,
  onCardClick,
  onCardDelete,
}: {
  card: cardType;
  onCardLike: (card: cardType) => void;
  onCardClick: (card: cardType) => void;
  onCardDelete: (card: cardType) => void;
}) {
  const currentUser = useContext(CurrentUserContext);

  const checkIsOwn = (card: cardType) => {
    if (!card.owner) {
      return false;
    }

    return card.owner._id === currentUser._id;
  };

  const isOwn = checkIsOwn(card);

  const cardDeleteButtonClassName = `card__del ${
    isOwn ? "card__del_visible" : "card__del_hidden"
  }`;

  const checkIsLiked = (card: cardType) => {
    if (!card.likes) {
      return false;
    }
    return card.likes.some((i) => i._id === currentUser._id);
  };

  const isLiked = checkIsLiked(card);

  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  const counterLikes = (card: cardType) => {
    if (!card.likes) {
      return 0;
    }
    return card.likes.length;
  };

  const likes = counterLikes(card);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <div className="card__text">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-section">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-info">{likes}</span>
        </div>
      </div>
      <div
        className="card__img"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      ></div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}

export default Card;
