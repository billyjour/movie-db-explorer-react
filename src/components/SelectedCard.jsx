import { getPosterUrl } from "../utils/format";
import { BACKDROP_BASE_URL } from "../utils/format";
export default function SelectedCard({ movie }) {
    const backdropURL = movie.backdrop_path ? `${BACKDROP_BASE_URL}w1280${movie.backdrop_path}` : "";
    return(
        <>  
            <div className="selected-banner" key={movie.id}
            style={{backgroundImage: `linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0.8)), url(${backdropURL})`}}>
                <div className="selected-banner-desc">
                    <div className="selected-card">
                        <img
                            src={getPosterUrl(movie.poster_path)}
                            alt={movie.title}
                            className="movie-poster"
                            loading="lazy"
                        />                            
                    </div>
        
                    <div className="selected-movie-desc">
                        <h1>{movie.title}</h1>
                        <p>{movie.overview}</p>
                    </div>

                </div>
            </div>

        </>
    );
}