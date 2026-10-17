import { useState } from "react"

export default function Searchbar() {

    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [sortBy, setSortBy] = useState('');

    const handleChange = (e, type) => {
        const value = e.target.value;
        if (type === "search") setSearchTerm(value);
        if (type === "genre") setGenre(value);
        if (type === "year") setYear(value);
        if (type === "sortBy") setSortBy(value);

        //handleSearch ({ searchTerm, genre, year, sortBy, [type]:value }){}
    };


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
                </select>
                <select id="yearFilter" value={year} onChange={(e) => handleChange(e, "year")}>
                    <option value="">All Years</option>
                </select>
                <select id="sortFilter" value={sortBy} onChange={(e) => handleChange(e, "sortBy")}>
                    <option value="">Sort By</option>
                    <option value="popularity-desc">Most Popularity</option>
                    <option value="vote_average.desc">Highest Rated</option>
                    <option value="release-date.desc">Latest Release</option>
                    <option value="title.asc">A-Z</option>
                </select>   
            </div>
        </div>

    )

}