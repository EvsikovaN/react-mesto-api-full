import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace}) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen]);

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: title,
      link: link,
    });
  };

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__form-section">
        <input
          className="popup__input popup__input_type_title"
          type="text"
          placeholder="Название"
          value={title ? title : ''}
          name="name"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChangeTitle}
        />
        <span className="popup__form-error-message"></span>
      </section>
      <section className="popup__form-section">
        <input
          className="popup__input popup__input_type_link"
          type="text"
          placeholder="Сылка на картинку"
          value={link ? link : ''}
          name="link"
          required
          pattern="(http|https):\/\/([\w.]+\/?)\S*"
          onChange={handleChangeLink}
        />
        <span className="popup__form-error-message"></span>
      </section>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
