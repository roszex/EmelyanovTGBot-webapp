-- Просмотр всех ответов
SELECT * FROM form_answers ORDER BY id DESC;

-- Просмотр последних 10 ответов
SELECT * FROM form_answers ORDER BY id DESC LIMIT 10;

-- Просмотр ответов конкретного пользователя
SELECT * FROM form_answers WHERE user_id = '@username' ORDER BY id DESC;

-- Статистика по ответам
SELECT 
    COUNT(*) as total_answers,
    AVG(age) as avg_age
FROM form_answers;

-- Просмотр ответов с полной информацией
SELECT 
    id,
    user_id,
    username,
    age,
    income,
    occupation,
    motivation,
    teamwork
FROM form_answers 
ORDER BY id DESC;

