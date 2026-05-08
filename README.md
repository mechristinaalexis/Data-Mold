# DataMold

DataMold is a web application that converts JSON objects into structured HTML forms and MySQL database schemas, eliminating manual SQL scripting and simplifying data transformation for application development.

---

## Features

### JSON to Form
Convert a JSON structure into a fully functional, interactive HTML form in real-time. Useful for rapid UI prototyping and data entry interfaces.

### Dynamic Schema Generation
Transform raw JSON data into well-structured MySQL schemas automatically. DataMold generates the `CREATE TABLE` statements and database structure directly from your JSON objects — no manual SQL required.

### Full CRUD Operations
Manage your database tables directly from the dashboard:
- Add / delete rows
- Add / delete columns
- Update column definitions
- Delete all rows
- Delete a table

### Table Relations
- Add and delete foreign key relationships between tables
- Join tables and view relational data

### Interactive Mermaid Diagrams
Visualize your database schema as interactive entity-relationship diagrams powered by Mermaid.js.

### Modern Data Types
DataMold extends standard SQL types with semantic "modern" data types that include built-in regex validation:

| Type          | SQL Type                         | Description                  |
|---------------|----------------------------------|------------------------------|
| `DISTANCE`    | `FLOAT`                          | Numeric distance values      |
| `CITY_PINCODE`| `VARCHAR(10)`                    | Alphanumeric postal codes    |
| `COUNTRY`     | `VARCHAR(100)`                   | Country names                |
| `GENDER`      | `ENUM('Male','Female','Other')`  | Gender values                |
| `AGE`         | `TINYINT UNSIGNED`               | Age values (0–127)           |
| `PHONE_NUMBER`| `VARCHAR(15)`                    | International phone numbers  |
| `EMAIL`       | `VARCHAR(255)`                   | Email addresses              |

### TypeScript Validators
A collection of reusable TypeScript validators for common data formats:

- `Email`
- `PhoneNumber`
- `URL`
- `UUID`
- `IPAddress`
- `DateTime`
- `CreditCardNumber`
- `CurrencyAmount`
- `PostalCode`
- `GeoCoordinates`
- `HexColor`
- `Distance`
- `Temperature`
- `JSONString`
- `LanguageCode`
- `Countries` / `States`

### User Dashboard
A single-page dashboard with dedicated views for:
- Home
- View Projects
- Create Project
- Modern Data Types reference
- How to Use guide
- JSON Converter (per database)

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Runtime   | Node.js                           |
| Framework | Express.js                        |
| Database  | MySQL (`mysql2`)                  |
| Auth      | `bcrypt`, `express-session`       |
| Frontend  | HTML, CSS, Vanilla JavaScript     |
| Validators| TypeScript                        |
| Dev Tool  | Nodemon                           |

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL running locally

### Installation

```bash
git clone <repo-url>
cd DataMold
npm install
```

### Database Setup

Ensure MySQL is running and a database named `dataMoldProjectDb` exists:

```sql
CREATE DATABASE dataMoldProjectDb;
```

Update the credentials in `server.js` if your MySQL user/password differ from the defaults:

```js
const defaultPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql123",
});
```

### Running the App

```bash
# Production
npm start

# Development (auto-reload)
npm run dev
```

The app runs at `http://localhost:3100` by default.

---

## Project Structure

```
DataMold/
├── server.js               # Express server & API routes
├── modernDataTypes.js      # Custom semantic data types
├── package.json
├── tsconfig.json
└── public/
    ├── landingPg.html      # Marketing landing page
    ├── user-dashboard.html # App dashboard (SPA)
    ├── components/         # Reusable UI components
    ├── script/             # Client-side JS modules
    │   ├── form-main.js
    │   ├── landingPg.js
    │   ├── table-creation.js
    │   ├── user-dashboard*.js
    │   └── table-manage/   # CRUD operation scripts
    ├── style/              # CSS stylesheets
    └── validators/         # TypeScript data validators
```

---

## License

ISC
