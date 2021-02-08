import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {getMyFriends} from '../../api/friends.api';
import {Spinner} from '../../components/common/Spinner';
import {StyledTextInput} from '../../components/styled/input/StyledTextInput';
import {SubtitleText} from '../../components/styled/typography/SubtitleText';
import {UserListItem} from '../../components/user/UserListItem';
import {UserExcerpt} from '../../model/UserExcerpt';
import {ColorScheme} from '../../styles/colors';

const ChatOverview: React.FC = () => {
  const [friends, setFriends] = useState<UserExcerpt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');

  async function fetchFriends() {
    setLoading(true);
    try {
      const friendsF = await getMyFriends();
      setFriends(friendsF);
    } catch (e) {
      console.log('Fetch friends error');
      console.log(e);
    }

    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchFriends();
  }, []);

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
        data={friends.filter(
          (f) => f.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0,
        )}
        renderItem={({item}) => <UserListItem user={item} isChat={true} />}
        keyExtractor={(item) => item.id}
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
