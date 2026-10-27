import { useState } from "react";
import { getPosterUrl, getYear, getRating, getGenres, getOverview } from "../utils/format";
import Modal from "./Modal";
import SelectedCard from "./SelectedCard";

export default function MovieCard({movie, genreMap}) {

    const [viewId, setViewId] = useState(null);
    const [selectedMovies, setSelectedMovies] = useState(null);

    return (
        <>
            <div className="discover-card" onClick={() => {setViewId(movie.id); setSelectedMovies(movie);}} key={movie.id}>
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

            <Modal
                isOpen={viewId !== null}
                onClose={() => {setViewId(null);}}
            >  
                <SelectedCard 
                    movie = {selectedMovies}
                    genreMap={genreMap}
                />
            </Modal>
        </>
    );    
}