# Vi Notes

Vi Notes is a full-stack writing-session manager with autosave, persistent DB storage, search/filter, tags, and private user notes.

## Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- DB: MongoDB (Mongoose)
- Auth: JWT + bcrypt

## Project Structure
- `client/` frontend app
- `server/` backend API
- `server/src/models` database models
- `client/src/components` reusable UI components
- `client/src/pages` app pages

## Setup
1. Install dependencies:
```bash
npm install
npm install -w server
npm install -w client
```
2. Configure env files:
- Copy `server/.env.example` to `server/.env`
- Copy `client/.env.example` to `client/.env`
3. Start MongoDB (local or Atlas URI in `server/.env`)
4. Run:
```bash
npm run dev
```
- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

## Environment Variables
Server (`server/.env`):
- `NODE_ENV` = `development`
- `PORT` = `5000`
- `MONGODB_URI` = MongoDB connection string
- `JWT_SECRET` = JWT signing secret
- `CLIENT_ORIGIN` = frontend URL

Client (`client/.env`):
- `VITE_API_URL` = `http://localhost:5000/api`

## Data Schema
`Session`
- `_id`
- `userId` (ObjectId ref `User`)
- `title` (string)
- `content` (string)
- `wordCount` (number)
- `startTime` (date)
- `endTime` (date|null)
- `duration` (seconds)
- `tags` (string[])
- `lastEditedAt` (date)
- `createdAt` (date)
- `updatedAt` (date)

## API Endpoints
Base URL: `/api`

Auth:
- `POST /auth/signup`
  - body: `{ name, email, password }`
- `POST /auth/login`
  - body: `{ email, password }`

Sessions (Bearer token required):
- `GET /sessions?q=&tag=&from=&to=` list with search + filters
- `GET /sessions/tags` list tags
- `POST /sessions` create session
- `GET /sessions/:id` get one
- `PUT /sessions/:id` update (used by autosave)
- `DELETE /sessions/:id` delete

Health:
- `GET /health`

## Autosave Logic
- Debounced autosave on typing stop (~1.2s)
- Timed autosave every 8s
- Manual Save button
- Live word count while typing
- Session duration recalculated server-side on update

## Bonus Notes
- Export PDF/Markdown, streaks, goals, and offline sync can be added next as incremental modules.
