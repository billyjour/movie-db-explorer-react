import { createPortal } from "react-dom";
import Button from "./Button";

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return createPortal(
        <div className="modal-pop-up-container">
            <div className="modal-pop-up">
                <Button onClick={onClose} variant="close"><i className="bi bi-x-lg"></i></Button>
                { children }
            </div>
        </div>,
        document.body
    );

}