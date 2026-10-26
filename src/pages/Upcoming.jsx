import { useEffect, useState } from "react";
import { fetchGenres, fetchUpcomingMovies } from "../services/tmdbAPI";
import MovieCard from "../components/MovieCard";
import Button from "../components/Button";

export default function Upcoming() {

    const [upcomingMovies, setUpcomingMovies] = useState([]);
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
            const movies = await fetchUpcomingMovies(page);
            if (!ignore) setUpcomingMovies((u) => [...u, ...movies]);
        }
        loadMovies();
        return () => { ignore = true };
    }, [page])

    return (
    <>
        {!upcomingMovies ? 
        <p className="load-movies"> Upcoming Movies Page</p> :
        <div className="discover-container top-rated-container">
            <div className="discover-list">
                {upcomingMovies.map((movie) => (
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
    
    </>);
}