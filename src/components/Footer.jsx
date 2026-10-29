import { FaGithub, FaInstagram, FaAt } from "react-icons/fa6";
export default function Footer() {

    return (
        <footer>
            <div>
                <span>Developed By billyjour</span>
                <a 
                    href="https://github.com/billyjour" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    style={{ color: "#ffffff", display: "inline-flex" }}
                >
                    <FaGithub size={22} />
                </a>
                <a 
                    href="https://instagram.com/billyjourdann" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    style={{ color: "#ffffff", display: "inline-flex" }}
                >
                    <FaInstagram size={22} />
                </a>
                <a 
                    href="https://threads.net/@billyjourdann" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Threads"
                    style={{ color: "#ffffff", display: "inline-flex" }}
                >
                    <FaAt size={22} />
                </a>                
            </div> 
        </footer>
    )
}

