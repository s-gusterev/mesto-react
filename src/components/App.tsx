import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Card, User } from "../types";
import { useAppDispatch } from "../store/hooks";
import {
  getProfile,
  updateAvatar,
  updateUserProfile,
} from "../store/userSlice";

import { getInitialCards, addCard } from "../store/cardsSlice";

const App = () => {
  const dispatch = useAppDispatch();

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card>({
    isOpen: false,
    name: "",
    link: "",
    _id: "",
  });

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getInitialCards());
  }, []);

  const handleCardClick = (card: Card) => {
    setSelectedCard({
      isOpen: true,
      name: card.name,
      link: card.link,
      _id: card._id,
    });
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({
      isOpen: false,
      name: "",
      link: "",
      _id: "",
    });
  };

  const handleUpdateUser = (user: Pick<User, "name" | "about">) => {
    const { name, about } = user;
    dispatch(updateUserProfile({ name, about }));
    closeAllPopups();
  };

  const handleUpdateAvatar = (user: Pick<User, "avatar">) => {
    const { avatar } = user;
    dispatch(updateAvatar(avatar));
    closeAllPopups();
  };

  const handleAddPlaceSubmit = (card: Pick<Card, "name" | "link">) => {
    dispatch(addCard(card));
    closeAllPopups();
  };

  return (
    <div className="root__container">
      <Header />

      <Main
        onEditProfile={setEditProfilePopupOpen}
        onAddPlace={setAddPlacePopupOpen}
        onEditAvatar={setEditAvatarPopupOpen}
        onCardClick={handleCardClick}
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
};

export default App;
