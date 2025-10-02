import { useEffect } from "react";
import vectorAdd from "../../../../images/Vector_add.png";

function Popup({ isOpen, onClose, title, titleClass = "", children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`popup__container ${!title ? "popup__container-image" : ""}`}
      >
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
          id="button-close"
        >
          <img src={vectorAdd} alt="boton cerrar" />
        </button>

        {title && <h3 className={`popup__title ${titleClass}`}>{title}</h3>}

        {children}
      </div>
    </div>
  );
}

export default Popup;
