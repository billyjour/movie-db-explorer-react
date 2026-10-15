export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/';
export const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Crect width='500' height='750' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='24' fill='%23888' text-anchor='middle' dy='.3em'%3ENo Poster%3C/text%3E%3C/svg%3E";

export const toTitleCase = (t) => {
    return t.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export const getPosterUrl = (path) => path ? `${IMAGE_BASE_URL}${path}` : FALLBACK_IMAGE;
export const getRating = (voteAverage) => voteAverage ? voteAverage.toFixed(2) : 'N/A';
export const getYear = (releaseDate) => releaseDate ? new Date(releaseDate).getFullYear() : 'TBA';
export const getGenres = (genreIds = [], genreMap = {}) => {
    const names = genreIds.slice(0, 2).map((id) => genreMap[id]).filter(Boolean);
    return names.length ? names.join(', ') : 'N/A';
}




// function createTrendingCard(movie, rank) {  
//     const posterPath = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : FALLBACK_IMAGE;
//     const rating = movie.vote_average?.toFixed(2) ?? 'N/A';
//     const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA';
    

// }