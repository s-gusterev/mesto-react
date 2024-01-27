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
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Card, User } from "../types";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card>({
    isOpen: false,
    name: "",
    link: "",
  });

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });

  useEffect(() => {
    api
      .getProfile()
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });

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

  function handleUpdateUser(user: Pick<User, "name" | "about">) {
    const { name, about } = user;

    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(user: Pick<User, "avatar">) {
    const { avatar } = user;
    api
      .updateAvatar(avatar)
      .then((res) => {
        setCurrentUser({
          avatar: res.avatar,
          name: res.name,
          about: res.about,
          _id: res._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
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
    <CurrentUserContext.Provider value={currentUser}>
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
    </CurrentUserContext.Provider>
  );
}

export default App;
