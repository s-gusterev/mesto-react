import React, { useState, useEffect } from "react";
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

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    name: "",
    link: "",
  });

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: ""
  });


  useEffect(() => {
    api.getProfile()
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id
        })
      })
      .catch((err) => {
        console.log(err)
      });

    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err)
      });

    /* 
    function closeEscPoppup(e) {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }
    window.addEventListener('keydown', closeEscPoppup);
    return () => window.removeEventListener('keydown', closeEscPoppup);
*/

  }, []);


  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      name: card.name,
      link: card.link
    })
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({
      isOpen: false
    })
  }


  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleCardDelete(card) {
    api.delCard(card._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== card._id))
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleUpdateUser(user) {

    const { name, about } = user;

    api.editProfile(name, about)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      });

  }

  function handleUpdateAvatar(user) {
    const { avatar } = user;
    api.updateAvatar(avatar)
      .then((res) => {
        setCurrentUser({
          avatar: res.avatar,
          name: res.name,
          about: res.about,
          _id: res._id
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      });
  }


  function handleAddPlaceSubmit(card) {

    const { name, link } = card;

    api.addCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })

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

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />


      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
