import { Text, View } from 'react-native'
import { useState } from 'react'
import CustomInput from '@/components/CustomInput'
import { email, lock } from "@/constants/icons"
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'

const SignUp = () => {
    const [formValues, setFormValues] = useState({ username: "", email: "", password: "" })

    const handleSignIn = async () => {
        console.log(formValues)
    }

    return (
        <View className='bg-[#c8e6c9] min-h-screen'>
            <View
                className='flex items-center justify-center min-h-screen'
            >
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
                        onChangeText={(value) => setFormValues({ 
                            ...formValues, 
                            password: value 
                        })}
                    />

                    <CustomButton
                        title='Sign Up'
                        onPress={handleSignIn}
                        className='mt-5'
                    />

                    <Link
                        href="/sign-in"
                        className="text-lg text-center mt-5 text-[#2e5a2e]"
                    >
                        Already have an account ?{" "}
                        <Text className="text-[#4CAF50] font-semibold">Login</Text>
                    </Link>
                </View>
            </View>
        </View>
    )
}

export default SignUp