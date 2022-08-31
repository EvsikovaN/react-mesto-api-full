import React from "react";
import success from "../images/icons/success.svg";
import error from "../images/icons/error.svg";

function InfoTooltip({ isOpen, onClose, isSuccess, name }) {
  return (
      <section className={`popup ${isOpen ? "popup_opened" : ""}` } id={name}>
        <div className="popup__container">
          <div
            className="popup__status-image"
            style={{
              backgroundImage: `url(${isSuccess ? success : error})`,
            }}
          ></div>
          <p className="popup__status-title">{isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}</p>
          <button
            type="button"
            className="popup__close"
            onClick={onClose}
          ></button>
        </div>
      </section>
  );
}

export default InfoTooltip;
