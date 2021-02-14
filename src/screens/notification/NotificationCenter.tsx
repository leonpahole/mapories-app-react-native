import React from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getNotifications} from '../../api/notification.api';
import {Spinner} from '../../components/common/Spinner';
import {Header} from '../../components/Header';
import {NotificationListItem} from '../../components/notification/NotificationListItem';
import {SubtitleText} from '../../components/styled/typography/SubtitleText';
import {useCursorPagination} from '../../hooks/useCursorPagination';

export const NotificationCenter: React.FC = () => {
  const [
    notifications,
    error,
    loading,
    refreshing,
    fetchNotifications,
    doRefresh,
  ] = useCursorPagination(getNotifications);

  if (error) {
    return (
      <View>
        <SubtitleText>An error has ocurred.</SubtitleText>
      </View>
    );
  }
  return (
    <>
      <Header title={'Notification center'} />
      <View
        style={{
          padding: 10,
          paddingHorizontal: 20,
          flex: 1,
        }}>
        <FlatList
          data={notifications}
          renderItem={({item}) => <NotificationListItem notification={item} />}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={doRefresh} />
          }
          ListFooterComponent={() => <Spinner loading={loading} />}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            fetchNotifications();
          }}
        />
      </View>
    </>
  );
};
