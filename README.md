# Mesto — React (Vite)

Интерактивный сервис публикации фотографий «Mesto» на React 18. Данные профиля, аватар, карточки и лайки получаются и изменяются через публичный API Яндекс.Практикума.

## Что изменилось в этой ветке

- Переход с CRA на Vite: новые скрипты (`npm run dev/build/preview`), вход через `index.html` и `src/index.jsx`.
- Обновлены файлы компонентов на расширение `.jsx`, добавлен `vite.config.js` c `base` для GitHub Pages.
- Исправлены битые кириллические строки в интерфейсе и заголовке страницы; удалена лишняя кавычка в `AddPlacePopup.jsx`.
- Вынесены настройки API (база и токен) в переменные окружения `VITE_API_BASE_URL`, `VITE_API_TOKEN` (см. `.env.example`).
- Обновлён README: актуальные инструкции по запуску/сборке/деплою и структура проекта.

## Демо

- [GitHub Pages](https://s-gusterev.github.io/mesto-react/).

## Функциональность

- Просмотр и редактирование профиля, обновление аватара.
- Список карточек с фото, лайк/анлайк, удаление своей карточки.
- Добавление карточки, просмотр изображения в попапе.

## Технологии

- React 18 (hooks, Context API), Vite 5, ESM.
- Fetch API для REST-запросов.
- БЭМ-стили, normalize.css, шрифт Inter.

## Быстрый старт

1) Установка зависимостей:

```bash
npm install
```

2) Dev-сервер:

```bash
npm run dev
```

Откроется на `http://localhost:5173` (порт Vite может отличаться).

3) Сборка:

```bash
npm run build
```

4) Предпросмотр сборки:

```bash
npm run preview
```

## Переменные окружения

Создайте `.env` (или используйте `.env.local`) по образцу:

```
VITE_API_BASE_URL=https://mesto.nomoreparties.co/v1/cohort-39
VITE_API_TOKEN=<ваш_токен>
```

## Доступные скрипты

- `npm run dev` — запуск dev-сервера Vite.
- `npm run build` — сборка в `dist`.
- `npm run preview` — локальный предпросмотр `dist`.
- `npm run deploy` — публикация `dist` на GitHub Pages (см. `vite.config.js: base`).

## Структура

- `index.html` — HTML-шаблон Vite.
- `src/index.jsx` — вход приложения.
- `src/components/*` — компоненты UI (попапы, карточки, хедер/футер и т.п.).
- `src/contexts/CurrentUserContext.js` — контекст пользователя.
- `src/utils/api.js` — клиент API.
- `src/blocks/*`, `src/index.css` — стили по БЭМ и агрегатор стилей.

## API

- База: `https://mesto.nomoreparties.co/v1/cohort-39` (можно переопределить через `VITE_API_BASE_URL`).
- Авторизация: токен в `authorization` (см. `VITE_API_TOKEN`).
- Эндпоинты: `GET/PATCH /users/me`, `PATCH /users/me/avatar`, `GET/POST/DELETE /cards`, `PUT/DELETE /cards/:id/likes`.

## Примечания

- Токен хранится на клиенте и не является секретом; используйте индивидуальный токен для тренажёра.
- При деплое на GitHub Pages проверьте `base` в `vite.config.js`; поле `homepage` не требуется.
