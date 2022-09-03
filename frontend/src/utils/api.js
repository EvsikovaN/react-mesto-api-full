export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkAuth() {
    const jwt = localStorage.getItem('jwt');
    return jwt ? { Authorization: `Bearer ${jwt}` } : {};
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
      headers: { ...this._headers, ...this._checkAuth() },
    }).then((res) => this._checkResStatus(res));
  }

  setProfileInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: { ...this._headers, ...this._checkAuth() },
      body: JSON.stringify(data),
    }).then((res) => this._checkResStatus(res));
  }

  setProfileAvatar(data) {
    return fetch(`${this._url}users/me/avatar `, {
      method: "PATCH",
      headers: { ...this._headers, ...this._checkAuth() },
      body: JSON.stringify({ avatar: data}),
    }).then((res) => this._checkResStatus(res));
  }

  setLike(data) {
    return fetch(`${this._url}cards/${data}/likes`, {
      method: "PUT",
      headers: { ...this._headers, ...this._checkAuth() },
    }).then((res) => this._checkResStatus(res));
  }

  removeLike(data) {
    return fetch(`${this._url}cards/${data}/likes`, {
      method: "DELETE",
      headers: { ...this._headers, ...this._checkAuth() },
    }).then((res) => this._checkResStatus(res));
  }

  deleteCard(data) {
    return fetch(`${this._url}cards/${data}`, {
      method: "DELETE",
      headers: { ...this._headers, ...this._checkAuth() },
    }).then((res) => this._checkResStatus(res));
  }

  getAllCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: { ...this._headers, ...this._checkAuth() },
    }).then((res) => this._checkResStatus(res));
  }

  pushNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: { ...this._headers, ...this._checkAuth() },
      body: JSON.stringify(data),
    }).then((res) => this._checkResStatus(res));
  }
}

const api = new Api({
  url: "https://api.mesto.evsikova.nomoredomains.sbs/",
  // url: "http://localhost:3001/",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api