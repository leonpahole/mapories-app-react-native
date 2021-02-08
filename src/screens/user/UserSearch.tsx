import React, {useCallback, useState} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {StyledTextInput} from '../../components/styled/input/StyledTextInput';
import {ColorScheme} from '../../styles/colors';
import debounce from 'lodash.debounce';
import {searchUsers} from '../../api/user.api';
import {UserExcerpt, UserProfile} from '../../model/UserExcerpt';
import {Spinner} from '../../components/common/Spinner';
import {UserListItem} from '../../components/user/UserListItem';
import {SubtitleText} from '../../components/styled/typography/SubtitleText';
import {
  initialPaginationInfo,
  PaginationData,
} from '../../model/PaginatedResponse';
import {useLoggedInUser} from '../../hooks/useLoggedInUser';
import {useNavigation} from '@react-navigation/native';
import {MainTopTabNavigatorScreens} from '../../navigation/MainTopTabNavigator';
import {RootNavigatorScreens} from '../../navigation/RootNavigator';
import {SideStackNavigatorScreens} from '../../navigation/SideStackNavigator';

const UserSearch: React.FC = ({}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const [userData, setUserData] = useState<PaginationData<UserExcerpt>>({
    data: [],
    pagination: initialPaginationInfo,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const loggedInUser = useLoggedInUser();
  const navigation = useNavigation();

  const debouncedSave = useCallback(
    debounce(async (nextValue) => {
      fetchUsers(nextValue);
    }, 700),
    [],
  );

  async function fetchUsers(q: string, doRefresh: boolean = false) {
    setQuery(q);

    if (q.length < 3) {
      setUserData({
        data: [],
        pagination: initialPaginationInfo,
      });
      return;
    }

    if (!userData.pagination.moreAvailable && !doRefresh) {
      return;
    }

    if (doRefresh) {
      setRefreshing(true);
    }

    let pageNumber = userData.pagination.pageNumber;
    if (doRefresh || query !== q) {
      pageNumber = 0;
    }

    try {
      setLoading(true);
      const usersF = await searchUsers(q, pageNumber);
      setUserData({
        data:
          pageNumber > 0
            ? [...userData.data, ...usersF.data]
            : [...usersF.data],
        pagination: {
          moreAvailable: usersF.moreAvailable,
          pageNumber: pageNumber + 1,
        },
      });
    } catch (e) {
      console.log('User search error');
      console.log(e);
    }

    setLoading(false);
    setRefreshing(false);
  }

  const handleChange = (value: string) => {
    setInputValue(value);
    debouncedSave(value);
  };

  const onUserPress = (user: UserExcerpt) => {
    if (user.id === loggedInUser?.id) {
      navigation.navigate(MainTopTabNavigatorScreens.Profile);
    } else {
      navigation.navigate(RootNavigatorScreens.SideStack, {
        screen: SideStackNavigatorScreens.SingleProfileView,
        params: {userId: user.id},
      });
    }
  };

  return (
    <View
      style={{
        padding: 10,
        paddingHorizontal: 20,
      }}>
      <StyledTextInput
        onChangeText={handleChange}
        value={inputValue}
        placeholder={`Search users...`}
        style={{
          backgroundColor: ColorScheme.white,
          borderColor: ColorScheme.grayLight,
          marginBottom: 10,
        }}
      />

      <FlatList
        data={userData.data}
        renderItem={({item}) => (
          <UserListItem
            user={item}
            onPress={() => {
              onUserPress(item);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View style={{marginVertical: 10}}>
            <Spinner loading={loading} />
          </View>
        )}
        ListEmptyComponent={() => {
          if (query.length < 3) {
            return (
              <SubtitleText>
                Users will appear here. Please type at least 3 characters.
              </SubtitleText>
            );
          } else {
            return <SubtitleText>No users found.</SubtitleText>;
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              await fetchUsers(query, true);
            }}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          fetchUsers(query);
        }}
      />
    </View>
  );
};

export {UserSearch};
