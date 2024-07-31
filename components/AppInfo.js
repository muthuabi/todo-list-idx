import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { mystyles } from './MyStyles';
const todo_logo = require('../assets/todo-icon.png');

export default function AppInfo() {
  const url = 'https://github.com/muthuabi/ToDo-List/blob/main/LICENSE';
  const social_media_data = [
    {
      platform: 'Gmail',
      url: 'mailto:muthuabi292@gmail.com',
      icon: 'envelope',
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/M_Krish_Abi_07/',
      icon: 'twitter',
    },
    {
      platform: 'Github',
      url: 'https://github.com/muthuabi/',
      icon: 'github',
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/muthukrishnan-m-800bb7274/',
      icon: 'linkedin',
    },

    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/m.krish_abi_07',
      icon: 'instagram',
    },
  ];

  const openLink = (url) => {
    Linking.openURL(url);
  };
  return (
    <View style={app_info_styles.app_container}>
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Text style={mystyles.heading}>ToDo List App</Text>
        <Text>Version 1.0</Text>
      </View>
      <View style={app_info_styles.todo_logo_container}>
        <Image style={app_info_styles.todo_logo} source={todo_logo} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Icon name="copyright" size={15} />
        <Text>2024 Muthukrishnan M</Text>
      </View>
      <TouchableOpacity
        style={app_info_styles.license_btn}
        title="License"
        onPress={() => {
          openLink(url);
        }}>
        <Text style={[mystyles.text, { fontSize: 15 }]}>License</Text>
      </TouchableOpacity>
      <View style={app_info_styles.socials_container}>
        {social_media_data.map((element) => (
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Icon name={element.icon} size={25} onPress={()=>{openLink(element.url)}} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const app_info_styles = StyleSheet.create({
  app_container: {
    padding: 10,
    marginTop: -50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todo_logo_container: {
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    marginBottom:15,
  },
  todo_logo: {
    width: 150,
    height: 150,
    backgroundColor: '#29c5f6',
    borderRadius: 25,
    shadowOffset: [{ width: 2, height: 2 }],
    shadowOpacity: 5,
    shadowRadius: 2,
    shadowColor: 'gray',
  },
  license_btn: {
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 35,
    backgroundColor: 'powderblue',
    borderRadius: 25,
  },
  socials_container: {
    marginVertical:25,
    flexDirection: 'row',
    gap:15,
  },
});
