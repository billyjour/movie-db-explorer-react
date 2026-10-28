import { useEffect, useRef, useState } from "react";
import { fetchGenres, fetchTrendingMovies, fetchRandomMovies, handleSearch, loadGenres, fetchSearchMovies } from "../services/tmdbAPI";
import TrendingBanner from "../components/TrendingBanner";
import TrendingCard from "../components/TrendingCard";
import MovieCard from "../components/MovieCard";
import Searchbar from "../components/Searchbar";
import useSearchFilter from "../hooks/UseSearchFilter";
import Button from "../components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Home() {

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [discoverMovies, setDiscoverMovies] = useState([]);
    const [searchMovies, setSearchMovies]     = useState([]);
    const [genreMap, setGenreMap] = useState({});
    const [genresOpt, setGenresOpt] = useState({});
    const {searchTerm, genre, year, sortBy, isSearching, handleChange, handleClear} = useSearchFilter(handleSearch);

    const swiperRef = useRef(null);

    const scroll = (dir) => {
        if (dir === "next") swiperRef.current?.slideNext();
        else swiperRef.current?.slidePrev();
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
                <Button onClick={() => scroll("prev")} variant="prev"><i className="bi bi-caret-left"></i></Button>
                <div className="trending-list">
                    <Swiper slidesPerView="auto" spaceBetween={16} grabCursor onSwiper={(swiper) => (swiperRef.current = swiper)}>
                        {trendingMovies.slice(0, 10).map((movie, index) => (
                            <SwiperSlide key={movie.id} style={{ width: "auto" }}>
                                <TrendingCard
                                    key={movie.id}
                                    movie={movie}
                                    rank={index+1}
                                    genreMap={genreMap}
                                />
                            </SwiperSlide>

                        ))}
                    </Swiper>
                </div>
                <Button onClick={() => scroll("next")} variant="next"><i class="bi bi-caret-right"></i></Button>

            </div>}

            { !isSearching && 
            <div className="discover-container">

                {(!sortBy && !genre && !year)? <h2>Discover Movies</h2> : <h2>Filtered Movies</h2>}
                
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