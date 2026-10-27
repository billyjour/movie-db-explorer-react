import { useState } from "react";
import { getPosterUrl, getRating, getYear, getGenres } from "../utils/format";
import Modal from "./Modal";
import SelectedCard from "./SelectedCard";

export default function TrendingCard({movie, rank, genreMap}) {

    const [viewId, setViewId] = useState(null);
    const [selectedMovies, setSelectedMovies] = useState(null);

    return (
        <>
            <div className="trending-card" onClick={() => {setViewId(movie.id); setSelectedMovies(movie);}} key={movie.id}>
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
    )
}