const API_KEY = `0e9dd205b7d99db6f2c3450ce3d0dedc`;
const BASE_URL = "https://api.themoviedb.org/3";



export const fetchTrendingMovies = async () => {
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

export const fetchGenres = async () => {
    try {
        const res = await fetch(`${BASE_URL}/genre/movie/list?language=en&api_key=${API_KEY}`);
        if (!res.ok) throw new Error('Failed to fetch genre');
        const data = await res.json();
        return Object.fromEntries(data.genres.map((g) => [g.id, g.name])); // return object (from array)
    } catch (error) {
        console.error(error);
        return {}; 
    }
}
