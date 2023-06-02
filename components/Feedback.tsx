import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import React, {Ref, useImperativeHandle, useState} from 'react';
import {
  Modal,
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
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
    marginTop: 15,
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
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
  },
  voteButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 80,
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
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export interface FeedbackRef {
  openModal: () => void;
  closeModal: () => void;
  setMessageId: (arg0: number) => void;
}

export interface MessageFeedback {
  messageId: number;
  vote: -1 | 0 | 1;
  details?: string;
}

function Feedback(_: any, ref: Ref<FeedbackRef>): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  const [messageFeedback, setMessageFeedback] = useState<MessageFeedback>({
    messageId: -1,
    vote: 0,
  });

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setMessageFeedback({...messageFeedback, vote: 0});
  };

  const setMessageId = (arg0: number) => {
    setMessageFeedback({
      messageId: arg0,
      vote: 0,
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      openModal: openModal,
      closeModal: closeModal,
      setMessageId: setMessageId,
    }),
    [openModal, closeModal, setMessageId],
  );

  const voteUp = () => {
    setMessageFeedback({...messageFeedback, vote: 1});
  };

  const voteDown = () => {
    setMessageFeedback({...messageFeedback, vote: -1});
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable style={styles.closeButton} onPress={closeModal}>
            <IconAnt name="close" size={30} />
          </Pressable>
          <Text style={styles.modalHeading}>Is this answer sufficient?</Text>
          <View style={styles.reactionBox}>
            <Pressable style={styles.voteButton} onPress={voteUp}>
              <Icon
                name="thumbs-up"
                size={45}
                color={messageFeedback.vote == 1 ? '#E13700' : '#6d6e70'}
              />
              <Text style={{fontSize: 15}}>Yes </Text>
            </Pressable>
            <Pressable style={styles.voteButton} onPress={voteDown}>
              <Icon
                name="thumbs-down"
                size={45}
                color={messageFeedback.vote == -1 ? '#337CA0' : '#6d6e70'}
              />
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
          <Pressable style={styles.button} onPress={closeModal}>
            <Text style={styles.textStyle}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default Feedback;
