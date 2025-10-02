import vectorAdd from "../../../../../images/Vector_add.png";

function ImagePopup({ card, onClose }) {
  if (!card) return null;

  return (
    <div className="popup__container-image">
      <img
        className="popup__image"
        id="popup-image"
        src={card.link}
        alt={card.name}
      />
      <h2 id="name-popup" className="popup__title-image">
        {card.name}
      </h2>
    </div>
  );
}

export default ImagePopup;
