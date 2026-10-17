import { getPosterUrl, getYear, getRating, getGenres, getOverview } from "../utils/format";

export default function MovieCard({movie, genreMap}) {
    return (
        <div className="discover-card">
            <img
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                className="discover-poster"
                loading="lazy"
            />
            <div className="discover-overlay">
                <div className="discover-title">{movie.title}</div>
                <div className="discover-details">
                    <span className="discover-year">{getYear(movie.release_date)}</span>
                    <span className="discover-rating">{getRating(movie.vote_average)}</span>
                </div>
                <div className="discover-genres">{getGenres(movie.genre_ids, genreMap)}</div>
                <div className="discover-overview">{getOverview(movie.overview)}</div>
            </div>
        </div>
    );    
}