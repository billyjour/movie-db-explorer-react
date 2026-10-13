import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import TopRated from "./pages/TopRated"
import Upcoming from "./pages/Upcoming"
import { Routes, Route} from "react-router-dom"
function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/top-rated" element={<TopRated />}/>
                    <Route path="/upcoming" element={<Upcoming />}/>
                </Routes>
            </div>
        </>        
        
    )
}

export default App