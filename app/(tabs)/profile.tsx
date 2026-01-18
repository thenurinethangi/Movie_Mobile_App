import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const profile = () => {
  return (
    <SafeAreaView className='flex-1 bg-primary'>
      <Text className='text-white'>profile</Text>
    </SafeAreaView>
  )
}

export default profile

const styles = StyleSheet.create({})