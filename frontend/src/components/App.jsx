import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Main from "./Main/Main";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Popup from "./Main/components/Popup/Popup";

import api from "../Utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

import * as auth from "../Utils/routes/auth.js";
import Login from "./Login/login.jsx";
import Register from "./Register/register.jsx";
import ProtectedRoute from "./ProtectedRoute/protectedRoute.jsx";
import InfoTooltip from "./InfoToolTip/infoToolTip.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [popup, setPopup] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    success: false,
  });

  const navigate = useNavigate();

  function closeTooltip() {
    setInfoTooltip({ ...infoTooltip, isOpen: false });
    if (infoTooltip.success) {
      navigate("/signin");
    }
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setInfoTooltip({ isOpen: true, success: true });
        return res;
      })
      .catch((err) => {
        setInfoTooltip({ isOpen: true, success: false });
        return Promise.reject(err);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error al iniciar sesión:", err);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          setLoggedIn(true);
          setEmail(data.data.email);
          navigate("/");
        })
        .catch((err) => {
          console.error("Token inválido:", err);
        });
    }
  }, [loggedIn]);

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.error("Error al obtener las tarjetas:", err);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error("Error al obtener usuario:", err);
      });
  }, []);

  const handleUpdateUser = (data) => {
    api
      .editUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => {
        console.error("Error al actualizar usuario:", err);
      });
  };

  function handleCardLike(card) {
    const isLiked = card.isLiked;

    const likePromise = isLiked
      ? api.removeLike(card._id)
      : api.addLike(card._id);

    likePromise
      .then((newCard) => {
        setCards((cards) =>
          cards.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error("Error al dar Like", error));
  }

  function handleCardDelete(cardToDelete) {
    setIsLoading(true);

    api
      .removeCard(cardToDelete._id)
      .then(() => {
        setCards((prevCards) =>
          prevCards.filter((card) => card._id !== cardToDelete._id)
        );
        handleClosePopup();
      })
      .catch((err) => {
        console.error("Error al eliminar la tarjeta:", err);
      })
      .finally(() => setIsLoading(false));
  }

  const handleUpdateAvatar = (data) => {
    api
      .editUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => {
        console.error("Error al actualizar el avatar:", err);
      });
  };

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]);
        handleClosePopup();
      })
      .catch((err) => {
        console.error("Error al agregar tarjeta:", err);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        <div className="page">
          <Header email={email} loggedIn={loggedIn} onLogout={handleLogout} />
          <Routes>
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/signup"
              element={<Register onRegister={handleRegister} />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={loggedIn}>
                  <Main
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                    currentUser={currentUser}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    isLoading={isLoading}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/signin" replace />} />
            <Route />
          </Routes>

          <Footer />

          {popup && (
            <Popup
              isOpen={true}
              onClose={handleClosePopup}
              title={popup.title}
              titleClass={popup.titleClass}
            >
              {popup.children}
            </Popup>
          )}

          <InfoTooltip
            isOpen={infoTooltip.isOpen}
            onClose={closeTooltip}
            success={infoTooltip.success}
          />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
