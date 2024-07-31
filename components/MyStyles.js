import {StyleSheet} from 'react-native';
export const mystyles = StyleSheet.create({
  container: {
    paddingTop: 55,
    padding:10,
    flex: 1,
  },

  heading: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
  },
  addinput: {
    flexDirection: 'row',
    gap: 5,
    margin: 2,
    padding: 5,
  },
  textinput: {
    borderBottomWidth: 1,
    flex: 1,
    fontSize: 15,
  },
  text: {
    fontWeight: 'bold',
  },
  todo_text: {
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#29c5f6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    textAlign: 'center',
    borderRadius: 10,
    minWidth: 'fit-content',
  },
  add_btn: {
    backgroundColor: '#29c5f6',
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
  nav_tabs_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  nav_tabs: {
    flexDirection: 'row',
    gap: 2.5,
  },
  list_container: {
    marginTop: 10,
  },
  task_container: {
    height: 600,
    overflowY: 'scroll',
    paddingVertical:5,
    paddingBottom:15,
    borderRadius:5
  },
  inner_list_view_item: {
    flex: 1,
    paddingRight: 5,
    gap: 3,
  },
  list_view_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'azure',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    marginVertical: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    shadowColor: '#5icon_size06A',
  },
  datetime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  inner_datetime: {
    flexDirection: 'row',
    gap: 5,
    alignItems:'center'
  },
  list_time_badge: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: 15,
    alignItems: 'center',
    gap: 5,
  },
});

