import { Image, ScrollView, Text, View } from 'react-native'
import { AuthImg } from '@/constants/images'
import { useState } from 'react'
import CustomInput from '@/components/CustomInput'
import { email, lock } from "@/constants/icons"
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'

const SignIn = () => {
    const [formValues, setFormValues] = useState({ email: "", password: "" })

    const handleSignIn = async () => {
        console.log(formValues)
    }

    return (
        <ScrollView className='bg-[#c8e6c9] flex flex-col'>
            <View className='flex items-center justify-center'>
                <Image
                    source={AuthImg}
                    style={{ width: 350, height: 350 }} 
                    resizeMode="contain"
                />
            </View>

            <View className='bg-[#e8f5e9] rounded-xl border-green-800 shadow-green-700 mx-[20px] p-5 flex flex-col gap-[16px]'>
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
                    title='Login'
                    onPress={handleSignIn}
                />

                <Link
                    href="/sign-up"
                    className="text-lg text-center mt-2 text-[#2e5a2e]"
                >
                    Don't have an account ?{" "}
                    <Text className="text-[#4CAF50] font-semibold">Sign Up</Text>
                </Link>
            </View>
        </ScrollView>
    )
}

export default SignIn