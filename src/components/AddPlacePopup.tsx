import { FormEvent, ChangeEvent, useState } from "react";
import "../index.css";
import PopupWithForm from "./PopupWithForm";
import { Card } from "../types";

type Props = {
  onClose: () => void;
  onAddPlace: (card: Card) => void;
};

function AddPlacePopup(props: Props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleChangeLInk(e: ChangeEvent<HTMLInputElement>) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card-add"
      btnText="Создать"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label" htmlFor="input-place">
        <input
          className="popup__input "
          type="text"
          name="place"
          id="input-place"
          required
          placeholder="Название"
          minLength={2}
          maxLength={30}
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__input-error input-place-error"></span>
      </label>
      <label className="popup__label" htmlFor="input-image">
        <input
          className="popup__input"
          type="url"
          name="image"
          id="input-image"
          required
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleChangeLInk}
        />
        <span className="popup__input-error input-image-error"></span>
      </label>
      "
    </PopupWithForm>
  );
}

export default AddPlacePopup;
