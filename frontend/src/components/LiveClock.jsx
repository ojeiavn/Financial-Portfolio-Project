import React, { useState, useEffect } from 'react';

function LiveClock() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Updates every second

        return () => {
            clearInterval(timer); // Cleans up the timer when the component unmounts
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <>
            <div>
                <p>{currentDateTime.toLocaleString()}</p>
            </div>
        </>
    );
}

export default LiveClock;
