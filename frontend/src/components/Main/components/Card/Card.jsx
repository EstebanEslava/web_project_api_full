import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

import RemoveCard from "../../../../images/Trash.svg";
import Like from "../../../../images/Vector_corazon.svg";
import LikeFull from "../../../../images/Union.svg";
import ImagePopup from "../Popup/ImagePopup/ImagePopup";

function Card({ data, handleOpenPopup, onCardLike, onRemove }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, isLiked = false } = data;

  function handleLikeClick() {
    onCardLike(data);
  }

  function handleRemoveClick() {
    onRemove();
  }

  const imageComponent = {
    link,
    children: <ImagePopup card={{ name, link }} />,
  };
  return (
    <div className="element">
      {link && (
        <img
          className="element__image"
          src={link}
          alt={name}
          onClick={() => handleOpenPopup(imageComponent)}
        />
      )}

      <div className="element__text-like">
        <button
          className="element__remove-card"
          id="remover-card"
          onClick={handleRemoveClick}
        >
          <img src={RemoveCard} alt="remover card" />
        </button>
        <p className="element__text">{name}</p>
        <button
          className="element__button-like"
          id="button-like"
          onClick={handleLikeClick}
        >
          <img
            src={isLiked ? LikeFull : Like}
            alt={isLiked ? "Quitar like" : "Dar like"}
          />
        </button>
      </div>
    </div>
  );
}

export default Card;
