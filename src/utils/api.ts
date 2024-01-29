type Types = {
  baseUrl: string;
  headers: {
    authorization: string;
    "Content-Type": string;
  };
};

class Api {
  private _headers: {};
  private _baseUrl: string;
  constructor({ baseUrl, headers }: Types) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  // Проверяем ответ от сервера
  _checkResponse(res: { ok: any; json: () => any; status: any }) {
    if (res.ok) {
      // Если все ок - получаем первоначальный ответ от сервера
      return res.json(); // Читаем ответ в формате json
    }
    return Promise.reject(`Ошибка: ${res.status}`); // Если не ок возвращаем отклоненный промис с описанием ошибки
  }

  // Получаем данные о пользователе
  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Получение карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Редактирование профиля
  editProfile(name: string, about: string) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  // Добавление карточки
  addCard(name: string, link: string) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  // Удаление карточки
  delCard(id: string | number) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Удаление лайка
  deleteLike(id: string | number) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Добавление лайка
  addLike(id: string | number) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id: string | number, isLiked: boolean) {
    return isLiked ? this.addLike(id) : this.deleteLike(id);
  }

  // Обновление аватара
  updateAvatar(avatar: string) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "7acf6c30-5a1b-438f-b665-1a702578f3ba",
    "Content-Type": "application/json",
  },
});

export default api;
