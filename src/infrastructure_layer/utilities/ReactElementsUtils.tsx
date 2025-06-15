import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export let makeParagraph = (text: any, isError: boolean = false) => {
    return (<Typography
        variant="body1"
        component="p"
        color={isError ? "red" : "inherit"}
    >{(new String(text)).toString()}</Typography>);
};

export function useWindowDimensions() {
    let getWindowDimensions = () => {
        let { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    let [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
