# DigiBank

## Requirements

- Java 17 or newer
- Node.js 20.19+ or 22.12+
- Docker (for the local PostgreSQL database)

## Run locally

Start PostgreSQL from the repository root and leave it running:

```sh
docker compose up -d
```

Configure the backend database in `mydigibank/mydigibank/.env`. For local
development, copy the example and leave the default values:

```sh
cd mydigibank/mydigibank
cp .env.example .env
```

Edit `.env` and set `SPRING_DATASOURCE_URL` to the JDBC URL from your cloud
provider (format: `jdbc:postgresql://HOST:PORT/DATABASE`), plus its username and
password.

For a deployed backend, put your cloud PostgreSQL provider's **JDBC URL**,
username, and password in this file in the same format. The backend loads `.env`
from its working directory; configure the deployment's working/root directory
as `mydigibank/mydigibank` if your host supports deploying a `.env` file. `.env`
is ignored by Git and must not be committed. If your host does not provide
secret-file support, add the same `SPRING_DATASOURCE_*` values in its
environment-variable settings instead.

Start the backend in one terminal:

```sh
cd mydigibank/mydigibank
sh ./mvnw spring-boot:run
```

Start the frontend in a second terminal:

```sh
cd my-digibank-frontend
npm ci
npm run dev
```

Open the URL printed by Vite (normally http://localhost:5173). The backend listens
on http://localhost:8080 and connects to PostgreSQL at `localhost:5432`. The
database uses a Docker volume, so its data remains across container restarts.
Stop the database with `docker compose down`; use `docker compose down -v` only
if you intentionally want to delete its data.

The backend defaults to the local Compose credentials when `.env` is absent.
Never use the local development credentials in production.

The app runs without third-party API keys. INR transactions work locally;
foreign-currency conversion and automatic translation require API keys. Set
`EXCHANGERATE_API_KEY` and `GOOGLE_API_KEY` in the backend environment to enable
those services. To show additional currencies in the frontend selector, also
set `VITE_EXCHANGE_API_BASE=https://v6.exchangerate-api.com/v6` and
`VITE_EXCHANGE_API_KEY` in `my-digibank-frontend/.env.local`. The frontend
defaults to the local backend; override it with `VITE_BACKEND_URL` in that file
if needed. Do not commit API keys.

## Verify

```sh
# Frontend (from the repository root)
cd my-digibank-frontend
npm run lint
npm run build
```

```sh
# Backend tests use an isolated in-memory H2 database
cd mydigibank/mydigibank
sh ./mvnw test
```
