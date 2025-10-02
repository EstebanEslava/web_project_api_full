import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

function EditProfile({ onSubmit, isLoading, isOpen }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
      setNameError("");
      setDescriptionError("");
      setIsValid(true);
    }
  }, [isOpen, currentUser]);

  useEffect(() => {
    const isFormValid = !nameError && !descriptionError && name && description;
    setIsValid(isFormValid);
  }, [nameError, descriptionError, name, description]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (!value) {
      setNameError("El nombre no puede estar vacío");
    } else if (value.length < 2 || value.length > 40) {
      setNameError("El nombre debe tener entre 2 y 40 caracteres");
    } else {
      setNameError("");
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    if (!value) {
      setDescriptionError("La descripción no puede estar vacía");
    } else if (value.length < 2 || value.length > 200) {
      setDescriptionError("Debe tener entre 2 y 200 caracteres");
    } else {
      setDescriptionError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleUpdateUser({ name, about: description });
    }
  };

  return (
    <form
      className="popup__form"
      name="editar"
      id="popup-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input-name"
          id="input-name"
          type="text"
          name="name"
          placeholder="Nombre"
          minLength={2}
          maxLength={40}
          value={name}
          onChange={handleNameChange}
          required
        />

        <span
          className={`popup__error ${nameError ? "popup__error_active" : ""}`}
          id="input-name-error"
        >
          {nameError}
        </span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_occupation"
          id="input-occupation"
          type="text"
          name="occupation"
          placeholder="Acerca de mí"
          minLength={2}
          maxLength={200}
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <span
          className={`popup__error ${
            descriptionError ? "popup__error_active" : ""
          }`}
          id="input-occupation-error"
        >
          {descriptionError}
        </span>
      </label>
      <button
        className={`popup__button-submit ${
          !isValid ? "popup__button-submit_disabled" : ""
        }`}
        id="submit"
        type="submit"
        disabled={!isValid || isLoading}
      >
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}

export default EditProfile;
