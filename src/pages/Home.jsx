import { useEffect, useState } from "react";
import TrendingBanner from "../components/TrendingBanner"
import { fetchGenres, fetchTrendingMovies, fetchRandomMovies } from "../services/tmdbAPI";
import TrendingCard from "../components/TrendingCard";
import MovieCard from "../components/MovieCard";
import Searchbar from "../components/Searchbar";

export default function Home() {

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [discoverMovies, setDiscoverMovies] = useState([]);
    const [genreMap, setGenreMap] = useState({});

    useEffect(() => {
        fetchTrendingMovies().then(setTrendingMovies);
        fetchRandomMovies().then(setDiscoverMovies);
        fetchGenres().then(setGenreMap);
    }, []);


    return(
        <>
            <TrendingBanner />
            <Searchbar />
            <div className="trending-container">
                <h2><i className="bi bi-fire"></i> Trending Movies</h2>
                <div className="trending-list">
                    {trendingMovies.slice(0, 10).map((movie, index) => (
                        <TrendingCard
                            key={movie.id}
                            movie={movie}
                            rank={index+1}
                            genreMap={genreMap}
                        />
                    ))}
                </div>
            </div>
            <div className="discover-container">
                <h2>Discover Movies</h2>
                <div className="discover-list">
                    {discoverMovies.map((movie) => (
                        <MovieCard 
                            key={movie.id}
                            movie={movie}
                            genreMap={genreMap}
                        />
                    ))}
                </div>
            </div>
            
        </>
    )
}