import {WS_URL} from '@env';
import React, {createContext, useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useAccessToken} from '../hooks/useLoggedInUser';
import {BecomeOnlineMessage, UpdateChatLogMessage} from '../model/Chat';
import useAppState from 'react-native-appstate-hook';

type ChatSocketContext = {
  socketConnected: boolean;
  sendMessage: (chatroomId: string, message: string) => void;
  onMessage(callback: (p: UpdateChatLogMessage) => void): () => void;
  onMessageInChatroom(
    chatroomId: string,
    callback: (p: UpdateChatLogMessage) => void,
  ): () => void;
  onOnlineStatuses(callback: (p: BecomeOnlineMessage[]) => void): () => void;
  onBecomeOnline(callback: (p: BecomeOnlineMessage) => void): () => void;
  onBecomeOffline(callback: (p: BecomeOnlineMessage) => void): () => void;
};

const ChatSocketContext = createContext<ChatSocketContext | null>(null);

export {ChatSocketContext};

let socket: SocketIOClient.Socket | null = null;

export default ({children}: any) => {
  let ws: ChatSocketContext | null = null;

  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const {appState} = useAppState();

  const accessToken = useAccessToken();

  useEffect(() => {
    setSocketConnected(false);

    if (!accessToken) {
      console.log('No access token, cannot connect to socket.');
      return;
    }

    if (appState !== 'active') {
      console.log('App in background, not connecting to socket.');
      return;
    }

    console.log('Connecting to socket');
    socket = io.connect(WS_URL + '/chat', {
      query: {
        token: accessToken,
      },
      transports: ['websocket'],
      jsonp: false,
      forceNew: true,
    });

    socket.on('connect', () => {
      setSocketConnected(true);
      console.log('Socket connected!');
    });

    socket.on('connect_error', (e: any) => {
      console.log('Socket connect error!');
      console.log(JSON.stringify(e));
    });

    socket.on('connect_timeout', (e: any) => {
      console.log('Socket connect timeout!');
      console.log(JSON.stringify(e));
    });

    socket.on('reconnect', (n: number) => {
      setSocketConnected(true);
      console.log(`Socket reconnected on attempt ${n}!`);
    });

    socket.on('reconnect_attempt', () => {
      console.log('Socket attempting reconnect!');
    });

    socket.on('reconnecting', (n: number) => {
      console.log(`Socket attempting reconnect on attempt ${n}!`);
    });

    socket.on('reconnect_error', (e: any) => {
      console.log('Socket reconnect error!');
      console.log(JSON.stringify(e));
    });

    socket.on('reconnect_failed', () => {
      console.log('Socket failed reconnect!');
    });

    socket.on('disconnect', () => {
      setSocketConnected(false);
      console.log('Socket disconnected!');
    });

    return () => {
      console.log('Socket disconnecting');
      socket?.removeAllListeners();
      socket?.disconnect();
      socket = null;
    };
  }, [accessToken, appState]);

  const sendMessage = (chatroomId: string, message: string) => {
    const payload = {
      chatroomId,
      message,
    };

    if (socket && socketConnected) {
      socket.emit('event://send-message', payload);
    } else {
      console.log('Socket not connected!');
    }
  };

  function onEvent<T>(event: string, callback: (p: T) => void): () => void {
    if (socket && socketConnected) {
      console.log('Subscribe to', event);
      socket.on(event, callback);
    } else {
      console.log('Socket not connected!', socketConnected, socket);
    }

    return () => {
      if (socket) {
        console.log('Removing event listener', event);
        socket.removeEventListener(event, callback);
      }
    };
  }

  const onMessage = (
    callback: (p: UpdateChatLogMessage) => void,
  ): (() => void) => {
    return onEvent('event://get-message', callback);
  };

  const onMessageInChatroom = (
    chatroomId: string,
    callback: (p: UpdateChatLogMessage) => void,
  ): (() => void) => {
    return onEvent('event://get-message/' + chatroomId, callback);
  };

  const onOnlineStatuses = (
    callback: (p: BecomeOnlineMessage[]) => void,
  ): (() => void) => {
    return onEvent('event://online-statuses', callback);
  };

  const onBecomeOnline = (
    callback: (p: BecomeOnlineMessage) => void,
  ): (() => void) => {
    return onEvent('event://become-online', callback);
  };

  const onBecomeOffline = (
    callback: (p: BecomeOnlineMessage) => void,
  ): (() => void) => {
    return onEvent('event://become-offline', callback);
  };

  ws = {
    socketConnected,
    sendMessage,
    onMessage,
    onMessageInChatroom,
    onOnlineStatuses,
    onBecomeOnline,
    onBecomeOffline,
  };

  return (
    <ChatSocketContext.Provider value={ws}>
      {children}
    </ChatSocketContext.Provider>
  );
};
