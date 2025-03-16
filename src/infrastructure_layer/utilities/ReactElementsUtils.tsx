import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export let makeParagraph = (text: any, cssClassName?: string) => {
    if (cssClassName)
        return <Typography variant="body1" component="p" color="inherit" className={cssClassName}>{(new String(text)).toString()}</Typography>;
    else
        return <Typography variant="body1" component="p" color="inherit">{(new String(text)).toString()}</Typography>;
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
