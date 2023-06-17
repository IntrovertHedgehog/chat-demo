import {Ref, useImperativeHandle, useState} from 'react';
import {Pressable, Text, StyleSheet, Switch, Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  switch: {
    marginLeft: 10,
  },
});

export default function ChatHeader2(
  {isEmergency, setIsEmergency}: {isEmergency: boolean, setIsEmergency: (arg0: boolean) => void}
): JSX.Element {
  const [animation, __] = useState(new Animated.Value(0));

  const handleAnimation = () => {
    Animated.timing(animation, {
      toValue: isEmergency ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const interpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#38C172', '#FF5500'],
  });

  return (
    <Animated.View style={[styles.container, {backgroundColor: interpolation}]}>
      <Switch
        style={styles.switch}
        trackColor={{false: '#E3FCEC', true: '#FFEEE6'}}
        thumbColor={isEmergency ? '#8e0000' : '#006821'}
        onValueChange={value => {
          setIsEmergency(value);
          handleAnimation();
        }}
        value={isEmergency}
      />
      <Text style={styles.headingText}>
        {isEmergency ? 'Emergency Mode' : 'Chat'}
      </Text>
      <Pressable style={styles.pressable}>
        <Ionicons name="search-outline" size={25} color="white" />
      </Pressable>
    </Animated.View>
  );
}
