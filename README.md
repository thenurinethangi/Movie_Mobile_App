# Movie App (React Native + Expo + TMDB)

A modern **movie discovery** experience built with **React Native**, **Expo Router**, **NativeWind**, and the **TMDB API**. The app helps users quickly explore trending and latest movies, run fast keyword searches, and dive into a rich details view that surfaces ratings, votes, genres, budgets, revenue, and production information. Under the hood it uses **Firebase/Firestore** to track search activity and rank the most popular titles, giving the home screen a data-driven “Popular movies” section.

## Features

- **Discover movies**: Home feed with a “Latest movies” grid (TMDB discover by popularity).
- **Popular carousel**: “Popular movies” is powered by **Firebase/Firestore** top searched titles.
- **Search**: Debounced movie search (1s delay) using TMDB search API.
- **Movie details**: Poster, release year, runtime, rating + vote count, overview, genres, budget, revenue, production companies.
- **Routing**: File-based navigation with Expo Router (`app/(tabs)` + `app/movie/[id]`).
- **UI**: Custom bottom tabs + modern dark theme styling via NativeWind.

## Screenshots

<p align="center">
  <img src="assets/project_screenshots/WhatsApp%20Image%202026-02-25%20at%201.09.36%20AM.jpeg" width="240" />
  <img src="assets/project_screenshots/WhatsApp%20Image%202026-02-25%20at%201.09.37%20AM.jpeg" width="240" />
  <img src="assets/project_screenshots/WhatsApp%20Image%202026-02-25%20at%201.09.37%20AM%20%281%29.jpeg" width="240" />
</p>

<p align="center">
  <img src="assets/project_screenshots/WhatsApp%20Image%202026-02-25%20at%201.09.37%20AM%20%282%29.jpeg" width="240" />
  <img src="assets/project_screenshots/WhatsApp%20Image%202026-02-25%20at%201.09.37%20AM%20%283%29.jpeg" width="240" />
  <img src="assets/project_screenshots/WhatsApp%20Image%202026-02-25%20at%201.09.37%20AM%20%284%29.jpeg" width="240" />
</p>

## Tech Stack

- **Expo SDK**: ~54
- **React Native**: 0.81
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS)
- **Backend**: Firebase (Firestore) for search-count ranking
- **Movie data**: TMDB API

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the app

```bash
npm run start
```

Helpful shortcuts:

```bash
npm run android
npm run ios
npm run web
```

## Configuration

This project uses TMDB + Firebase and currently keeps credentials in code.

- **TMDB**: Update `services/movieService.ts` → `TMDB_CONFIG.headers.Authorization` with your own TMDB Bearer token.
- **Firebase**: Update `services/firebase.ts` with your own Firebase project config if needed.

## Project Structure

- `app/(tabs)`: Home, Search, Save, Profile tabs
- `app/movie/[id]`: Movie details screen
- `services/movieService.ts`: TMDB requests + Firestore ranking logic
- `components/`: Movie cards
- `assets/`: Icons, images, screenshots

## EAS Build (optional)

Build profiles are defined in `eas.json` (`development`, `preview`, `production`).

## License

MIT (or update this section if you prefer a different license).
