import { useEffect, useState } from "react";

export default function useSearchFilter(handleSearch) {
    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // debounce
    useEffect (() => {
        const timer = setTimeout(() => {
            if (handleSearch) handleSearch ({ searchTerm, setIsSearching })
        }, 500);
        // const timer = setTimeout(() => {
        //     searchTerm.trim() === "" ? setIsSearching(false) : setIsSearching(true);
        // }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleChange = (e, type) => {
        const value = e.target.value;
        if (type === "search")  setSearchTerm(value);      
        if (type === "genre")   setGenre(value);
        if (type === "year")    setYear(value);   
        if (type === "sortBy")  setSortBy(value); 
    };        

    return {searchTerm, genre, year, sortBy, isSearching, handleChange};
}