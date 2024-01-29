import { AnimatePresence, motion } from "framer-motion";
import { AppDispatch } from "../store";
import { User, Card as cardType } from "../types";
import { useSelector, useDispatch } from "react-redux";
import { setCardLike } from "../store/cardsSlice";

function Card({
  card,
  onCardClick,
  onCardDelete,
}: {
  card: cardType;
  onCardClick: (card: cardType) => void;
  onCardDelete: (card: cardType) => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(
    (state: { user: { user: User } }) => state.user.user
  );

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

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      <li className="card">
        <div className="card__text">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-section">
            {isLiked && (
              <motion.button
                key={`key-like-${card._id}`}
                initial={{ opacity: 0, scale: 2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="card__like card__like_active"
                type="button"
                onClick={() => dispatch(setCardLike(card))}
              ></motion.button>
            )}
            {!isLiked && (
              <button
                className="card__like"
                type="button"
                onClick={() => dispatch(setCardLike(card))}
              ></button>
            )}

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
    </AnimatePresence>
  );
}

export default Card;
