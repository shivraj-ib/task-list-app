import React, { useReducer } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

const reducer = (state, action) => {
    switch (action.type) {
        case 'setTitle':
            return { ...state, title: action.value };

        case 'showDatePicker':
            return { ...state, show_date_picker: action.value };

        case 'setDatePickerType':
            return { ...state, date_picker_type: action.value };

        case 'setDate':
            /**
             * To do better this logic below
             */
            if (typeof action.value === 'undefined') {
                return {
                    ...state,
                    date: new Date(),
                    date_picker_type: 'date',
                    show_date_picker: false,
                };
            } else {
                return {
                    ...state,
                    date: action.value,
                    date_picker_type: 'time',
                };
            }
        case 'setTime':
            /**
             * To do better this logic below
             */
            if (typeof action.value === 'undefined') {
                return {
                    ...state,
                    time: new Date(),
                    date_picker_type: 'date',
                    show_date_picker: false,
                };
            } else {
                return {
                    ...state,
                    time: action.value,
                    date_picker_type: 'date',
                    show_date_picker: false,
                };
            }
        case 'setLoader':
            return { ...state, loading: action.value };

        case 'setError':
            return { ...state, error: action.value };

        default:
            return state;
    }
};

const CreateScreen = ({ navigation }) => {
    const taskDetails = navigation.getParam('task_details');

    const [state, dispatch] = useReducer(reducer, {
        title: taskDetails.title,
        show_date_picker: false,
        date: new Date(taskDetails.date),
        time: new Date(taskDetails.time),
        date_picker_type: 'date',
        loading: false,
        error: '',
    });

    const updateData = async data => {
        dispatch({ type: 'setLoader', value: true });
        dispatch({ type: 'setError', value: '' });
        try {
            //get old data
            let old_data = await AsyncStorage.getItem('my_todos');
            old_data = old_data !== null ? JSON.parse(old_data) : [];
            //const new_data = [...old_data, data];

            data.key = taskDetails.key;

            const new_data = old_data.map(item => {
                return item.key === taskDetails.key ? data : item;
            });

            await AsyncStorage.setItem('my_todos', JSON.stringify(new_data));
            dispatch({ type: 'setLoader', value: false });
            navigation.navigate('Home');
        } catch (e) {
            // saving error
            console.log(e);
            dispatch({ type: 'setLoader', value: false });
            dispatch({ type: 'setError', value: 'Something went wrong.' });
        }
    };

    return (
        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
            <View style={{ margin: 3 }}>
                <TextInput
                    style={{ borderWidth: 2, height: 50, paddingLeft: 5 }}
                    onChangeText={text => dispatch({ type: 'setTitle', value: text })}
                    placeholder="Enter task title..."
                    value={state.title}
                />
            </View>
            <View>
                <TouchableOpacity onPress={() => dispatch({ type: 'showDatePicker', value: true })}>
                    <View
                        style={{
                            margin: 3,
                            flexDirection: 'row',
                            borderWidth: 2,
                            padding: 5,
                            height: 50,
                            alignItems: 'center',
                        }}
                    >
                        <View>
                            <FontAwesome name="calendar" size={30} />
                        </View>
                        <View style={{ paddingLeft: 5 }}>
                            <Text>
                                {moment(state.date).format('MMMM Do YYYY')}, {moment(state.time).format('h:mm:ss a')}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
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
                    onPress={() => {
                        updateData({
                            title: state.title,
                            date: state.date,
                            time: state.time,
                            status: 0,
                        });
                    }}
                >
                    <Text style={{ color: '#fff' }}>Update</Text>
                </TouchableOpacity>
                {state.show_date_picker && state.date_picker_type === 'date' && (
                    <DateTimePicker
                        value={state.date}
                        mode={state.date_picker_type}
                        display="default"
                        onChange={(e, value) => {
                            dispatch({ type: 'setDate', value });
                        }}
                    />
                )}
                {state.show_date_picker && state.date_picker_type === 'time' && (
                    <DateTimePicker
                        value={state.time}
                        mode={state.date_picker_type}
                        display="default"
                        onChange={(e, value) => {
                            dispatch({ type: 'setTime', value });
                        }}
                    />
                )}
            </View>
            <View>
                <Text>{state.error}</Text>
                <Text>{state.loading ? 'Please wait..' : ''}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default CreateScreen;
