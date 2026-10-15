import { getPosterUrl, getRating, getYear, getGenres } from "../utils/format";

export default function TrendingCard({movie, rank, genreMap}) {
    return (
        <div className="trending-card">
            <img
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                className="movie-poster"
                loading="lazy"
            />
            <div className="trending-rank">{rank}</div>
            <div className="trending-overlay">
                <div className="trending-title">{movie.title}</div>
                <div className="trending-details">
                    <span className="trending-year">{getYear(movie.release_date)}</span>
                    <span className="trending-rating">{getRating(movie.vote_average)}</span>
                </div>
                <div className="trending-genres">{getGenres(movie.genre_ids, genreMap)}</div>
            </div>
        </div>
    )
}