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

export interface IUseLocale {
    getString(key: string): string;
    getNumber(key: string): number;
    getStringsSet(key: string): Record<string, any>;
}

export function useLocale(): IUseLocale {
    let strings: Record<string, any> = useExternalisedStringsContext();

    let getString = (key: string): string => {
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
    };

    let getNumber = (key: string): number => {
        let value = getString(key);
        if (value)
            return (new Number(value)).valueOf();

        throw new Error(`Value for key "${key}" is not a number.`);
    };

    let getStringsSet = (key: string): Record<string, any> => {
        let keys = key.split(".");
        let value: any = strings;
        for (let k of keys) {
            if (value && k in value)
                value = value[k];
            else
                throw new Error(`Strings data does not have a definition for: "${key}"`);
        }
        if (typeof value === "object" && value !== null)
            return value;

        throw new Error(`Value for key "${key}" is not an object.`);
    }

    return { getString, getNumber, getStringsSet };
}
