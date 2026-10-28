import { setUpYearFilter } from "../utils/format"
import Button from "./Button"

export default function Searchbar({searchTerm, genre, year, sortBy, handleChange, handleClear, genresOpt}) {

    return (
        <div className="search-container">
            
            <input 
                className="search-box" 
                type="text" 
                value={searchTerm} 
                placeholder="Search for movies . . ." 
                onChange={(e) => handleChange(e, "search")}
            />  

            <div className="filters-container">
                <select id="genreFilter" value={genre} onChange={(e) => handleChange(e, "genre")}>
                    <option value="">All Genres</option>
                    {Object.entries(genresOpt).map(([id, genreName]) => (
                        <option key={id} value={id}>{genreName}</option>
                    ))}                    

                </select>
                <select id="yearFilter" value={year} onChange={(e) => handleChange(e, "year")}>
                    <option value="">All Years</option>
                    {setUpYearFilter().map((year) => (
                        <option value={year}>{year}</option>
                    ))}

                </select>
                <select id="sortFilter" value={sortBy} onChange={(e) => handleChange(e, "sortBy")}>
                    <option value="">Sort By</option>
                    <option value="popularity.desc">Most Popularity</option>
                    <option value="vote_average.desc">Highest Rated</option>
                    <option value="release_date.desc">Latest Release</option>
                    <option value="title.asc">A-Z</option>
                </select>   
            </div>

            { (searchTerm || genre || year || sortBy) && <Button onClick={() => handleClear()} variant={"clear"}>Clear All</Button>}
        </div>

    )

}