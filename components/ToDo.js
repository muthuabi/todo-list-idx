import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TextInput,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  FlatList,
  Animated,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTime from './DateTimeComponent';
import {mystyles} from './MyStyles'
// import {scheduleNotification} from './components/SimpleNotification';
const ToDo = () => {
  const [data, setData] = useState([]);
  const [item, setItem] = useState('');
  const [permission, setPermission] = useState(false);
  const [tab, setTab] = useState('All');
  const tabs = ['All', 'Completed', 'Pending', 'Overdue'];
  const [selected, setSelected] = useState({});
  const icon_size = 20;
  const [now,setNow] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [pop, setPop] = useState('none');
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    loadData();
    //requestPermission();
  }, []);
  //This causes Date Control not to select the Date and Time
  // useEffect(()=>{
  //   setInterval(()=>{setNow(new Date())},60000);
  // },[])
  // const startAnimation = () => {
  //   Animated.timing(pop, {
  //     toValue:10,
  //     duration: 1000,
  //     useNativeDriver: false,
  //   }).start();
  // };
  //For Media Permission which is not essential mostly
  const requestPermission = async () => {
    if(Platform.OS==='android')
    {
    const storagepermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App Needs to Save Data',
        buttonNeutral: 'Ask Me Later',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      }
    );
    if (storagepermission == PermissionsAndroid.RESULTS.GRANTED) {
      setPermission(true);
    } else {
      Alert.alert('Todo', 'Media Access Denied', [{ text: 'Ok' }], {
        cancelable: false,
      });
    }
  }
    return;
  };

  //The Essential Function which loads data to the 'data' state from AsyncStorage
  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('todoList');
      const d = JSON.parse(jsonValue);
      //console.log('Load Data', d);
      if (d !== null) {
        setData(d);
      } else setData([]);
    } catch (e) {
      console.error('Error reading data from AsyncStorage:', e);
    }
  };

  //The Essential Function which saves the data to AsyncStorage
  const saveToDo = async () => {
    try {
      const jsonValue = JSON.stringify(data);
      //console.log('Save to Do ', jsonValue);
      await AsyncStorage.setItem('todoList', jsonValue);
      //console.log('Data saved successfully');
    } catch (e) {
      console.error('Error saving data', e);
    }
    loadData();
  };

  //Mimics AUTO_INCREMENT of Database
  const maxData = () => {
    let max = 0;
    data.forEach((element) => {
      if (element.id > max) max = element.id;
    });
    return max;
  };

  //The OnPress Handler of Add button which adds task from User Interface
  const addItem = () => {
    var val = {
      id: `${maxData() + 1}`,
      todo: `${item}`,
      createdOn: `${now.toLocaleString()},status`,
      todo_status: `Pending`,
      todo_end_date: date,
      todo_end_time: time,
    };
    if (item.trim()) {
      data.push(val);
      setData(data);
      //setUpdate(true);
      updateOverdue();
      //saveToDo();
      setItem('');
      setPop('none');
    } else {
      setPop('flex');
    }
  };

  //It stores the Tasks selected via LongPress to a 'selected' object
  const addSelected = (id) => {
    if (!selected[id]) {
      const prev = { ...selected };
      prev[id] = 'selected';
      //setSelected({...selected,[key]:'selected'})
      setSelected(prev);
    }
  };

  //It removes the Selected by Pressing on it when Long press selected
  const removeSelected = (id) => {
    if (selected[id]) {
      const prev = { ...selected };
      delete prev[id];
      setSelected(prev);
    }
  };

  //Used to remove the All tasks from AsyncStorage
  const clearAll = async () => {
    try {
      await AsyncStorage.removeItem('todoList');
      //console.log('Data cleared successfully');
      setSelected({});
      loadData();
    } catch (e) {
      console.error('Error clearing data from AsyncStorage:', e);
    }
  };

  //Used to remove Selected Tasks from AsyncStorage
  const clearSelectedItems = () => {
    Object.keys(selected).forEach((element) => {
      removeItem(element);
    });
    setSelected({});
  };

  //Used to mark as completed the Selected Items
  const completeSelectedItems = () => {
    Object.keys(selected).forEach((element) => {
      completeItem(element);
    });
    setSelected({});
  };

  //Used to mark as pending the selected items
  const pendingSelectedItems = () => {
    Object.keys(selected).forEach((element) => {
      pendingItem(element);
    });
    setSelected({});
  };

  //This is an essential function which updates whether a task is overdue or not
  const updateOverdue = () => {
    //let flag=true;
    data.forEach((element) => {
      const now_temp = new Date();
      const item_date = new Date(element.todo_end_date);
      const item_time = new Date(element.todo_end_time);
      const item_date_time = new Date(
        item_date.getFullYear(),
        item_date.getMonth(),
        item_date.getDate(),
        item_time.getHours(),
        item_time.getMinutes(),
        item_time.getSeconds()
      );
      if (item_date_time < now_temp) {
        element.todo_status = 'Overdue';
        /*if(flag) 
        {
          scheduleNotification('Todo','Some Tasks have been Past Due');
          flag=false;
        }*/
      }
    });
    saveToDo();
  };

  //Used to make all tasks as Pending
  const pendingAll = () => {
    data.forEach((element) => {
      if (element.todo_status != 'Overdue') element.todo_status = 'Pending';
    });
    saveToDo();
    setSelected({});
  };

  //Used to make all tasks as completed
  const completeAll = () => {
    data.forEach((element) => {
      if (element.todo_status != 'Overdue') element.todo_status = 'Completed';
    });
    saveToDo();
    setSelected({});
  };

  //Used to make one task completed
  const completeItem = (id) => {
    //console.log(id, data);
    //const removed=[...data];
    //data.length=0;
    data.forEach((element) => {
      if (element.id == id && element.todo_status != 'Overdue')
        element.todo_status = 'Completed';
    });
    saveToDo();
    //loadData();
  };

  //Used to make one task pending
  const pendingItem = (id) => {
    //console.log(id, data);
    //const removed=[...data];
    //data.length=0;
    data.forEach((element) => {
      if (element.id == id && element.todo_status != 'Overdue')
        element.todo_status = 'Pending';
    });
    saveToDo();
    //loadData();
  };

  //Used to make one task Overdue but it is not used
  const overdueItem = (id) => {
    //console.log(id, data);
    //const removed=[...data];
    //data.length=0;
    data.forEach((element) => {
      if (element.id == id) element.todo_status = 'Overdue';
    });
    saveToDo();
    //loadData();
  };

  //Used to remove one task
  const removeItem = (id) => {
    //console.log(id, data);
    const removed = [...data];
    data.length = 0;
    removed.forEach((element) => {
      if (element.id !== id) data.push(element);
    });
    saveToDo();
    //loadData();
  };

  //Handles the Pull-Down Refresh which updates overdue
  const onRefresh = () => {
    setRefreshing(true);
    updateOverdue();
    setRefreshing(false);
  };

  //The Task Item displayed in the user side
  const ListItem = ({ item }) => {
    const item_date = new Date(item.todo_end_date);
    const item_time = new Date(item.todo_end_time);
    const item_date_time = new Date(
      item_date.getFullYear(),
      item_date.getMonth(),
      item_date.getDate(),
      item_time.getHours(),
      item_time.getMinutes(),
      item_time.getSeconds()
    );
    const tomorrow=new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    //console.log(item_date_time.toLocaleDateString() , tomorrow.toLocaleDateString());
    if (item_date_time < now && update) {
      //Mimics Onload event for Update Overdue
      updateOverdue();
      setUpdate(false);
    }

    return (
      <TouchableOpacity
        key={item.id}
        onLongPress={() => {
          addSelected(item.id);
        }}
        onPress={() => {
          if (selected[item.id]) removeSelected(item.id);
          else {
            if (Object.keys(selected).length > 0) addSelected(item.id);
          }
        }}
        style={{
          marginVertical: 2,
          borderRadius: 5,
          backgroundColor: selected[item.id] ? 'cyan' : 'transparent',
        }}>
        <View
          key={item.id}
          style={[
            mystyles.list_view_item,
            {
              backgroundColor:
                item.todo_status == 'Completed'
                  ? 'lightgreen'
                  : item.todo_status == 'Overdue'
                  ? 'red'
                  : 'azure',
              display:
                tab != 'All'
                  ? tab == item.todo_status
                    ? 'flex'
                    : 'none'
                  : 'flex',
            },
          ]}>
          <View style={mystyles.inner_list_view_item}>
            <Text style={mystyles.todo_text}>{item.todo}</Text>
            <Text>{item.todo_status} </Text>
            <View style={mystyles.list_time_badge}>
              <Icon name="calendar" size={13} />
              <Text style={{ fontSize: 12 }}>
                {
                  item_date_time.toLocaleDateString() == now.toLocaleDateString()
                  ? `Today, ${item_date_time.toLocaleTimeString()}`
                  :(item_date_time.toLocaleDateString() == tomorrow.toLocaleDateString()?
                  `Tomorrow, ${item_date_time.toLocaleTimeString()}`
                  :item_date_time.toLocaleString())
                }
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 15, paddingRight: 2 }}>
            <TouchableOpacity
              onPress={() => {
                removeItem(item.id);
              }}>
              <Icon name="trash" size={icon_size} />
            </TouchableOpacity>
            {item.todo_status == 'Pending' ? (
              <TouchableOpacity
                onPress={() => {
                  completeItem(item.id);
                }}>
                <Icon name="check" size={icon_size} color="green" />
              </TouchableOpacity>
            ) : item.todo_status == 'Completed' ? (
              <TouchableOpacity
                onPress={() => {
                  pendingItem(item.id);
                }}>
                <Icon name="times" size={icon_size} color="red" />
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={mystyles.container}>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <View>
      <Text style={mystyles.heading}>Todo List</Text>
      </View>
      <View style={{paddingRight:5,justifyContent:'center'}}>
      <Text>{now.toDateString()}</Text>
      {
      //<Text style={{fontSize:12}}>{(now.getHours()>12?now.getHours()-12:now.getHours())+':'+now.getMinutes()+' '+(now.getHours()<=12?'AM':'PM')}</Text>
      }
      </View>
    </View>

      <View style={mystyles.addinput}>
        <TextInput
          style={mystyles.textinput}
          value={item}
          onChangeText={(text) => setItem(text)}
        />

        <TouchableOpacity style={mystyles.add_btn} onPress={addItem}>
          <Text style={mystyles.text}>Add</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          display: pop,
          color: 'orange',
          transform: [{ translateX: 10 }],
        }}>
        Required
      </Text>
      <Text style={[mystyles.text, { paddingHorizontal: 10 }]}>
        Choose Date and Time (Use Icons)
      </Text>
      <View style={mystyles.datetime}>
        <View style={mystyles.inner_datetime}>
          <DateTime setDateTime={setDate} mode="date" value={date} />
          <Text>{date.toLocaleDateString()}</Text>
        </View>
        <View style={mystyles.inner_datetime}>
          <DateTime setDateTime={setTime} mode="time" value={time} />
          <Text>{time.toLocaleTimeString()}</Text>
        </View>
      </View>
      <View style={mystyles.list_container}>
        <View style={mystyles.nav_tabs_container}>
          <View style={mystyles.nav_tabs}>
            {tabs.map((value, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  mystyles.btn,
                  { backgroundColor: tab == value ? '#1f8fff' : '#29c5f6' },
                ]}
                onPress={() => {
                  setTab(value);
                }}>
                <Text>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ flexDirection: 'row', gap: 2 }}>
            <TouchableOpacity
              onPress={
                Object.keys(selected).length <= 0
                  ? clearAll
                  : clearSelectedItems
              }
              style={[mystyles.btn, { backgroundColor: 'red' }]}>
              <Icon name="trash" size={icon_size} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                Object.keys(selected).length <= 0
                  ? completeAll
                  : completeSelectedItems
              }
              style={[mystyles.btn, { backgroundColor: 'lightgreen' }]}>
              <Icon name="check" size={icon_size} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                Object.keys(selected).length <= 0
                  ? pendingAll
                  : pendingSelectedItems
              }
              style={[mystyles.btn, { backgroundColor: 'red' }]}>
              <Icon name="times" size={icon_size} />
            </TouchableOpacity>
          </View>
        </View>
        {data.length == 0 ? (
          <View style={{ justifyContent: 'center', height: 250 }}>
            <Text style={[mystyles.text, { textAlign: 'center' }]}>
              No Notes
            </Text>
          </View>
        ) : (
          <View style={mystyles.task_container}>
            <FlatList
              data={data}
              renderItem={ListItem}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ToDo;
