import React from "react";
import '../styles/NotFoundComponent.scss';

const NotFoundComponent = () => {
    return (
    <nav className="shelf">
        <div className="book home-page">Takabur</div>
        <div className="book about-us">Hasad</div>
        <div className="book contact">Tamak</div>
        <div className="book faq">ghibah</div>
        
        <span className="book not-found"></span>
        
        <span className="door left"></span>
        <span className="door right"></span>
    </nav>
            
    )
}

export default NotFoundComponent;