import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {getLatestChats} from '../../api/chat.api';
import {Spinner} from '../../components/common/Spinner';
import {StyledTextInput} from '../../components/styled/input/StyledTextInput';
import {SubtitleText} from '../../components/styled/typography/SubtitleText';
import {UserListItem} from '../../components/user/UserListItem';
import {useLoggedInUser} from '../../hooks/useLoggedInUser';
import {LatestChatItem, UpdateChatLogMessage} from '../../model/Chat';
import {ChatStackNavigatorScreens} from '../../navigation/ChatStackNavigator';
import {ChatSocketContext} from '../../socket/ChatSocket';
import {ColorScheme} from '../../styles/colors';
import PushNotification from 'react-native-push-notification';

const ChatOverview: React.FC = () => {
  const [latestChats, setLatestChats] = useState<LatestChatItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');

  const navigation = useNavigation();
  const ws = useContext(ChatSocketContext);

  const loggedInUser = useLoggedInUser();

  async function fetchFriends() {
    setLoading(true);
    try {
      const latestChatsF = await getLatestChats();
      setLatestChats(latestChatsF);
    } catch (e) {
      console.log('Fetch latest chats error');
      console.log(e);
    }

    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchFriends();
  }, []);

  useEffect(() => {
    console.log('Socket changed:', ws?.socketConnected);
    if (!ws?.socketConnected) {
      return;
    }

    const receiveMessageCleanup = ws.onMessage(onReceiveMessage);

    return () => {
      receiveMessageCleanup();
    };
  }, [ws?.socketConnected]);

  const onReceiveMessage = (m: UpdateChatLogMessage) => {
    PushNotification.localNotification({
      channelId: 'your-channel-id',
      title: 'My Notification Title',
      message: 'My Notification Message',
    });

    setLatestChats((chats) =>
      chats.map((c) => {
        if (c.chatroomId === m.chatroomId) {
          return {
            ...c,
            lastMessage: m.message,
            isNew: m.message.sender.id !== loggedInUser?.id,
          };
        }

        return c;
      }),
    );
  };

  return (
    <View
      style={{
        padding: 10,
        paddingHorizontal: 20,
      }}>
      <View style={{marginBottom: 10}}>
        <StyledTextInput
          style={{
            borderColor: ColorScheme.grayLight,
            backgroundColor: ColorScheme.white,
          }}
          placeholder={'Search users...'}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        keyboardShouldPersistTaps={'always'}
        data={latestChats
          .filter(
            (f) =>
              f.otherUsers.length === 1 &&
              f.otherUsers[0].name
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) >= 0,
          )
          .sort((u1, u2) => {
            if (u1.lastMessage == null && u2.lastMessage != null) {
              return 1;
            } else if (u1.lastMessage != null && u2.lastMessage == null) {
              return -1;
            } else {
              return u1.lastMessage!.createdAt > u2.lastMessage!.createdAt
                ? -1
                : 1;
            }
          })}
        renderItem={({item}) => (
          <UserListItem
            user={item.otherUsers[0]}
            isChat={true}
            onPress={() => {
              setLatestChats((c) =>
                c.map((lc) => {
                  if (lc.chatroomId === item.chatroomId) {
                    return {
                      ...lc,
                      isNew: false,
                    };
                  }

                  return lc;
                }),
              );

              navigation.navigate(ChatStackNavigatorScreens.ChatPM, {
                userId: item.otherUsers[0].id,
                chatroomId: item.chatroomId,
              });
            }}
            isNewChat={item.isNew}
            lastMessage={item.lastMessage}
          />
        )}
        keyExtractor={(item) => item.otherUsers[0].id}
        ListHeaderComponent={() => {
          if (!ws?.socketConnected) {
            return (
              <View style={{marginBottom: 10}}>
                <Text style={{color: ColorScheme.error}}>
                  Lost connection to chat, please wait...
                </Text>
              </View>
            );
          }

          return null;
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await fetchFriends();
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <Spinner loading={loading} />}
        ListEmptyComponent={() => {
          if (loading) {
            return null;
          }

          return (
            <SubtitleText>No users to chat with at the moment.</SubtitleText>
          );
        }}
      />
    </View>
  );
};

export {ChatOverview};
