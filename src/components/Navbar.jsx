import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
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
        <header>
            <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
                <span className="logo"><Link to="/">CineJour</Link></span>
                <div className="nav-links">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/top-rated">Top Rated</NavLink>
                    <NavLink to="/upcoming">Upcoming</NavLink>
                    <Button onClick={toggleTheme} variant="theme">
                        {toTitleCase(theme)}
                    </Button>
                </div>
            </nav>
        </header>        
    )
    
} 