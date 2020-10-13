import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { DataCall } from './Utils/DataCall';
// import { Container } from "native-base";

const ViewTypes = {
  FULL: 0,
};
export default function App() {
  const { width, height } = Dimensions.get("window")
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(0);
  const [dataProvider, setDataprovider] = useState(new DataProvider((r1, r2) => {
    return r1 !== r2;
  }
    // , (index) => videos[index].playbackUrl
  )
  );
  const [layoutProvider, setLayoutprovider] = useState(new LayoutProvider(
    index => ViewTypes.FULL,
    (type, dim) => {
      switch (type) {
        case ViewTypes.FULL:
          dim.width = width;
          dim.height = height;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  ));
  inProgressNetworkReq = false

  useEffect(() => {
    fetchMoreData()
  }
    , []);

  useEffect(() => {
    console.log(videos);
  }, [videos]);

  fetchMoreData = async () => {
    if (!inProgressNetworkReq) {

      inProgressNetworkReq = true;
      const videos = await DataCall(page)
      inProgressNetworkReq = false;

      setDataprovider(dataProvider.cloneWithRows(

        videos.concat(videos)
      ))
      setVideos(prevState => [...prevState, ...videos])

    }
  }

  rowRenderer = (type, data) => {
    switch (type) {
      case ViewTypes.FULL:
        return (
          <Video
            source={{ uri: data.playbackUrl }}
            resizeMode='stretch'
            style={{ ...StyleSheet.absoluteFill }}
            selectedVideoTrack={{
              type: "resolution",
              value: 240
            }}
          />
        );
      default:
        return null;
    }
  }

  handleListEnd = () => {
    setPage(page + 1)
    fetchMoreData();

  };

  renderFooter = () => {
    //Second view makes sure we don't unnecessarily change height of the list on this event. That might cause indicator to remain invisible
    //The empty view can be removed once you've fetched all the data
    return inProgressNetworkReq
      ? <ActivityIndicator
        style={{ margin: 10 }}
        size="large"
        color={'black'}
      />
      : <View style={{ height: 60 }} />;
  };
  return (
    <View style={styles.container}>
      {videos != null
        ? <RecyclerListView
          style={{ flex: 1 }}
          onEndReached={handleListEnd}
          dataProvider={dataProvider}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
          renderFooter={renderFooter}

          renderAheadOffset={1.5}
          onEndReachedThreshold={2}
        />
        : null}

    </View>
  );
}

const styles = StyleSheet.create({

  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1
  },
});


/*
<View style={styles.container}>
      <View style={{ width: width, height: height, backgroundColor: "black" }}>
        <Video
          // source={{uri: "https://www.w3schools.com/html/mov_bbb.mp4"}}
          source={{ uri: "https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8" }}

          // onBuffer={this.onBuffer}                // Callback when remote video is buffering
          // onError={this.videoError}
          resizeMode='stretch'             // Callback when video cannot be loaded
          style={{ ...StyleSheet.absoluteFill }} />
      </View>

    </View>
*/