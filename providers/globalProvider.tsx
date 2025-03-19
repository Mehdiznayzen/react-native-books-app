import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Alert } from "react-native";

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
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [user, setUser] = useState<Object | null>({});
    const [loading, setLoading] = useState<boolean>(false);

    const handleLoginUser = async () => {
        try {
            setLoading(true);

            const { data, error } = await supabase.auth.getSession();
            console.log(data.session)
            if (error) throw error;

            if (data.session?.user) {
                setUser(data.session.user);
                setIsLogged(true);
                router.push("/");
            } else {
                setUser(null);
                setIsLogged(false);
            }
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleLoginUser();
    }, [user]);

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