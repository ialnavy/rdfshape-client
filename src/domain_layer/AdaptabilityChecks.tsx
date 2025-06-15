import { useWindowDimensions } from "../infrastructure_layer/utilities/ReactElementsUtils";
import { useLocale } from "../infrastructure_layer/utilities/ExternalisedStringsContext";

/*
 * Adaptability Checks for User's Window
 * --------------------------------------------
 * According to the window width, user's device
 * is classified as mobile, tablet, or desktop.
 */

export let isMobile = (): boolean => {
    let { getNumber } = useLocale();
    return ((useWindowDimensions().width
                < getNumber("limits.mobileWindowWidthPxThreshold")));
};

export let isTablet = (): boolean => {
    let { getNumber } = useLocale();
    return ((useWindowDimensions().width
                >= getNumber("limits.mobileWindowWidthPxThreshold"))
            && (useWindowDimensions().width
                < getNumber("limits.tabletWindowWidthPxThreshold")));
};

export let isDesktop = (): boolean => {
    let { getNumber } = useLocale();
    return ((useWindowDimensions().width
                >= getNumber("limits.tabletWindowWidthPxThreshold")));
};
