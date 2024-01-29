import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "../index.css";
import PopupWithForm from "./PopupWithForm";

import { User } from "../types";
import { useSelector } from "react-redux";

type Props = {
  onClose: () => void;
  onUpdateUser: (user: Pick<User, "name" | "about">) => void;
};

function editProfilePopup(props: Props) {
  const currentUser = useSelector(
    (state: { user: { user: User } }) => state.user.user
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleChangeNDescription(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      btnText="Сохранить"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label" htmlFor="input-name">
        <input
          className="popup__input"
          type="text"
          name="name"
          id="input-name"
          required
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__input-error input-name-error"></span>
      </label>
      <label className="popup__label" htmlFor="input-about">
        <input
          className="popup__input"
          type="text"
          name="about"
          id="input-about"
          required
          placeholder="Род деятельности"
          minLength={2}
          maxLength={200}
          value={description}
          onChange={handleChangeNDescription}
        />
        <span className="popup__input-error input-about-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default editProfilePopup;
