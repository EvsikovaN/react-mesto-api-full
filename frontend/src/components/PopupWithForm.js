function PopupWithForm({ title, name, submit = "Сохранить", children, isOpen, onClose, onSubmit }) {
  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`} id={name}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={`${name}-popup`}
          action="#"
          method="post"
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__save">
            {submit}
          </button>
        </form>
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
