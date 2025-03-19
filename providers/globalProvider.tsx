import { router } from "expo-router";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface GlobalContextType {
    isLogged: boolean;
    user: Object | null;
    loading: boolean;
}


const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<Object | null>({});
    const [loading, setLoading] = useState(false);

    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                user,
                loading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if (!context)
        throw new Error("useGlobalContext must be used within a GlobalProvider");

    return context;
};

export default GlobalProvider;