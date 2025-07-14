
# vee-anti.xyz

## Getting Started

### 1. Install dependencies
```sh
pnpm install
```

### 2. Set up your database
- Make sure you have PostgreSQL running locally (or use a remote instance).
- Copy `.env.example` to `.env` and fill in your database credentials:
  ```env
  DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/veeanti_db"
  ADMIN_SECRET="your_admin_secret_here"
  PORT=6969
  ```
- Push the Prisma schema to your database:
  ```sh
  npx prisma db push
  ```
- (Optional) Seed the database with sample data:
  ```sh
  psql <your_connection_string> -f scripts/seed-data.sql
  ```
- (Optional) Open Prisma Studio to view/edit data:
  ```sh
  npx prisma studio
  ```

### 3. Start the development server
```sh
pnpm dev
```

Open your browser and go to [http://localhost:3000](http://localhost:3000)

---

## Production

- By default, the production server will run at [http://localhost:6969](http://localhost:6969) if you use the provided deployment script and `.env.production`.
- To change the port, edit the `PORT` value in `.env.production`.

---

## Notes

- Make sure you have [pnpm](https://pnpm.io/) installed globally (`npm install -g pnpm`).
