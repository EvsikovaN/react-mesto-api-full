export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResStatus(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Произошла ошибка: ${res.status}`);
  }

  getProfileInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResStatus(res));
  }

  setProfileInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkResStatus(res));
  }

  setProfileAvatar(data) {
    return fetch(`${this._url}users/me/avatar `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: data}),
    }).then((res) => this._checkResStatus(res));
  }

  setLike(data) {
    return fetch(`${this._url}cards/${data}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResStatus(res));
  }

  removeLike(data) {
    return fetch(`${this._url}cards/${data}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResStatus(res));
  }

  deleteCard(data) {
    return fetch(`${this._url}cards/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResStatus(res));
  }

  getAllCards() {
    return fetch(`${this._url}cards `, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResStatus(res));
  }

  pushNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkResStatus(res));
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41/",
  headers: {
    authorization: "6a9581f6-9d1d-43e7-9fc7-f5d661b4a5e9",
    "Content-Type": "application/json",
  },
});

export default api