import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const logo = require('../assets/vs-services-logo.png');

export default function BrandLogo({ compact = false, light = false }) {
  return (
    <View style={[styles.wrap, compact && styles.wrapCompact, light && styles.wrapLight]}>
      <Image source={logo} style={[styles.logo, compact && styles.logoCompact]} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
    paddingVertical: 4
  },
  wrapCompact: {
    paddingVertical: 0
  },
  wrapLight: {
    backgroundColor: 'transparent'
  },
  logo: {
    width: 220,
    height: 88
  },
  logoCompact: {
    width: 180,
    height: 72
  }
});
