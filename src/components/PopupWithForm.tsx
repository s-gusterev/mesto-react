import { FormEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../index.css';

type PopupWithFormProps = {
  name: string;
  title: string;
  btnText: string;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

const PopupWithForm = (props: PopupWithFormProps) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        props.onClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      key={props.name}
      className={`popup popup_background_light popup_type_${props.name} root__popup`}
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
          props.onClose();
        }
      }}
    >
      <motion.form
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
        key={props.title}
        className="popup__container popup__container_type_form"
        name={props.name}
        // noValidate
        onSubmit={props.onSubmit}
      >
        <h2 className="popup__title">{props.title}</h2>

        {props.children}

        <button className="popup__btn root__btn" type="submit">
          {props.btnText}
        </button>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
      </motion.form>
    </motion.div>
  );
};

export default PopupWithForm;
