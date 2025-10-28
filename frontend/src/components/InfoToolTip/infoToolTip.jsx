import React from "react";
import Aprobado from "../../images/union_chulo.png";
import NoAprobado from "../../images/Union_error.png";
import Close from "../../images/Vector_add.png";

function InfoTooltip({ isOpen, onClose, success, message }) {
  if (!isOpen) return null;

  return (
    <div className="tooltip-overlay">
      <div className="tooltip__container">
        <button className="tooltip__close" onClick={onClose}>
          <img src={Close} alt="" />
        </button>
        <div className="tooltip__img">
          {success ? (
            <img src={Aprobado} alt="Aprobado" />
          ) : (
            <img src={NoAprobado} alt="NoAprobado" />
          )}
        </div>
        <h3 className="tooltip__text">
          {success ? "¡Correcto! Ya estás registrado. 🎉" : message}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
