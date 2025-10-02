function RemoveCard({ onDelete, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDelete();
  }

  return (
    <form
      className="popup__form"
      name="agregar"
      id="popup-alert-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <button
        className="popup__button-submit"
        id="submit-alert"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Eliminando..." : "Sí"}
      </button>
    </form>
  );
}
export default RemoveCard;
