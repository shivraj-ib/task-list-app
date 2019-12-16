import React, { useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";

const reducer = (state, action) => {
  switch (action.type) {
    case "setTitle":
      return { ...state, title: action.value };

    case "showDatePicker":
      return { ...state, show_date_picker: action.value };

    case "setDatePickerType":
      return { ...state, date_picker_type: action.value };

    case "setDate":
      /**
       * To do better this logic below
       */
      if(typeof action.value === "undefined"){
        return {
          ...state,
          date: new Date(),
          date_picker_type: 'date',
          show_date_picker: false
        };
      } else if( state.date_picker_type === "date" ) {
        return {
          ...state,
          date: action.value,
          date_picker_type: 'time',
        };
      } else {
        return {
          ...state,
          date: action.value,
          date_picker_type: 'date',
          show_date_picker: false
        };
      }

    default:
      return state;
  }
};

const CreateScreen = () => {
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    show_date_picker: false,
    date: new Date(),
    date_picker_type: "date"
  });

  console.log(state);

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.textInputStype}
        onChangeText={text => dispatch({ type: "setTitle", value: text })}
        placeholder="Enter task title..."
        value={state.title}
      />
      <View
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 3,
          marginTop: 5
        }}
      >
        <TouchableOpacity
          onPress={() => dispatch({ type: "showDatePicker", value: true })}
        >
          <FontAwesome name="calendar" size={30} />
        </TouchableOpacity>
      </View>
      {state.show_date_picker && (
        <DateTimePicker
          value={state.date}
          mode={state.date_picker_type}
          display="default"
          onChange={(e, value) => {
            dispatch({ type: "setDate", value });
          }}
        />
      )}
      <TouchableOpacity>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 5
  },
  textInputStype: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  dateBtn: {
    padding: 5,
    borderWidth: 1,
    backgroundColor: "blue",
    color: "white"
  }
});

export default CreateScreen;
