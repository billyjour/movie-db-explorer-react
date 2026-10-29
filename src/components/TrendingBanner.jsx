import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../services/tmdbAPI";
import { BACKDROP_BASE_URL } from "../utils/format";

export default function TrendingBanner() {

    const [movies, setMovies] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBannerData() {
            const movies = await fetchTrendingMovies();
            setMovies(movies);
            setLoading(false);
        }
        loadBannerData();
    }, []);

    useEffect(() => {
        if (movies.length === 0) return;
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % movies.length);
        }, 5000)
        return () => clearInterval(interval);
    }, [movies])

    const movie = movies[index];
    if(loading) return <p className="load-movies"><i className="bi bi-arrow-clockwise"></i></p>;
    if(!movies) return <p className="load-movies" style={{ color: 'white' }}><i className="bi bi-arrow-clockwise"></i></p>;
    
    const backdropURL = movie.backdrop_path ? `${BACKDROP_BASE_URL}w1280${movie.backdrop_path}` : "";
    return (
        <div className="trending-banner" key={movie.id}
        style={{backgroundImage: `linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0.4)), url(${backdropURL})`}}>
            <div className="trending-banner-desc">
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
            </div>
        </div>
    )
}