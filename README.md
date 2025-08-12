# Video Library

A full-stack video library dashboard application built with React, NestJS, TypeScript, and HeroUI, featuring infinite scrolling and light/dark modes.

Additional dependencies include: TanStack Query, TanStack Virtual, and Zustand on the frontend, SQLite and TypeORM on the backend, and Zod (shared).

## Quick Start

```bash
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API Documentation: http://localhost:3000/docs

## Project Structure

This is a monorepo with three packages:

- `frontend/` - React + Vite application
- `backend/` - NestJS API server  
- `common/` - Shared types and schemas

## Considerations

Importance was placed on creating separation between database entities and API contracts, and defining shared schemas in the common project shared between backend and frontend. Business logic could also be added to the common project in the future as appropriate.

## Future Improvements

The project is a bit more frontend-heavy than backend. To add a little more interest to the backend, I imagined caching a small list of featured videos (avoiding a database query) and displaying this smaller list on the homepage with a link to view all and navigate to the full gallery.

There are many other improvements to make:
- Frontend warnings about missing aria label attributes
- Improve the responsiveness of the VideoCard components in the gallery, and alignment of elements across cards
- Use Skeletons for loading states
- CSS modules per component
- Database migrations
- Dotenv, including configuring an external SQL connection
- Examine lint rules, including some that were disabled to speed up development
- Tests (unit and e2e)

Additional features to add:
- Auth
- Viewing video details
- Deleting a video
- Uploading an actual video file and creating a thumbnail
