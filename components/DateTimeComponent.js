import React, { useState,useEffect } from 'react';
import { View, Button, StyleSheet, Text,TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
const DateTime = (props) => {
  const init_date=new Date();
  const [date, setDate] = useState(new Date(init_date.getFullYear(),init_date.getMonth(),init_date.getDate()+1,10,10,0));
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  useEffect(()=>{
    props.setDateTime(date);
    setMode(props.mode);
  },[props,date])
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  };

  const showDateTimePicker = () => {
    setMode('date');
    setShow(true);
  };

  return (
    <View >
      <TouchableOpacity style={{justifyContent:'center'}} onPress={showDateTimePicker} title="Show Date & Time Picker" >

      <Icon name={props.mode=='date'?'calendar':'clock-o'} size={15} />
      {show && (
        <DateTimePicker
          value={date}
          mode={props.mode}
          display="default"
          minimumDate={new Date()}
          onChange={onChange}
        />
      )}
    </TouchableOpacity>
    </View>
  );
};

export default DateTime;