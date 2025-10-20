# Meal Planner Backend

Aplikacja do planowania posiłków i generowania list zakupów. Ten projekt to backend oparty na Node.js i TypeScript, używający frameworka Express oraz ORM Prisma do zarządzania bazą danych PostgreSQL.

## Uruchamianie aplikacji

Aby uruchomić aplikację lokalnie, wykonaj poniższe kroki w terminalu. Upewnij się, że masz zainstalowany **Docker Desktop**.

1.  **Uruchom kontener z bazą danych:**
    Jeśli kontener bazy danych nie jest uruchomiony, aktywuj go poleceniem:
    ```bash
    docker start meal-planner-db
    ```
    Jeśli uruchamiasz go po raz pierwszy, użyj polecenia:
    ```bash
    docker run --name meal-planner-db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres:14
    ```

2.  **Zainstaluj zależności i uruchom serwer:**
    Przejdź do katalogu projektu i zainstaluj zależności (jeśli jeszcze tego nie zrobiłeś):
    ```bash
    npm install
    ```
    Następnie uruchom serwer deweloperski:
    ```bash
    npm run dev
    ```
    Serwer będzie dostępny pod adresem `http://localhost:3000`.

## Przydatne polecenia

-   `npx prisma migrate dev --name <nazwa_migracji>`: Tworzy i stosuje nową migrację schematu bazy danych. Używaj, gdy zmieniasz schemat w pliku `prisma/schema.prisma`.
-   `npx prisma studio`: Otwiera graficzny interfejs do przeglądania i edycji danych w bazie.



## API Documentation

### 1. Authentication (`/api/auth`)

| Metoda | Endpoint | Opis | Wymagane Body (JSON) | Odpowiedź Sukces (2xx) | Odpowiedź Błąd (4xx) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/register` | Rejestruje nowego użytkownika. | `{ "email": "string", "password": "string" }` | `201 Created` - `{ "id": 1, "email": "user@email.com" }` | `400 Bad Request` (brak danych), `409 Conflict` (email zajęty) |
| `POST` | `/login` | Loguje istniejącego użytkownika. | `{ "email": "string", "password": "string" }` | `200 OK` - `{ "message": "Zalogowano...", "token": "jwt.token.string" }` | `400 Bad Request` (brak danych), `401 Unauthorized` (złe hasło) |

---
