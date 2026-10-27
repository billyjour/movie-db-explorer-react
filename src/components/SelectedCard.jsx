import { useEffect, useState } from "react";
import { getPosterUrl, getYear, getRating, getGenres, getOverview } from "../utils/format";
import { BACKDROP_BASE_URL } from "../utils/format";
import Button from "./Button";
import TrailerOverlay from "./TrailerOverlay";
import { fetchSelectedTrailerMovies } from "../services/tmdbAPI";

export default function SelectedCard({ movie, genreMap }) {
    const backdropURL = movie.backdrop_path ? `${BACKDROP_BASE_URL}w1280${movie.backdrop_path}` : "";
    const [trailerKey, setTrailerKey] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        let ignore = false;
        setTrailerKey(null);
        fetchSelectedTrailerMovies(movie.id).then(key => { if (!ignore) setTrailerKey(key); });
        return () => { ignore = true };
    }, [movie.id]);

    return(
        <>  
            <div className="selected-banner" key={movie.id}
            style={{backgroundImage: `linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0.8)), url(${backdropURL})`}}>
                <div className="selected-banner-desc">
                    <div className="selected-card">
                        <img
                            src={getPosterUrl(movie.poster_path)}
                            alt={movie.title}
                            className="movie-poster"
                            loading="lazy"
                        />                            
                    </div>
        
                    <div className="selected-movie-desc">
                        <div className="selected-title">{movie.title}</div>
                        <div className="selected-details">
                            <span className="selected-year">{getYear(movie.release_date)}</span>
                            <span className="selected-rating"><i className="bi bi-star-fill"></i>{getRating(movie.vote_average)}</span>
                        </div>
                        <div className="selected-genres">{getGenres(movie.genre_ids, genreMap)}</div>
                        <div className="selected-overview">{getOverview(movie.overview)}</div>
                        {trailerKey && (<Button onClick={() => setShowTrailer(true)} variant={"trailer"}><i className="bi bi-caret-right-fill"></i> Play Trailer</Button>)}
                    </div>

                    <TrailerOverlay
                        isOpen={showTrailer}
                        onClose={() => setShowTrailer(false)}
                        trailerKey={trailerKey}
                    />

                </div>
            </div>

        </>
    );
}