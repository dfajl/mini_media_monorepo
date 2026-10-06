# Mini Media — фронтенд

React 19 + Redux Toolkit + TypeScript + Vite. Бэкенд NestJS находится в соседней папке `api`.

## Запуск

Требуется Node.js 20.19+ или 22.12+ (рекомендуется Node.js 24).

```sh
cd web
npm install
```

Скопируйте `.env.example` в `.env.development`, если файла ещё нет.
Переменная `VITE_API_URL` должна указывать на запущенный API, например `http://localhost:3000`.
Для production задайте её в `.env.production` или в окружении сборки.

```sh
npm run dev
```

Откройте `http://localhost:5173`. Этот порт также разрешён в CORS бэкенда.

## Структура для изучения React

- `src/main.tsx` — точка входа: `createRoot`, роутер и Redux `Provider`.
- `src/App.tsx` — маршруты `/login` и `/account` (React Router).
- `src/features/auth/ui/LoginView.tsx` — форма с управляемыми полями: `value` и `onChange`.
- `src/features/auth/hooks/useLogin.ts` — hook с состоянием формы (`useState`), валидацией и запросами к API.
- `src/stores/index.ts` — Redux store, созданный через `configureStore`, и типы состояния/dispatch.
- `src/stores/auth.ts` — slice авторизации: пользователь, токен, действия `setAuth` и `logout`, селекторы.
- `src/stores/hooks.ts` — типизированные hooks `useAppDispatch` и `useAppSelector`.
- `src/ui-kit` — переиспользуемые React-компоненты; CSS вынесен в соседние файлы.
- `src/core/api-client` — HTTP-клиент на `fetch`.

После успешного запроса `useLogin` вызывает `dispatch(setAuth(...))`, а экран профиля читает пользователя через `useAppSelector(selectUser)`.
Выход вызывает `dispatch(logout())` и очищает данные авторизации. Поля формы остаются локальными в `useState`.
Redux DevTools позволяет смотреть изменения состояния и отправленные действия в браузере.

Сессия хранится в памяти и сбрасывается после обновления страницы, как в прежнем фронтенде.
Флажок Remember me пока не добавляет сохранение сессии. Регистрация возвращает профиль без токена — это текущий контракт API.

## Проверки

```sh
npm run build
npm run test:unit -- --run
npm run lint
```

`build` проверяет TypeScript и собирает приложение в `dist`.
Тесты проверяют маршруты, валидацию, вход, регистрацию, выход и ошибки API с подменой `fetch`.
Для React-компонентов в редакторе достаточно встроенной поддержки TypeScript/TSX.
