import { ScrollView, Text, View } from 'react-native'

const HomePage = () => {

    return (
        <ScrollView className='bg-[#f1f8f2] min-h-screen '>
            <View className='my-[10px] flex items-center gap-[6px]'>
                <Text className='text-[30px] text-[#4CAF50] font-bold text-center'>BookWorm 📚</Text>
                <Text className='text-[13px] text-[#2e5a2e] text-center'>Discover great reads from the community</Text>
            </View>
        </ScrollView>
    )
}

export default HomePage