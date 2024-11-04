import React, { useEffect, useState } from 'react';
import './CSS/RegisterSelectPage.css'; // Import the CSS file with animations

const MyComponent = () => {
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowCard(true), 100); // Delay for animation
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bottom-right">
            <div className={`coachi-card ${showCard ? 'show-coach-card' : ''}`}>
                <p>
                    Ready to help others reach their fitness goals? Join our platform and become a coach today!
                </p>
                <button className="coach-login-button" onClick={handleCoachLogin}>
                    Register/Login as Coach
                </button>
            </div>
        </div>
    );
};

export default MyComponent;
