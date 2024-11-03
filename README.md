# RestApi

## Рекомендации:

- используйте nvm для установки различных версий nodejs и в корне `nvm use` для переключения на рекомендованную в проекте версию

## Технологии

Движок - [nodejs](https://nodejs.org/en)

Основной фреймворк - [nestjs](https://nestjs.com/) на платформе [fastify](https://fastify.dev/)

Сборщик кода - [swc](https://swc.rs/)

Тесты - [vitest](https://vitest.dev/)

Кеширование - [redis](https://redis.io/)

## Запуск окружения для локальной разработки

Все необходимы настройки передаются через переменные окружения (.env файл)
все они описаны в файле /env.example с комментариями.

Без обязательных переменных проект не запустится так как настроена проверка и валидация!

Для удобного и корректного поднятия всего требуемого окружения используется [Docker](https://www.docker.com/)

Запуск

`docker-compose -f docker-compose.dev.yaml up -d`

Остановка

`docker-compose -f docker-compose.dev.yaml down`

## Запуск проекта

В dev режиме

`npm run dev`

Сборка prod версии

`npm run build`

Запуск в prod

`npm run prod`

## Тесты

Запуск unit тестов в watch режиме

`npm run test:watch`

Запуск unit тестов

`npm run test`

Запуск e2e тестов

`npm run test:e2e`

Запуск всех тестов

`npm run test:all`

Посмотреть отчет по покрытию кода тестами

`npm run test:cov`

Открыть графический интерфейс (в браузере) по тестам

`npm run test:ui`

Полную информацию о доступных командах для различных сценариев работы можно в package.json
там же можно посмотреть все зависимости проекта
