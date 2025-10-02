import { useContext } from "react";
import avatar from "../../images/Avatar.png";
import lapiz from "../../images/Vector_lapiz.png";
import vectorAdd from "../../images/Vector_add.png";

import Card from "./components/Card/Card";
import NewCard from "./components/form/NewCard/NewCard";
import EditProfile from "./components/Popup/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/EditAvatar/EditAvatar";
import Popup from "./components/Popup/Popup";
import RemoveCard from "./components/RemoveCard/RemoveCard";

import api from "../../Utils/Api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onCardLike,
  onCardDelete,
  currentUser,
  onAddPlaceSubmit,
  isLoading,
}) {
  function getNewCardPopup() {
    return {
      title: "Nuevo lugar",
      children: (
        <NewCard
          onAddPlaceSubmit={onAddPlaceSubmit}
          isOpen={popup?.title === "Nuevo lugar"}
          isLoading={isLoading}
        />
      ),
    };
  }

  function getEditProfilePopup() {
    return { title: "Editar Perfil", children: <EditProfile /> };
  }

  function getEditAvatarPopup() {
    return {
      title: "Cambiar foto de perfil",
      titleClass: "popup__title-avatar",
      children: <EditAvatar />,
    };
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="avatar"
          />
          <button
            className="profile__avatar-edit-button"
            id="button-openedAvatar"
            type="button"
            onClick={() => onOpenPopup(getEditAvatarPopup())}
          >
            <img
              className="profile__image-avatar"
              src={lapiz}
              alt="editar Avatar"
            />
          </button>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <div className="profile__edit">
            <button
              className="profile__button-edit"
              type="button"
              onClick={() => onOpenPopup(getEditProfilePopup())}
              id="button-opened"
            >
              <img
                className="profile__image-edit"
                src={lapiz}
                alt="boton de editar"
              />
            </button>
          </div>

          <p className="profile__occupation">{currentUser.about}</p>
        </div>

        <div className="profile__add">
          <button
            className="profile__button-add"
            type="button"
            onClick={() => onOpenPopup(getNewCardPopup())}
            id="button-openedAdd"
          >
            <img
              className="profile__image-add"
              src={vectorAdd}
              alt=" boton de agregar"
            />
          </button>
        </div>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            data={card}
            handleOpenPopup={onOpenPopup}
            onRemove={() =>
              onOpenPopup({
                title: "¿Estas seguro/a?",
                titleClass: "popup__title-alert",
                children: (
                  <RemoveCard
                    onDelete={() => onCardDelete(card)}
                    onClose={onClosePopup}
                    isLoading={isLoading}
                  />
                ),
              })
            }
            onCardLike={() => onCardLike(card)}
            onCardDelete={() => onCardDelete(card)}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
