import { Alert, Text, View } from 'react-native';
import { useState } from 'react';
import CustomInput from '@/components/CustomInput';
import { email, lock } from "@/constants/icons";
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { supabase } from '@/lib/supabase';

const SignUp = () => {
    const [formValues, setFormValues] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        try {
            const { error: signUpError, data: authData } = await supabase.auth.signUp({
                email: formValues.email,
                password: formValues.password,
            });

            router.push("/(auth)/sign-in");
    
            if (signUpError) {
                Alert.alert("Sign-Up Error", signUpError.message);
                setLoading(false);
                return;
            }

            if(authData){
                const { data: existingUser } = await supabase
                    .from('users')
                    .select('email')
                    .eq('email', formValues.email)
                    .single();
                
                if(existingUser){
                    return;
                }

                const { error: insertError } = await supabase.from("users").insert([{
                    username: formValues.username,
                    email: formValues.email,
                    password: formValues.password,
                }]);

                if (insertError) {
                    Alert.alert("Database Error", insertError.message);
                    setLoading(false);
                    return;
                }
            }
        } catch (error) {
            console.error("Error during sign-up process:", error);
            Alert.alert("Unexpected Error", "Something went wrong. Please try again later.");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <View className='bg-[#c8e6c9] min-h-screen'>
            <View className='flex items-center justify-center min-h-screen'>
                <View className='bg-[#e8f5e9] rounded-xl border-green-800 shadow-green-700 mx-[20px] p-5 w-[385px]'>
                    <View className='my-[10px] flex items-center gap-[6px]'>
                        <Text className='text-[30px] text-[#4CAF50] font-bold text-center'>BookWorm 📚</Text>
                        <Text className='text-[13px] text-[#2e5a2e] text-center'>Share your favorite reads</Text>
                    </View>

                    <CustomInput
                        label="Username"
                        placeholder="John Doe"
                        icon={email}
                        textContentType="emailAddress"
                        value={formValues.username}
                        onChangeText={(value) => setFormValues({ ...formValues, username: value })}
                    />

                    <CustomInput
                        label="Email"
                        placeholder="Enter email"
                        icon={email}
                        textContentType="emailAddress"
                        value={formValues.email}
                        onChangeText={(value) => setFormValues({ ...formValues, email: value })}
                    />

                    <CustomInput
                        label="Password"
                        placeholder="Enter password"
                        icon={lock}
                        secureTextEntry={true}
                        textContentType="password"
                        value={formValues.password}
                        onChangeText={(value) => setFormValues({ ...formValues, password: value })}
                    />
                    
                    <CustomButton
                        title={"Sign Up"}
                        onPress={handleSignIn}
                        className='mt-5'
                        disabled={loading}
                    />

                    <Link href="/sign-in" className="text-lg text-center mt-5 text-[#2e5a2e]">
                        Already have an account?{" "}
                        <Text className="text-[#4CAF50] font-semibold">Login</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
};

export default SignUp;