import { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

export default function TrailerOverlay ({ isOpen, onClose, trailerKey}) {

    useEffect(() => {
        if(!isOpen) return;
        const onKeyDown = (e) => {
            if(e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, onClose])

    if (!isOpen || !trailerKey) return null;
    return createPortal (
        <div className="trailer-overlay" onClick={onClose}>
            <Button onClick={onClose} variant={"trailer-close"}><i className="bi bi-x-lg"></i></Button>
            <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Trailer"
            />            

        </div>,
        document.body
    );
}