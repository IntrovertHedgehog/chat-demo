import IconAnt from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import React, {Ref, useImperativeHandle, useState} from 'react';
import {Modal, Text, View, Pressable, StyleSheet} from 'react-native';

const colors = {
  grey: '#E5E5EA',
  green: '#38C172',
  lightgrey: "#21293A1A"
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#0008',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    paddingTop: 20,
    paddingBottom: 80,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeading: {
    fontSize: 26,
    fontWeight: '600',
    alignSelf: 'flex-start',
    color: '#111',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    height: 60,
    marginTop: 15,
    elevation: 2,
    backgroundColor: '#38c172',
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  reactionBox: {
    marginTop: 20,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  voteButton: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1.5,
    borderRadius: 10,
    height: 120,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
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

  const likeColor = messageFeedback.vote == 1 ? colors.green : colors.grey;
  const dislikeColor = messageFeedback.vote == -1 ? colors.green : colors.grey;

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Pressable style={styles.closeButton} onPress={closeModal}>
            <IconAnt name="closecircle" size={30} color={colors.lightgrey} />
          </Pressable>
          <Text style={styles.modalHeading}>Rate Response</Text>
          <View style={styles.reactionBox}>
            <Pressable
              style={{...styles.voteButton, borderColor: likeColor}}
              onPress={voteUp}>
              <SimpleLineIcons name="like" size={45} color={likeColor} style={{fontWeight: '100'}}/>
              <Text style={{fontSize: 15, color: likeColor}}>Like</Text>
            </Pressable>
            <Pressable
              style={{...styles.voteButton, borderColor: dislikeColor}}
              onPress={voteDown}>
              <SimpleLineIcons name="dislike" size={45} color={dislikeColor} />
              <Text style={{fontSize: 15, color: dislikeColor}}>Dislike</Text>
            </Pressable>
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
