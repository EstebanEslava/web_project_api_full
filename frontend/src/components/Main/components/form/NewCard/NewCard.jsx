import { useState, useEffect } from "react";

function NewCard({ onAddPlaceSubmit, isOpen, isLoading }) {
  const [form, setForm] = useState({ name: "", link: "" });
  const [errors, setErrors] = useState({ name: "", link: "" });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setForm({ name: "", link: "" });
      setErrors({ name: "", link: "" });
      setIsFormValid(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const noErrors = !errors.name && !errors.link;
    const allFilled = form.name && form.link;
    setIsFormValid(noErrors && allFilled);
  }, [form, errors]);

  function validateField(name, value) {
    let error = "";

    if (name === "name") {
      if (!value) {
        error = "El nombre es obligatorio.";
      } else if (value.length < 2) {
        error = "El nombre debe tener al menos 2 caracteres.";
      } else if (value.length > 30) {
        error = "El nombre no debe superar 30 caracteres.";
      }
    }

    if (name === "link") {
      if (!value) {
        error = "La URL es obligatoria.";
      } else {
        const urlPattern = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/i;
        if (!urlPattern.test(value)) {
          error = "La URL no es válida.";
        }
      }
    }

    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    const errorMessage = validateField(name, value);
    const updatedErrors = { ...errors, [name]: errorMessage };
    setErrors(updatedErrors);

    const noErrors = !updatedErrors.name && !updatedErrors.link;
    const allFilled =
      (name === "name" ? value : form.name) &&
      (name === "link" ? value : form.link);
    setIsFormValid(noErrors && allFilled);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isFormValid) {
      onAddPlaceSubmit(form);
      setForm({ name: "", link: "" });
      setErrors({ name: "", link: "" });
      setIsFormValid(false);
    }
  }

  return (
    <form
      className="popup__form"
      name="agregar"
      id="popup-add-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__field">
        <input
          value={form.name}
          onChange={handleChange}
          className={`popup__input popup__input_type_name-title ${
            errors.name ? "popup__input_type_error" : ""
          }`}
          id="name-title"
          type="text"
          name="name"
          placeholder="Title"
          minLength={2}
          maxLength={30}
          required
        />
        <span
          className={`popup__error ${errors.name ? "popup__error_active" : ""}`}
          id="name-title-error"
        >
          {errors.name}
        </span>
      </label>
      <label className="popup__field">
        <input
          value={form.link}
          onChange={handleChange}
          className={`popup__input popup__input_type_image-url ${
            errors.link ? "popup__input_type_error" : ""
          }`}
          id="image-url"
          type="url"
          name="link"
          placeholder="Image URL"
          required
        />

        <span
          className={`popup__error ${errors.link ? "popup__error_active" : ""}`}
          id="image-url-error"
        >
          {errors.link}
        </span>
      </label>
      <button
        className={`popup__button-submit ${
          !isFormValid ? "popup__button-submit_disabled" : ""
        }`}
        id="submit-image"
        type="submit"
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}

export default NewCard;
