import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../contexts/ThemeContext";
import Button from "./Button";
import { toTitleCase } from "../utils/format";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const {theme, toggleTheme} = useTheme();
    


    useEffect(() => {
        const handleScore = () => setScrolled(window.scrollY >= window.innerHeight/2);
        window.addEventListener("scroll", handleScore);
        return () => window.removeEventListener("scroll", handleScore);
    }, [])
    return(
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <span className="logo">CineJour</span>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/top-rated">Top Rated</Link>
                <Link to="/upcoming">Upcoming</Link>
                <Button onClick={toggleTheme} variant="theme">
                    {toTitleCase(theme)}
                </Button>
            </div>

        </nav>
    )
    
} 