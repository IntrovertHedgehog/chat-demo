import * as TalkRn from '@talkjs/react-native';
import {forwardRef, useEffect, useRef, useState} from 'react';
import _Feedback, {FeedbackRef} from '../components/Feedback';

const Feedback = forwardRef(_Feedback);

function ChatHuman(): JSX.Element {
  const chatBoxRef = useRef<TalkRn.ChatboxRef>(null);
  const feedbackRef = useRef<FeedbackRef>(null);
  useEffect(() => {
    chatBoxRef!.current!.onCustomMessageAction('feedback', event => {
      openModal();
    });
  });

  const openModal = () => {
    feedbackRef!.current!.openModal();
  };

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
    TalkRn.oneOnOneId(me, other),
  );

  converationBuilder.setParticipant(me);
  converationBuilder.setParticipant(other);
  converationBuilder.setParticipant(bot);

  return (
    <TalkRn.Session appId="tE8jvP6M" me={me}>
      <Feedback ref={feedbackRef} />
      <TalkRn.Chatbox
        theme="empower"
        conversationBuilder={converationBuilder}
        ref={chatBoxRef}
      />
    </TalkRn.Session>
  );
}

export default ChatHuman;
