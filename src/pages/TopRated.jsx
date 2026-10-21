import { useEffect, useState } from "react";
import { fetchTopRatedMovies,  fetchGenres } from "../services/tmdbAPI";
import MovieCard from "../components/MovieCard";
import Button from "../components/Button";
export default function TopRated() {

    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genreMap, setGenreMap] = useState({});
    const [page, setPage] = useState(1);

    const changePage = () => {
        setPage(p => p + 1);
    }

    useEffect(() => {
        fetchGenres().then(setGenreMap);
    }, []);

    useEffect(() => {
        let ignore = false;
        const loadMovies = async () => {
            const movies = await fetchTopRatedMovies(page);
            if (!ignore) setTopRatedMovies((t) => [...t, ...movies]);
        }
        loadMovies();
        return () => { ignore = true };
    }, [page])



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
                <Button onClick={changePage} variant="load-more-movies">More Movies</Button>
            </div>
            }            
        </>
    );

}