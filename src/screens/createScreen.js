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
    const [state, dispatch] = useReducer(reducer, {
        title: '',
        show_date_picker: false,
        date: new Date(),
        time: new Date(),
        date_picker_type: 'date',
        loading: false,
        error: '',
    });

    const storeData = async data => {
        dispatch({ type: 'setLoader', value: true });
        dispatch({ type: 'setError', value: '' });
        try {
            data.key =
                '_' +
                Math.random()
                    .toString(36)
                    .substr(2, 9);

            //get old data
            let old_data = await AsyncStorage.getItem('my_todos');
            old_data = old_data !== null ? JSON.parse(old_data) : [];
            const new_data = [...old_data, data];
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
        <View style={styles.formContainer}>
            <TextInput
                style={styles.textInputStype}
                onChangeText={text => dispatch({ type: 'setTitle', value: text })}
                placeholder="Enter task title..."
                value={state.title}
            />
            <View
                style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    padding: 3,
                    marginTop: 5,
                }}
            >
                <TouchableOpacity onPress={() => dispatch({ type: 'showDatePicker', value: true })}>
                    <FontAwesome name="calendar" size={30} />
                    <Text>
                        {moment(state.date).format('MMMM Do YYYY')}, {moment(state.time).format('h:mm:ss a')}
                    </Text>
                </TouchableOpacity>
            </View>
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
            <TouchableOpacity
                style={{ borderWidth: 3, color: 'red', backgroundColor: 'blue' }}
                onPress={() => {
                    storeData({
                        title: state.title,
                        date: state.date,
                        time: state.time,
                        status: 0,
                    });
                }}
            >
                <Text>Submit</Text>
            </TouchableOpacity>
            <Text>{state.error}</Text>
            <Text>{state.loading ? 'Please wait..' : ''}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        padding: 5,
    },
    textInputStype: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    },
    dateBtn: {
        padding: 5,
        borderWidth: 1,
        backgroundColor: 'blue',
        color: 'white',
    },
});

export default CreateScreen;
