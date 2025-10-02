import { useRef, useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

function EditAvatar({ isLoading }) {
  const avatarRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setError("");
    setIsValid(false);
    if (avatarRef.current) {
      avatarRef.current.value = "";
    }
  }, []);

  function handleChange() {
    const value = avatarRef.current.value;

    if (!value.trim()) {
      setError("La URL no puede estar vacía");
      setIsValid(false);
    } else if (!isValidUrl(value)) {
      setError("Debe ser una URL válida (ej: https://...)");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="popup__form"
      name="Avatar"
      id="popup-edit-avatar"
      noValidate
    >
      <label className="popup__field">
        <input
          ref={avatarRef}
          className="popup__input popup__input_type_image-url"
          id="image-avatar"
          type="url"
          name="link"
          placeholder="Image URL"
          required
          onChange={handleChange}
        />

        <span
          className={`popup__error ${error ? "popup__error_active" : ""}`}
          id="image-avatar-error"
        >
          {error}
        </span>
      </label>
      <button
        className={`popup__button-submit ${
          !isValid ? "popup__button-submit_disabled" : ""
        }`}
        id="submit-avatar"
        type="submit"
        disabled={!isValid || isLoading}
      >
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}

export default EditAvatar;
