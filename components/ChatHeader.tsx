import {Ref, useImperativeHandle, useState} from 'react';
import {Pressable, Text, StyleSheet, Switch, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const colors = {
  green: '#38C172',
  purple: '#7966FF',
  grey: '#F5F6FA',
  white: '#FFF',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  titlebar: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
  },
  headingText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  pressable: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 50,
    marginRight: 10,
    marginLeft: 10,
  },
  urgencybar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  switch: {
    marginLeft: 10,
    marginRight: 14,
  },
  urgentext: {
    color: 'black',
    fontSize: 16,
  },
});

export interface ChatHeaderRef {
  isEmergency: boolean;
}

export default function ChatHeader(
  _: any,
  ref: Ref<ChatHeaderRef>,
): JSX.Element {
  const [isEmergency, setIsEmergency] = useState(false);

  useImperativeHandle(ref, () => ({isEmergency}), [isEmergency]);

  return (
    <View style={styles.container}>
      <View style={styles.titlebar}>
        <Pressable style={styles.pressable}>
          <Ionicons name="arrow-back-outline" size={35} color="white" />
        </Pressable>
        <Text style={styles.headingText}>Chat</Text>
        <Pressable style={styles.pressable}>
          <Ionicons name="search-outline" size={25} color="white" />
        </Pressable>
      </View>
      <View style={styles.urgencybar}>
        <Switch
          style={styles.switch}
          trackColor={{false: colors.grey, true: colors.purple}}
          thumbColor={colors.white}
          ios_backgroundColor={colors.grey}
          onValueChange={value => {
            setIsEmergency(value);
          }}
          value={isEmergency}
        />
        <Text style={styles.urgentext}>Connect Care Crew</Text>
      </View>
    </View>
  );
}
