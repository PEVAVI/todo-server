# 📝 To-Do List – Backend API

Express server s SQLite databází pro To-Do list aplikaci. Poskytuje REST API s kompletními CRUD operacemi.

## Endpointy

| Metoda | Cesta        | Popis                               |
| ------ | ------------ | ----------------------------------- |
| GET    | `/ukoly`     | Vrátí všechny úkoly                 |
| POST   | `/ukoly`     | Vytvoří nový úkol                   |
| PUT    | `/ukoly/:id` | Upraví stav úkolu (hotovo/nehotovo) |
| DELETE | `/ukoly/:id` | Smaže úkol                          |

## Technologie

- **Node.js** + **Express** – server a routing
- **better-sqlite3** – databáze
- **cors** – komunikace s frontendem

## Jak spustit projekt lokálně

1. Naklonuj repozitář:

```bash
   git clone https://github.com/PEVAVI/todo-server.git
   cd todo-server
```

2. Nainstaluj závislosti:

```bash
   npm install
```

3. Spusť server:

```bash
   node index.js
```

4. Server poběží na `http://localhost:3000/`

**Poznámka:** Pro frontend viz [todo-app](https://github.com/PEVAVI/todo-app).

## Autor

Petro Vintuňak
