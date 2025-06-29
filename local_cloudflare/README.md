# EmelyanovTGBot - Cloudflare Tunnel Version

Версия бота с Cloudflare Tunnel для стабильной работы Telegram WebApp без проблем с CORS и SSL.

## 🚀 Особенности

- **Cloudflare Tunnel** - стабильный HTTPS без ограничений ngrok
- **Полная система прогресса** - сохранение в user_data.json
- **Telegram WebApp интеграция** - работает без проблем
- **Мобильная адаптация** - картинки отображаются корректно
- **Быстрая скорость** - Cloudflare CDN

## 📁 Структура проекта

```
local_cloudflare/
├── bot.py              # Telegram бот
├── server.py           # Flask сервер
├── user_data.json      # Данные пользователей
├── view_users.py       # Просмотр пользователей
├── test_api.py         # Тестирование API
├── env.local           # Переменные окружения
├── requirements.txt    # Зависимости (включая cloudflared)
├── webapp/             # Веб-приложение
└── README.md           # Этот файл
```

## 🛠 Установка и запуск

### 1. Установка зависимостей

```bash
cd local_cloudflare
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate     # Windows

pip install -r requirements.txt
```

### 2. Установка Cloudflare Tunnel

```bash
# macOS
brew install cloudflared

# Linux
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared

# Windows
# Скачайте с https://github.com/cloudflare/cloudflared/releases
```

### 3. Настройка переменных окружения

Отредактируйте `env.local`:

```env
BOT_TOKEN=your_telegram_bot_token
WEBHOOK_URL=https://your-cloudflare-domain.trycloudflare.com
PORT=8001
```

### 4. Запуск

#### Терминал 1: Запуск сервера
```bash
python server.py
```

#### Терминал 2: Запуск Cloudflare Tunnel
```bash
cloudflared tunnel --url http://localhost:8001
```

#### Терминал 3: Запуск бота
```bash
python bot.py
```

## 🌐 Использование

1. **Получите URL** от Cloudflare Tunnel (например: `https://abc123.trycloudflare.com`)
2. **Обновите WEBHOOK_URL** в `env.local`
3. **Перезапустите бота**
4. **Протестируйте** в Telegram WebApp

## ✅ Преимущества над ngrok

- ✅ **Нет проблем с CORS** в Telegram WebApp
- ✅ **Картинки отображаются** корректно
- ✅ **Данные сохраняются** в user_data.json
- ✅ **Стабильный HTTPS**
- ✅ **Быстрая скорость**
- ✅ **Бесплатно**

## 🔧 Администрирование

### Просмотр пользователей
```bash
python view_users.py
```

### Тестирование API
```bash
python test_api.py
```

### Просмотр логов
```bash
tail -f user_data.json
```

## 📊 API Endpoints

- `GET /api/user/<user_id>` - получить данные пользователя
- `POST /api/user/<user_id>` - обновить данные пользователя
- `GET /api/progress/<user_id>` - получить прогресс
- `POST /api/progress/<user_id>` - обновить прогресс
- `POST /api/save_progress` - сохранить прогресс
- `GET /api/get_progress/<user_id>` - получить прогресс
- `GET /api/users` - получить всех пользователей

## 🆘 Устранение неполадок

### Проблема: Tunnel не запускается
```bash
# Проверьте, что cloudflared установлен
cloudflared --version

# Перезапустите tunnel
cloudflared tunnel --url http://localhost:8001
```

### Проблема: Бот не отвечает
- Проверьте, что сервер запущен на порту 8001
- Убедитесь, что WEBHOOK_URL правильный
- Проверьте токен бота

### Проблема: Данные не сохраняются
- Проверьте логи сервера
- Убедитесь, что user_data.json доступен для записи
- Проверьте CORS настройки

## 📝 Примечания

- **Cloudflare Tunnel** автоматически предоставляет HTTPS
- **URL может меняться** при перезапуске tunnel
- **Данные сохраняются** локально в user_data.json
- **Система готова** к продакшену

## 🎯 Следующие шаги

После тестирования с Cloudflare Tunnel можно развернуть на:
- **Beget** - для продакшена
- **Render** - для бесплатного хостинга
- **Railway** - для простого развертывания 