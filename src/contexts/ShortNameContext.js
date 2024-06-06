import React, { createContext, useContext, useState } from 'react';
const ShortNameContext = createContext();

export const useShortName = () => useContext(ShortNameContext);

export const ShortNameProvider = ({ children }) => {
    const [shortName, setShortName] = useState(null);

    const storeShortName = (name) => {
        setShortName(name);
    };

    const resetShortName = () => {
        setShortName(null);
    };

    return (
        <ShortNameContext.Provider value={{ shortName, storeShortName, resetShortName }}>
            {children}
        </ShortNameContext.Provider>
    );
};
