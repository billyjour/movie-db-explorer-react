import { useEffect, useRef, useState } from "react";
import { fetchGenres, fetchTrendingMovies, fetchRandomMovies, handleSearch, loadGenres, fetchSearchMovies } from "../services/tmdbAPI";
import TrendingBanner from "../components/TrendingBanner"
import TrendingCard from "../components/TrendingCard";
import MovieCard from "../components/MovieCard";
import Searchbar from "../components/Searchbar";
import useSearchFilter from "../hooks/UseSearchFilter";
import Button from "../components/Button";

export default function Home() {

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [discoverMovies, setDiscoverMovies] = useState([]);
    const [searchMovies, setSearchMovies]     = useState([]);
    const [genreMap, setGenreMap] = useState({});
    const [genresOpt, setGenresOpt] = useState({});
    const {searchTerm, genre, year, sortBy, isSearching, handleChange, handleClear} = useSearchFilter(handleSearch);

    const movieListRef = useRef(null);

    const scroll = (dir) => {
        movieListRef.current.scrollBy({ 
            left: (dir === "left" ? 400 : -400),
            behavior: "smooth"
        });
    };

    useEffect(() => {
        fetchTrendingMovies().then(setTrendingMovies);
        fetchGenres().then(setGenreMap);
        loadGenres().then(setGenresOpt);
    }, []);

    useEffect(() => {   
        if (!isSearching || searchTerm.trim() === "") {
            setSearchMovies([]);
            return;
        }        
        fetchSearchMovies({ searchTerm, sortBy, genre, year }).then(setSearchMovies);
    }, [isSearching, searchTerm, sortBy, genre, year]);

    useEffect(() => {
        fetchRandomMovies({ sortBy, genre, year }).then(setDiscoverMovies);
    }, [genre, year, sortBy]);

    return(
        <>
            <TrendingBanner />
            <Searchbar 
                searchTerm={searchTerm}
                genre={genre}
                year={year}
                sortBy={sortBy}
                handleChange={handleChange}
                handleClear={handleClear}   
                genresOpt={genresOpt}
            />
            {(!isSearching && !sortBy && !genre && !year ) && <div className="trending-container">
                <h2><i className="bi bi-fire"></i> Trending Movies</h2>
                <Button onClick={() => scroll("right")} variant="prev"><i className="bi bi-caret-left"></i></Button>
                <div className="trending-list" ref={movieListRef}>
                    {trendingMovies.slice(0, 10).map((movie, index) => (
                        <TrendingCard
                            key={movie.id}
                            movie={movie}
                            rank={index+1}
                            genreMap={genreMap}
                        />
                    ))}
                </div>
                <Button onClick={() => scroll("left")} variant="next"><i class="bi bi-caret-right"></i></Button>

            </div>}

            { !isSearching && 
            <div className="discover-container">

                {(!sortBy && !genre && !year)   &&  <h2>Discover Movies</h2>}
                {(sortBy  || genre  ||  year)   &&  <h2>Filtered Movies</h2>}
                
                <div className="discover-list">
                    {discoverMovies.map((movie) => (
                        <MovieCard 
                            key={movie.id}
                            movie={movie}
                            genreMap={genreMap}
                        />
                    ))}
                </div>
            </div>}   

            { isSearching && (
                <div className="discover-container">
                    <h2>Search Results for {searchTerm}</h2> 

                    { searchMovies.length > 0 ?
                    <div className="discover-list">
                        {searchMovies.map((movie) => (
                            <MovieCard 
                                key={movie.id}
                                movie={movie}
                                genreMap={genreMap}
                            />
                        ))}
                    </div> :
                    <div className="not-found">
                        <h2>No movies found</h2>
                        <p>Try adjusting your search criteria or filters</p>
                    </div>
                    }
                </div>)       

            }
              
            
            
        </>
    )
}