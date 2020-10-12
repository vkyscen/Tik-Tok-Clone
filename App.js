import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import {Container} from "native-base";

const {width , height} = Dimensions.get("window")
export default function App() {
  const [data, setData] = useState(null);
  const arr =[
    "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
    "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8"
  ]
  useEffect(() => {
    fetch("https://europe-west1-boom-dev-7ad08.cloudfunctions.net/videoFeed",{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: 0,
      })
    })
      .then((res) => res.json())
      .then((json) => { 
        setData(json)
        console.log(data)
      }
      )
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <View style={styles.container}>
    <View style={{width: width , height: height,backgroundColor: "black"}}>
    <Video 
    // source={{uri: "https://www.w3schools.com/html/mov_bbb.mp4"}}   
    source={{uri: "https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8"}}   
                                    
    // onBuffer={this.onBuffer}                // Callback when remote video is buffering
    // onError={this.videoError}  
    resizeMode='stretch'             // Callback when video cannot be loaded
    style={{...StyleSheet.absoluteFill}} />
    </View> 
    
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