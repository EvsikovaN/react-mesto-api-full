function ImagePopup({card, onClose}) {
  return (
    <section className={`popup popup_image ${card && "popup_opened"}`} id="card-image">
      <div className="popup__image-container">
        <img
          className="popup__image"
          src={card?.link}
          alt={card?.name}
        />
        <h2 className="popup__image-title">{card?.name}</h2>
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </section>
  );
}

export default ImagePopup;
