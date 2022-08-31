import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__form-section">
        <input
          className="popup__input popup__input_type_name"
          type="text"
          name="name"
          value={name ? name : ''}
          minLength="2"
          maxLength="40"
          onChange={handleChangeName}
          required
        />
        <span className="popup__form-error-message"></span>
      </section>
      <section className="popup__form-section">
        <input
          className="popup__input popup__input_type_detail"
          type="text"
          name="about"
          minLength="2"
          maxLength="200"
          onChange={handleChangeDescription}
          value={description ? description : ''}
          required
        />
        <span className="popup__form-error-message"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
