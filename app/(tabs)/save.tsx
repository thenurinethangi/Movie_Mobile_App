import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const save = () => {
  return (
    <SafeAreaView className='flex-1 bg-primary'>
      <Text className='text-white'>save</Text>
    </SafeAreaView>
  )
}

export default save

const styles = StyleSheet.create({})