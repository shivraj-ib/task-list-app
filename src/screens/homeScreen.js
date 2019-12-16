import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
      <View style={styles.container}>
        <TouchableOpacity 
            onPress={ () => navigation.navigate('Create') }>
            <Text style={styles.createBtn}>Create New task</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    createBtn: {
        padding: 5,
        borderWidth: 1,
        backgroundColor: 'blue',
        color: 'white'
    }
});

export default HomeScreen;