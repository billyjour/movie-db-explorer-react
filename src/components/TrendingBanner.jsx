import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../services/tmdbAPI";
import { BACKDROP_BASE_URL } from "../services/tmdbAPI";

export default function TrendingBanner() {

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBannerData() {
            const movies = await fetchTrendingMovies();
            if (movies.length > 0) setMovie(movies[1]);
            setLoading(false);
        }

        loadBannerData();
    }, []);

    if(loading) return <p>Load . . .</p>;
    if(!movie) return <p style={{ color: 'white' }}>Film load...</p>;
    
    const backdropURL = movie.backdrop_path ? `${BACKDROP_BASE_URL}w1280${movie.backdrop_path}` : "";
    return (
        <div className="trending-banner"
        style={{backgroundImage: `linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0.4)), url(${backdropURL})`}}>
            <div className="trending-banner-desc">
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
            </div>
        </div>
        
    )
}