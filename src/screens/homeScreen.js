import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import TaskItem from './../components/taskItem';

const HomeScreen = ({ navigation }) => {
    const [todoList, setToDoList] = useState([]);
    const getTaskData = async () => {
        try {
            const value = await AsyncStorage.getItem('my_todos');
            if (value !== null) {
                // We have data!!
                setToDoList(JSON.parse(value));
            }
        } catch (e) {
            // saving error
        }
    };

    useEffect(() => {
        getTaskData();
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Text style={styles.createBtn}>Create New task</Text>
            </TouchableOpacity>
            {todoList.length > 0 && (
                <FlatList
                    data={todoList}
                    renderItem={({ item }) => <TaskItem taskDetails={item} onUpdateHook={getTaskData} />}
                    keyExtractor={item => item.key}
                />
            )}
        </View>
    );
};

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
        color: 'white',
    },
});

export default HomeScreen;
