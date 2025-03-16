import React, { createContext } from "react";

const ExternalisedStringsContext = createContext<Record<string, any>>({});

export interface ExternalisedStringsContextProviderProps {
    data: Record<string, any>;
}

export function ExternalisedStringsContextProvider(
    props: React.PropsWithChildren<ExternalisedStringsContextProviderProps>
) {
    return (
        <ExternalisedStringsContext.Provider value={props.data}>
            {props.children}
        </ExternalisedStringsContext.Provider>
    );
}

export function useExternalisedStringsContext(): Record<string, any> {
    return React.useContext(ExternalisedStringsContext);
}

export interface UseLocaleStringsReturn {
    getString(key: string): string;
}

export function useLocaleStrings(): UseLocaleStringsReturn {
    let strings: Record<string, string> = useExternalisedStringsContext();
    return {
        getString(key: string): string {
            let keys = key.split(".");
            let value: any = strings;
            for (let k of keys) {
                if (value && k in value)
                    value = value[k];
                else
                    throw new Error(`Strings data does not have a definition for: "${key}"`);
            }
            if (value)
                return (new String(value)).toString();

            throw new Error(`Value for key "${key}" is not a string.`);
        },
    };
}