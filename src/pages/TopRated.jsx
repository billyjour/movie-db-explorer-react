import { useEffect, useState } from "react";
import { fetchTopRatedMovies,  fetchGenres } from "../services/tmdbAPI";
import MovieCard from "../components/MovieCard";

export default function TopRated() {

    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genreMap, setGenreMap] = useState({});
    

    useEffect(() => {
        fetchTopRatedMovies().then(setTopRatedMovies);
        fetchGenres().then(setGenreMap);
    }, [])

    return (
        <>
            {!topRatedMovies ?
            <p className="load-movies"> Top Rated Page</p> :
            <div className="discover-container top-rated-container">
                <div className="discover-list">
                    {topRatedMovies.map((movie) => (
                        <MovieCard 
                            key={movie.id}
                            movie={movie}
                            genreMap={genreMap}
                        />
                    ))}
                </div>
            </div>
            }            
        </>
    );

}