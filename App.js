import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import {Container} from "native-base";

const {width , height} = Dimensions.get("window")

export default function App() {
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