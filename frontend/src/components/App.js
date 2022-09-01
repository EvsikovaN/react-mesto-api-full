import { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api.js";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isStatusPopupOpen, setStatusPopupOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getAllCards(), api.getProfileInfo()])
      .then(([cards, userInfo]) => {
        setCards(cards.cards);
        setCurrentUser(userInfo.user);
        navigate('/');
      })
      .catch((err) => console.log(err));
    }
    
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (!isLiked) {
      api
        .setLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard.card : c))
          );
        })
        .catch((err) => console.error(err));
    } else {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard.card : c))
          );
        })
        .catch((err) => console.error(err));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.error(err));
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setStatusPopupOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = (data) => {
    console.log(data)
    api
      .setProfileInfo(data)
      .then((res) => {
        setCurrentUser(res.user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (data) => {
    api
      .setProfileAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res.user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .pushNewCard(data)
      .then((newCard) => {
        // console.log(cards)
        setCards([newCard.card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = (email, password) => {
    auth
      .register(password, email)
      .then((data) => {
        setIsSuccess(true);
        setStatusPopupOpen(true);
        navigate("/signin");
      })
      .catch((error) => {
        setIsSuccess(false);
        setStatusPopupOpen(true);
        console.log(error);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setEmail(email);
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        setStatusPopupOpen(true);
        console.log(error);
      });
  };

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.user.email);
            setLoggedIn(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onSignOut={signOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute path="/" loggedIn={loggedIn}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />

                <Footer />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          ></Route>
          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} />}
          ></Route>
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          submit="Да"
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          name="status"
          isOpen={isStatusPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
