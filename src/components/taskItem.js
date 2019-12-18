import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import moment from 'moment';
import { withNavigation } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

const TaskItem = ({ taskDetails, onUpdateHook, navigation }) => {
    const deleteData = async item_key => {
        try {
            //get old data
            let old_data = await AsyncStorage.getItem('my_todos');
            old_data = old_data !== null ? JSON.parse(old_data) : [];
            const new_data = old_data.filter(function(obj) {
                return obj.key !== item_key;
            });
            await AsyncStorage.setItem('my_todos', JSON.stringify(new_data));
            //call the call back
            onUpdateHook();
        } catch (e) {
            // saving error
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <Text>{taskDetails.title} </Text>
            <Text>
                {moment(taskDetails.date).format('MMMM Do YYYY')}, {moment(taskDetails.time).format('h:mm:ss a')}{' '}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Edit', { task_details: taskDetails });
                }}
            >
                <FontAwesome name="edit" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    deleteData(taskDetails.key);
                }}
            >
                <FontAwesome name="close" size={25} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

export default withNavigation(TaskItem);
