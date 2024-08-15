import React from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import './Timer.css'; // Import the CSS file
import '../../../styles/vars.css';

const Timer = ({initialTime, onTimeUp}) => {
    return (
        <div className="timer-container">
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">
                        <stop offset="5%" stopColor="gold"/>
                        <stop offset="95%" stopColor="red"/>
                    </linearGradient>
                </defs>
            </svg>
            <CountdownCircleTimer
                isPlaying
                duration={initialTime}
                colors="var(--color-primary)"
                onComplete={onTimeUp}
            >
                {({remainingTime}) => {
                    const minutes = Math.floor(remainingTime / 60);
                    const seconds = remainingTime % 60;
                    return (
                        <div className="display-remain-time">
                            {minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}
                        </div>
                    );
                }}
            </CountdownCircleTimer>
        </div>
    );
};

export default Timer;
