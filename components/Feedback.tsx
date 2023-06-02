import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {
  Modal,
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingTop: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 2,
    backgroundColor: '#38c172',
  },
  modalHeading: {
    fontSize: 24,
    color: '#111',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reactionBox: {
    marginTop: 20,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
  },
  voteButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    height: 60,
    flex: 1,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
    borderRadius: 12,
    fontSize: 17,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  }
});

function Feedback({showFeedback, close}: {showFeedback: boolean, close: () => void}): JSX.Element {
  return (
    <Modal transparent={true} visible={showFeedback}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable style={styles.closeButton} onPress={close}>
            <IconAnt name="close" size={30} />
          </Pressable>
          <Text style={styles.modalHeading}>Is this answer sufficient?</Text>
          <View style={styles.reactionBox}>
            <Pressable
              style={styles.voteButton}
              onPress={() => console.log(12)}>
              <Icon name="thumbs-up" size={45} />
              <Text style={{fontSize: 15}}>Yes </Text>
            </Pressable>
            <Pressable
              style={styles.voteButton}
              onPress={() => console.log(13)}>
              <Icon name="thumbs-down" size={45} />
              <Text style={{fontSize: 15}}>No </Text>
            </Pressable>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TextInput
              style={styles.input}
              placeholder="Details..."
              multiline
            />
          </View>
          <Pressable style={styles.button} onPress={close}>
            <Text style={styles.textStyle}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default Feedback;
