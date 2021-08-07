import React from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import Colors from '../styles/Colors';
import * as R from 'ramda';
import SampleImages from '../util/sampleImages';

const ImagesScroller = ({ id, grand }) => {
  const randomIndex = () => Math.floor(Math.random() * (33 - 0) + 0);
  let images = [
    SampleImages[randomIndex()],
    SampleImages[randomIndex()],
    SampleImages[randomIndex()],
    SampleImages[randomIndex()],
  ];
  images = R.uniq(images);

  const listStyle = grand ? styles.grandList : styles.list;
  const imageStyle = grand ? styles.grandImage : styles.image;
  return (
    <>
      <FlatList
        style={styles.list}
        data={images}
        renderItem={({ item: imgSrc }) => (
          <Image style={styles.image} source={imgSrc} resizeMode="contain" resizeMethod="resize" />
        )}
        horizontal
        keyExtractor={(_, index) => id + index}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    height: 230,
  },
  image: {
    height: 230,
    width: 230,
    margin: 1.5,
  },
  grandList: {
    height: 340,
  },
  grandImage: {
    height: 340,
    width: 340,
    margin: 1.5,
  },
});

export default ImagesScroller;
