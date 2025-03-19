import { router, Tabs } from "expo-router";
import { ImageBackground, Image, View } from "react-native";

import { Create, Home, Profile } from "@/constants/icons";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/providers/globalProvider";

function TabIcon({ focused, icon }: any) {
    if (focused) {
        return (
        <ImageBackground
            className="flex bg-[#688f68] flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
        >
            <Image 
                source={icon} 
                tintColor="#e8f5e9" 
                className="size-5" 
            />
        </ImageBackground>
        );
    }

    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image 
                source={icon} 
                tintColor="#A8B5DB" 
                className="size-5" 
            />
        </View>
    );
}

export default function TabsLayout() {
    const [isAppReady, setIsAppReady] = useState(false);
    const { isLogged } = useGlobalContext()

    useEffect(() => {
        const checkAuth = async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            setIsAppReady(true);
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (isAppReady && !isLogged) {
            router.replace("/(auth)/sign-in");
        }
    }, [isAppReady, isLogged]);

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#f1f8f2",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 53,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#c8e6c9",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={Home} />
                    ),
                }}
            />

            <Tabs.Screen
                name="create"
                options={{
                    title: "Create",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={Create} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={Profile} />
                    ),
                }}
            />
        </Tabs>
    );
}