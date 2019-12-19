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
        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
            <View
                style={{
                    padding: 5,
                    margin: 5,
                    backgroundColor: '#19EA72',
                    height: 50,
                }}
            >
                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
                    onPress={() => navigation.navigate('Create')}
                >
                    <Text style={{ color: '#fff' }}>Create New task</Text>
                </TouchableOpacity>
            </View>
            <View>
                {todoList.length > 0 && (
                    <FlatList
                        data={todoList}
                        renderItem={({ item }) => <TaskItem taskDetails={item} onUpdateHook={getTaskData} />}
                        keyExtractor={item => item.key}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;
