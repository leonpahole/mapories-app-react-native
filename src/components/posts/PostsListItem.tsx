import React from 'react';
import {Image, Text, View} from 'react-native';
import {Post} from '../../model/Post';
import {ColorScheme} from '../../styles/colors';
import {AuthorHeader} from '../common/AuthorHeader';
import {Map} from '../map/Map';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {RootNavigatorScreens} from '../../navigation/RootNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LikeButton} from './LikePostButton';

export type PostListType = 'feed' | 'user';

export type IPostsListItemProps = {
  post: Post;
  onLikeStatusChange(status: boolean): void;
  onPostPress?(): void;
  onUserPress?(): void;
  card?: boolean;
};

const PostsListItem: React.FC<IPostsListItemProps> = ({
  post,
  onLikeStatusChange,
  onPostPress,
  onUserPress,
  card = true,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: ColorScheme.white,
        padding: card ? 20 : undefined,
        elevation: card ? 2 : undefined,
        marginBottom: card ? 10 : undefined,
      }}>
      <AuthorHeader
        post={post}
        onSubtitlePress={() => {
          onPostPress && onPostPress();
        }}
        onUserPress={() => {
          onUserPress && onUserPress();
        }}
      />
      <View style={{marginTop: 10, marginLeft: 10, marginBottom: 10}}>
        <Text style={{color: ColorScheme.gray}}>{post.post.content}</Text>
      </View>
      {post.post.mapory && (
        <Map
          center={post.post.mapory.location}
          markers={[{...post.post.mapory.location, id: post.post.id}]}
          onPress={() => {
            navigation.navigate(RootNavigatorScreens.MapScreen, {
              center: post.post.mapory!.location,
              markers: [{...post.post.mapory!.location, id: post.post.id}],
            });
          }}
        />
      )}
      {post.post.images && post.post.images.length > 0 && (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate(RootNavigatorScreens.GalleryScreen, {
              imageUris: post.post.images.map((i) => i.url),
            });
          }}>
          <Image
            source={{
              uri: post.post.images[0].url,
            }}
            style={{height: 200, resizeMode: 'cover'}}
          />
        </TouchableWithoutFeedback>
      )}
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <LikeButton post={post} onLikeStatusChange={onLikeStatusChange} />
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => {
            onPostPress && onPostPress();
          }}>
          <Icon name="comments" size={25} color={ColorScheme.grayLight} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {PostsListItem};
