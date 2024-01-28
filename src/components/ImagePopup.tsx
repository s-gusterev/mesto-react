import "../index.css";
import { Card } from "../types";
import { motion } from "framer-motion";

function ImagePopup({ card, onClose }: { card: Card; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      key={card._id}
      className="popup popup_background_dark popup_type_picture root__popup"
    >
      <motion.div
        className="popup__container"
        initial={{ y: 70, scale: 0.5 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: -50, scale: 1.1 }}
        transition={{ duration: 1 }}
        key={`key-${card._id}`}
      >
        <img src={card.link} alt={card.name} className="popup__img" />
        <p className="popup__img-description">{card.name}</p>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </motion.div>
    </motion.div>
  );
}

export default ImagePopup;
