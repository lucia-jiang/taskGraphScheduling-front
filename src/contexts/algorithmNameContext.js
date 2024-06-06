import React, { createContext, useContext, useState } from 'react';
const AlgorithmNameContext = createContext();

export const useAlgorithmName = () => useContext(AlgorithmNameContext);

export const AlgorithmNameProvider = ({ children }) => {
    const [algorithmName, setAlgorithmName] = useState(null);

    const storeAlgorithmName = (name) => {
        setAlgorithmName(name);
    };

    const resetAlgorithmName = () => {
        setAlgorithmName(null);
    };

    return (
        <AlgorithmNameContext.Provider value={{ algorithmName, storeAlgorithmName,  resetAlgorithmName }}>
            {children}
        </AlgorithmNameContext.Provider>
    );
};
