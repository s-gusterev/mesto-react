import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import "../index.css";
import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Card, User } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import {
  getProfile,
  updateAvatar,
  updateUserProfile,
} from "../store/userSlice";

function App() {
  const currentUser = useSelector(
    (state: { user: { user: User } }) => state.user.user
  );

  const dispatch = useDispatch<AppDispatch>();

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card>({
    isOpen: false,
    name: "",
    link: "",
  });

  useEffect(() => {
    // Диспатчим действие для загрузки пользователя
    dispatch(getProfile());

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardClick(card: Card) {
    setSelectedCard({
      isOpen: true,
      name: card.name,
      link: card.link,
    });
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({
      isOpen: false,
      name: "",
      link: "",
    });
  }

  /**
   * Обновляет данные пользователя
   *
   * @param user - Объект пользователя, содержащий новую информацию об имени и о себе
   */
  const handleUpdateUser = (user: Pick<User, "name" | "about">) => {
    const { name, about } = user;
    dispatch(updateUserProfile({ name, about }));
    closeAllPopups();
  };

  /**
   * Обрабатывает обновление аватара пользователя.
   *
   * @param user - Объект пользователя с новой информацией об аватаре
   */
  const handleUpdateAvatar = (user: Pick<User, "avatar">) => {
    const { avatar } = user;
    dispatch(updateAvatar(avatar));
    closeAllPopups();
  };

  function handleCardLike(card: Card) {
    if (card && card.likes && card._id) {
      const isLiked = card?.likes.some((i) => i._id === currentUser._id);

      api
        .changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Карточка не найдена");
    }
  }

  function handleCardDelete(card: Card) {
    if (card && card._id) {
      api
        .delCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Карточка не найдена");
    }
  }

  function handleAddPlaceSubmit(card: Card) {
    const { name, link } = card;
    api
      .addCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="root__container">
      <Header />

      <Main
        onEditProfile={setEditProfilePopupOpen}
        onAddPlace={setAddPlacePopupOpen}
        onEditAvatar={setEditAvatarPopupOpen}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />

      <Footer />
      <AnimatePresence mode="wait">
        {isEditProfilePopupOpen && (
          <EditProfilePopup
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
        )}

        {isAddPlacePopupOpen && (
          <AddPlacePopup
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
        )}

        {isEditAvatarPopupOpen && (
          <EditAvatarPopup
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        )}

        {selectedCard.isOpen && (
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
