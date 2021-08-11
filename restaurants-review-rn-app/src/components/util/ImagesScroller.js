import React, { memo } from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import * as R from 'ramda';
import SampleImages from '../../util/sampleImages';

const ImagesScroller = ({ id, grand }) => {
  const randomIndex = () => Math.floor(Math.random() * (33 - 0) + 0);
  let images = [
    SampleImages[randomIndex()],
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
        style={listStyle}
        data={images}
        renderItem={({ item: imgSrc }) => (
          <Image style={imageStyle} source={imgSrc} resizeMode="contain" resizeMethod="resize" />
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
    height: 200,
  },
  image: {
    height: 200,
    width: 200,
    margin: 1.5,
  },
  grandList: {
    height: 300,
  },
  grandImage: {
    height: 300,
    width: 300,
    margin: 1.5,
  },
});

// const ImagesScroller = memo(
//   (props) => <PlainImagesScroller {...props} />,
//   (oldProps, newProps) => {
//     const idSame = oldProps.id === newProps.id;
//     // const grandSame = oldProps.grand === newProps.grand;
//     return true;
//   }
// );

export default ImagesScroller;
