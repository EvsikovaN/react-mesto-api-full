import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = useRef();

  useEffect(() => {
    avatar.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__form-section">
        <input
          className="popup__input popup__input_type_link"
          type="text"
          name="link"
          minLength="2"
          ref={avatar}
          required
          placeholder="Введите ссылку на изображение"
        />
        <span className="popup__form-error-message"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
