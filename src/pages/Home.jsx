import { useEffect, useState } from "react";
import TrendingBanner from "../components/TrendingBanner"
import { fetchGenres, fetchTrendingMovies } from "../services/tmdbAPI";
import TrendingCard from "../components/TrendingCard";

export default function Home() {

    const [movies, setMovies] = useState([]);
    const [genreMap, setGenreMap] = useState({});

    useEffect(() => {
        fetchTrendingMovies().then(setMovies);
        fetchGenres().then(setGenreMap);
    }, []);
    return(
        <>
            <TrendingBanner />
            <div className="trending-container">
                <h2><i className="bi bi-film"></i> Trending Movies</h2>
                <div className="trending-list">
                    {movies.slice(0, 10).map((movie, index) => (
                        <TrendingCard
                            key={movie.id}
                            movie={movie}
                            rank={index+1}
                            genreMap={genreMap}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}