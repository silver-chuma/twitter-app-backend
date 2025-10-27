# Twitter Clone Backend (NestJS + TypeORM + SQLite)

## Overview
Minimal backend scaffold implementing:
- User registration & login (JWT + bcrypt)
- Create tweet and share with other users (TweetShare join table)
- Endpoints to fetch my tweets and tweets shared with me
- Change password endpoint
- EmailService is a stub that logs email payloads (no real email sending)

## Quick start (local)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run in development mode:
   ```bash
   npm run start:dev
   ```
3. API base: `http://localhost:3000`

## Notes
- Uses SQLite (`db.sqlite` will be created automatically).
- This scaffold is for development / interview purposes. `synchronize: true` in TypeORM is enabled for quick setup — **do not** use in production.
- The email sending is a stub (`EmailService.sendEmail`) that prints to the server console.