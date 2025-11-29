-- Создание таблицы для ответов на вопросы формы
CREATE TABLE IF NOT EXISTS form_answers (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    username VARCHAR(100),
    age INTEGER,
    income TEXT,
    occupation TEXT,
    motivation TEXT,
    teamwork TEXT
);

-- Создание индекса для быстрого поиска по user_id
CREATE INDEX IF NOT EXISTS idx_form_answers_user_id ON form_answers(user_id);

