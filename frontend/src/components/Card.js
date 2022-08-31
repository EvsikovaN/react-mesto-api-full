import { useContext } from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`trash ${isOwn ? '' : 'trash_hidden'}`);
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`card__btn card__btn_like ${isLiked ? 'card__btn_like-active' : ''}`); 

  return (
    <div className="card" data-like={isLiked}>
      <img className="card__photo" src={card.link} alt={card.name} onClick={_ => onCardClick(card)}/>
      <div className="card__caption">
        <h2 className="card__place">{card.name}</h2>
        <div className="like">
          <button className={cardLikeButtonClassName} type="button" onClick={_ => onCardLike(card)}></button>
          <span className="like__counter">{card.likes.length}</span>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} type="button" onClick={_ => onCardDelete(card)}></button>
    </div>
  );
}

export default Card;
