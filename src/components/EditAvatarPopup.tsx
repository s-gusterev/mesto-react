import { useRef, FormEvent } from "react";

import "../index.css";
import PopupWithForm from "./PopupWithForm";

import { User } from "../types";

type Props = {
  onClose: () => void;
  onUpdateAvatar: (user: Pick<User, "avatar">) => void;
};

function editAvatarPopup(props: Props) {
  const valueRef = useRef<HTMLInputElement>(null!);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: valueRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      btnText="Обновить"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label" htmlFor="input-avatar">
        <input
          ref={valueRef}
          className="popup__input"
          type="url"
          name="avatar"
          id="input-avatar"
          required
          placeholder="Ссылка на аватар"
        />
        <span className="popup__input-error input-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default editAvatarPopup;
