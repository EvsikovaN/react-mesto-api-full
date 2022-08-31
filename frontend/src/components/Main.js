import { useContext } from "react";
import iconAdd from "../../src/images/icons/add.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="row">
          <button
            type="button"
            className="profile__btn profile__btn_avatar"
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></button>
          <div className="profile__info">
            <div className="flex-wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__btn profile__btn_edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__detail">
              {currentUser.about ?? "" }
            </p>
          </div>
        </div>
        <button
          type="button"
          className="profile__btn profile__btn_add"
          onClick={onAddPlace}
        >
          <img src={iconAdd} alt="добавить изображение" />
        </button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
