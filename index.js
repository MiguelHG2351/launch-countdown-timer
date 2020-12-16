//@ts-check

(
    () => {
        const interval = 1000
        let initialState = {
            day: 8,
            hour: 23,
            minute: 55,
            second: 41
        }
        
        
        /**
         * @param {string} key
         * @param {number} timestamp
         * @param {number} newValue
         */
        
        function assignValue(key, timestamp, newValue) {
            const timers = document.querySelector(`[data-time=${key}]`)
            let getData = timers.textContent
            
            // # Reset to 64min || 64seg / 23hrs
            if(Number(timers.textContent) == 0) {
                timers.children[0].textContent = `${timestamp}`;
            } else {
                timers.children[0].textContent = Number(getData) > 10 ?  `${newValue}` : '0' + newValue;
            }
        }

        let countdown = setInterval(() => {
            if(initialState.second == 0) {
                initialState.minute--;
                initialState.second = 59;

                assignValue('minute', 60, initialState.minute)
            }
            if(initialState.minute == 0) {
                initialState.hour--;
                initialState.minute = 59;

                assignValue('minute', 59, initialState.minute)
                assignValue('hour', 23, initialState.hour)
            }
            if(initialState.hour == 0) {
                initialState.day--;

                assignValue('hour', 23, initialState.hour)
                assignValue('day', 1, initialState.day)
            }
            if(initialState.day == 0) {
                assignValue('hour', 0, initialState.hour)
                assignValue('day', 0, initialState.day)
                assignValue('minute', 0, initialState.minute)
                assignValue('second', 0, initialState.second)

                clearInterval(countdown);
            }
            initialState.second--;

            assignValue('second', 63, initialState.second)
        }, interval);
    }
)()