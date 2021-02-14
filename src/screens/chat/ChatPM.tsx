import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getChatroom, getChatsForChatroom} from '../../api/chat.api';
import {ChatMessage} from '../../components/chat/ChatMessage';
import {Spinner} from '../../components/common/Spinner';
import {StyledTextInputWithButton} from '../../components/styled/input/StyledTextInputWithButton';
import {SubtitleText} from '../../components/styled/typography/SubtitleText';
import {useLoggedInUser} from '../../hooks/useLoggedInUser';
import {
  Chatroom,
  ChatroomMessage,
  UpdateChatLogMessage,
} from '../../model/Chat';
import {ChatStackNavigatorParamList} from '../../navigation/ChatStackNavigator';
import {RootNavigatorScreens} from '../../navigation/RootNavigator';
import {SideStackNavigatorScreens} from '../../navigation/SideStackNavigator';
import {ChatSocketContext} from '../../socket/ChatSocket';
import {ColorScheme} from '../../styles/colors';

type ChatPMNavigationProp = RouteProp<ChatStackNavigatorParamList, 'ChatPM'>;

const ChatPM: React.FC = ({}) => {
  const route = useRoute<ChatPMNavigationProp>();

  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [chatroom, setChatroom] = useState<Chatroom | null>(null);

  const [text, setText] = useState<string>('');

  const [messages, setMessages] = useState<ChatroomMessage[]>([]);
  const [paginationCursor, setPaginationCursor] = useState<
    number | undefined | null
  >(undefined);

  const loggedInUser = useLoggedInUser();

  const ws = useContext(ChatSocketContext);

  const navigation = useNavigation<any>();

  async function fetchChats(doRefresh = false) {
    setLoading(true);

    try {
      let currentPaginationCursor = paginationCursor;
      if (doRefresh) {
        currentPaginationCursor = undefined;
      }

      if (currentPaginationCursor === null) {
        setRefreshing(false);
        setLoading(false);
        return;
      }

      const chatsF = await getChatsForChatroom(
        route.params.chatroomId,
        currentPaginationCursor,
      );

      if (doRefresh) {
        setMessages([...chatsF.data]);
      } else {
        setMessages([...messages, ...chatsF.data]);
      }

      setPaginationCursor(chatsF.cursor);
    } catch (e) {
      console.log('Fetch chats error');
      console.log(e);
    }

    setRefreshing(false);
    setLoading(false);
  }

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (!ws?.socketConnected) {
      return;
    }

    const receiveMessageCleanup = ws.onMessageInChatroom(
      route.params.chatroomId,
      onReceiveMessage,
    );

    return () => {
      receiveMessageCleanup();
    };
  }, [ws?.socketConnected, route.params.chatroomId]);

  const onReceiveMessage = (m: UpdateChatLogMessage) => {
    setMessages((messages) => [m.message, ...messages]);
  };

  useEffect(() => {
    async function fetchProfile() {
      setLoadingProfile(true);
      try {
        let fChatroom = await getChatroom(route.params.chatroomId);
        setChatroom(fChatroom);
      } catch (e) {
        console.log('Profile error');
        console.log(e);
      }

      setLoadingProfile(false);
    }

    fetchProfile();
  }, [route.params.chatroomId]);

  let content = null;
  if (loadingProfile) {
    content = (
      <View>
        <Spinner loading={loadingProfile} />
      </View>
    );
  } else if (!chatroom) {
    content = (
      <View>
        <SubtitleText>User could not be found at this moment.</SubtitleText>
      </View>
    );
  } else {
    content = (
      <SafeAreaView
        style={{
          backgroundColor: ColorScheme.white,
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 10,
        }}>
        <FlatList
          data={messages}
          renderItem={({item}) => <ChatMessage message={item} />}
          keyExtractor={(item, i) => (item.id ? item.id : i.toString())}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await fetchChats(true);
              }}
            />
          }
          ListHeaderComponent={() => {
            if (!ws?.socketConnected) {
              return (
                <View>
                  <Text style={{color: ColorScheme.error}}>
                    Lost connection to chat, please wait...
                  </Text>
                </View>
              );
            }

            return null;
          }}
          ListFooterComponent={() => <Spinner loading={loading} />}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            fetchChats();
          }}
          inverted={true}
        />
        <View
          style={{
            paddingVertical: 6,
          }}>
          <StyledTextInputWithButton
            placeholder={'Message...'}
            style={{
              borderColor: ColorScheme.grayLight,
              backgroundColor: ColorScheme.white,
            }}
            iconName={'send'}
            onPress={() => {
              if (text.trim().length > 0) {
                ws?.sendMessage(route.params.chatroomId, text.trim());
              }
              setText('');
            }}
            onChangeText={(s) => setText(s)}
            value={text}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={{height: '100%', backgroundColor: ColorScheme.white}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginRight: 20,
          paddingVertical: 13,
        }}>
        <HeaderBackButton
          pressColorAndroid={ColorScheme.transparent}
          label={chatroom ? 'Chat with ' + chatroom.name : ''}
          labelVisible={true}
          labelStyle={{
            fontWeight: 'bold',
            marginLeft: 5,
          }}
          tintColor={ColorScheme.black}
          onPress={() => {
            navigation.pop();
          }}
        />
        {chatroom && chatroom.participants.length === 2 && (
          <TouchableOpacity
            onPress={() => {
              if (!chatroom) {
                return;
              }

              const otherUser = chatroom.participants.find(
                (u) => u.id !== loggedInUser?.id,
              );

              if (!otherUser) {
                return;
              }

              navigation.navigate(RootNavigatorScreens.SideStack, {
                screen: SideStackNavigatorScreens.SingleProfileView,
                params: {userId: otherUser.id},
              });
            }}>
            <Icon name="user" size={20} color={ColorScheme.black} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 1}}>{content}</View>
    </View>
  );
};

export {ChatPM};
