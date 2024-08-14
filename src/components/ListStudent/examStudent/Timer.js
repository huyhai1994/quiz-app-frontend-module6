import React, { useEffect, useRef, useState } from 'react';
import './Timer.css'; // Import the CSS file

const Timer = ({ initialTime, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const intervalRef = useRef(null);

    useEffect(() => {
        startTimer(initialTime);
        return () => clearInterval(intervalRef.current);
    }, [initialTime]);

    const displayTimeLeft = (timeLeft) => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const startTimer = (seconds) => {
        const endTime = Date.now() + seconds * 1000;
        intervalRef.current = setInterval(() => {
            const remainingTime = Math.round((endTime - Date.now()) / 1000);
            setTimeLeft(remainingTime);
            if (remainingTime <= 0) {
                clearInterval(intervalRef.current);
                onTimeUp();
            }
        }, 1000);
    };

    return (
        <div className="timer-container">
            <div className="display-remain-time">
                {displayTimeLeft(timeLeft)}
            </div>
        </div>
    );
};

export default Timer;
