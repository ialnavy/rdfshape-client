import React, { createContext } from "react";

const StringsContext = createContext({});

export interface StringsContextProviderProps {
    data: Record<string, any>;
}

export function StringsContextProvider(
    props: React.PropsWithChildren<StringsContextProviderProps>
) {
    return (
        <StringsContext.Provider value={props.data}>
            {props.children}
        </StringsContext.Provider>
    );
}

export function useStringsContext(): Record<string, any> {
    return React.useContext(StringsContext);
}

export interface UseLocaleStringsReturn {
    getString(key: string): string;
}

export function useLocaleStrings() {
    const strings = useStringsContext();
    return {
        getString(key: string): string {
            if (key in strings) {
                return strings[key];
            }
            throw new Error(`Strings data does not have a definition for: "${key}"`);
        },
    };
}