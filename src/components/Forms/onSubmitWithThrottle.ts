// funzione onSubmit con throttling per evitare le chiamate continue

import { useState } from 'react';

 const useThrottled = (callback: Function, delay = 500) => {
    const [timer, setTimer] = useState(0);

    return (...args:any) => {
        const now = new Date().getTime();

        if (now - timer < delay) {
            return;
        } else {
            console.log('chiamo')
            setTimer(now);
            callback(...args);
        }
    };
};

export default useThrottled;