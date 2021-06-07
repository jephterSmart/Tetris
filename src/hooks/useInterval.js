import {useRef,useEffect} from 'react';

const useInterval = (callback,delay) => {
    const savedCallback = useRef();
    //we're using this instead of useState because we don't to cause 
    //multiple re-render, since the moveDown method is already causing a re-render.

    useEffect(() => {
        savedCallback.current = callback;
    },[callback])

    useEffect(() => {
        const tick = () => {
            savedCallback.current()
        }
        if(delay !== null){
            const id = setInterval(tick,delay);
            return () => {
                    clearInterval(id);
                }
            
        }
    },[delay]);

}
export default useInterval;