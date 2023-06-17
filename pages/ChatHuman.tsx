import * as TalkRn from '@talkjs/react-native';
import {forwardRef, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {SendMessageEvent} from 'talkjs/all';
import _ChatHeader, {ChatHeaderRef} from '../components/ChatHeader';
import _Feedback, {FeedbackRef} from '../components/Feedback';

const Feedback = forwardRef(_Feedback);
const ChatHeader = forwardRef(_ChatHeader);

function ChatHuman(): JSX.Element {
  const chatBoxRef = useRef<TalkRn.ChatboxRef>(null);
  const feedbackRef = useRef<FeedbackRef>(null);
  const chatHeaderRef = useRef<ChatHeaderRef>(null);
  useEffect(() => {
    chatBoxRef!.current!.onCustomMessageAction(
      'feedback',
      feedbackRef!.current!.openModal,
    );
  });

  const me = {
    id: '123456789',
    name: 'Alice',
    email: 'alice@example.com',
    photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
    welcomeMessage: 'Hey there! How are you? :-)',
    role: 'default',
  };

  const other = {
    id: '987654321',
    name: 'Dr. Sebastian',
    email: 'Sebastian@example.com',
    photoUrl: 'https://talkjs.com/images/avatar-5.jpg',
    welcomeMessage: 'Hey, how can I help? https://google.com',
    role: 'default',
  };

  const bot = {
    id: '23571113',
    name: 'HealthBot',
    email: 'bot@example.com',
    photoUrl:
      'https://static.vecteezy.com/system/resources/previews/010/054/157/original/chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-background-stock-illustration-ai-technology-futuristic-helper-communication-conversation-concept-in-flat-style-vector.jpg',
    role: 'default',
  };

  const converationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(me, other)
  );

  converationBuilder.setParticipant(me);
  converationBuilder.setParticipant(other);
  converationBuilder.setParticipant(bot);

  const loading = (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ActivityIndicator size={50} />
    </View>
  );

  const addMessageType = (event: SendMessageEvent) => {
    // event.override({
    //   custom: {
    //     type: "emergency"
    //   }
    // })
  };

  return (
    <TalkRn.Session appId="tE8jvP6M" me={me}>
      <Feedback ref={feedbackRef} />
      <ChatHeader ref={chatHeaderRef}/>
      <TalkRn.Chatbox
        loadingComponent={loading}
        showChatHeader={false}
        theme="empower"
        conversationBuilder={converationBuilder}
        ref={chatBoxRef}
        onSendMessage={addMessageType}
      />
    </TalkRn.Session>
  );
}

export default ChatHuman;
