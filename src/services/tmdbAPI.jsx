const API_KEY = `0e9dd205b7d99db6f2c3450ce3d0dedc`;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/';
export const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Crect width='500' height='750' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='24' fill='%23888' text-anchor='middle' dy='.3em'%3ENo Poster%3C/text%3E%3C/svg%3E";


export async function fetchTrendingMovies() {
    try {
        const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}
