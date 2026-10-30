# CineJour Movie Explorer

A responsive movie discovery web app built with **React** and **Vite**, powered by the [TMDB API](https://www.themoviedb.org/documentation/api). Browse trending films, search and filter by genre, year and sort order, explore top-rated and upcoming releases, and watch trailers right in the app.

**Live Demo: [cinejour.vercel.app](https://cinejour.vercel.app)**

## Features

- **Trending banner** – an auto-rotating hero banner (changes every 5 seconds) showing today's trending movies.
- **Trending carousel** – the top 10 trending movies with rank numbers, built with Swiper and previous/next buttons.
- **Discover** – a random selection of movies each time you load or change filters.
- **Search** – debounced (500 ms) search-as-you-type by movie title.
- **Filters & sorting** – filter by genre and release year; sort by popularity, rating, latest release or A–Z.
- **Clear All** – reset the search and all filters in one click.
- **Top Rated page** – the highest-rated movies with a "More Movies" button to load additional pages.
- **Upcoming page** – movies coming soon to theatres.
- **Movie details & trailers** – select a movie to see its backdrop, poster, year, rating, genres and overview, and play the official YouTube trailer in a full-screen overlay (press `Esc` to close).
- **Light / Dark theme** – toggle from the navbar.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite |
| Routing | React Router |
| Carousel | Swiper |
| Icons | Bootstrap Icons, React Icons |
| Linting | Oxlint |
| Optimization | React Compiler |
| Data | TMDB API |

## Project Structure

```
movie-explorer/
├── public/                  # Static assets (favicon, icons)
├── src/
│   ├── components/          # Reusable UI (Navbar, MovieCard, Searchbar, Modal, TrailerOverlay, ...)
│   ├── contexts/            # ThemeContext (light/dark mode)
│   ├── hooks/               # useSearchFilter (search + filter state with debounce)
│   ├── pages/               # Home, TopRated, Upcoming
│   ├── services/            # tmdbAPI.jsx (all TMDB API calls)
│   ├── utils/               # Formatting helpers
│   ├── App.jsx              # Routes and layout
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── .env.example             # Example environment variables
├── index.html
├── vite.config.js
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- A free TMDB API key — sign up at [themoviedb.org](https://www.themoviedb.org/settings/api)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/billyjour/movie-db-explorer-react.git
   cd movie-explorer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to a new file named `.env` and add your TMDB API key:

   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Then open the local URL shown in your terminal (usually `http://localhost:5173`).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Environment Variables

| Variable | Description |
| --- | --- |
| `VITE_TMDB_API_KEY` | Your TMDB API key (required) |

> Never commit your `.env` file. Make sure it is listed in `.gitignore`.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home – banner, trending, search, filters and discover |
| `/top-rated` | Top Rated movies |
| `/upcoming` | Upcoming movies |

## Acknowledgements

- Movie data and images provided by [TMDB](https://www.themoviedb.org/). *This product uses the TMDB API but is not endorsed or certified by TMDB.*
- Icons by [Bootstrap Icons](https://icons.getbootstrap.com/).

## Author

**billyjour** — [GitHub](https://github.com/billyjour)

## 📄 License

This project was created as a mini project for learning purposes.
