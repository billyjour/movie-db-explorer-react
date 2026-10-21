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
        if (!res.ok) throw new Error('Failed to fetch genres');
        const data = await res.json();
        return Object.fromEntries(data.genres.map((g) => [g.id, g.name])); // return object (from array)
    } catch (error) {
        console.error(error);
        return {}; 
    }
}

export const loadGenres = async () => {
    try {
        const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        if (!res.ok) throw new Error('Failed to load genres');
        const data = await res.json();   
        return Object.fromEntries(data.genres.map((g) => [g.id, g.name]));
    } catch (error) {
        console.error(error);
        return {};        
    }
}

export const fetchRandomMovies = async ({ sortBy, genre, year }) => {
    try {
        const randomPage = Math.floor(Math.random() * 10) + 1;
        let url = `${BASE_URL}/discover/movie?language=en&api_key=${API_KEY}&page=${randomPage}`;
        
        // filter
        if (sortBy)     url += `&sort_by=${sortBy}`;
        if (genre)      url += `&with_genres=${genre}`;
        if (year)       url += `&primary_release_year=${year}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
} 

export const handleSearch = async ({ searchTerm, setIsSearching }) => {

    if (searchTerm.trim() === "") { 
        setIsSearching(false);
        return [];
    }

    setIsSearching(true);

}

export const fetchSearchMovies = async ({searchTerm, sortBy, genre, year}) => {
    try {

        let url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}&page=1`;

        // filter
        // if (sortBy)     url += `&sort_by=${sortBy}`;
        // if (genre)      url += `&with_genres=${genre}`;
        // if (year) url += `&primary_release_year=${year}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        let results = data.results;
        // genre
        if (year) results = results.filter(movie => movie.release_date?.startsWith(String(year)));
        if (genre)   results = results.filter(movie => movie.genre_ids.includes(parseInt(genre, 10)));
        if (sortBy)  results = sortMovies(results, sortBy);
        // return data.results;
        return results;
    } catch (error) {
        console.error("Error searching movies", error);
        return [];
    }
}

export const fetchTopRatedMovies = async () => {
    try {
        const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const sortMovies = (movies, sortBy) => {
    switch(sortBy){
        case "popularity.desc":
            return movies.sort((a,b) => b.popularity - a.popularity);
        case "vote_average.desc":
            return movies.sort((a,b) => b.vote_average - a.vote_average);
        case "release_date.desc":
            return movies.sort((a,b) => new Date(b.release_date) - new Date(a.release_date));
        case "title.asc":
            return movies.sort((a,b) => (a.title || "").localeCompare(b.title || ""));
        default:
            return movies;
    }
}
