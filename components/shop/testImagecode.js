import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';

const ImageLoader = () => {

    const thumbnailSrc = 'https://res.cloudinary.com/dobanpo5b/image/upload/v1710500001/neom-brFQojtwSzE-unsplash_1_sbbfju.jpg';
  const mainSrc = 'https://svs.gsfc.nasa.gov/vis/a030000/a030800/a030877/frames/5760x3240_16x9_01p/BlackMarble_2016_1200m_africa_s_labeled.png';
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <View style={{flex:1}}>
      {!imageLoaded && <Image source={{uri: thumbnailSrc}} style={{width: 100, height: 100,backgroundColor:'green'}} />}
      <Image
        source={{uri: mainSrc}}
        style={{width: 100, height: 100,backgroundColor:'red',display:imageLoaded?'flex':'none'}}
        onLoadEnd={handleImageLoad}
      />
    </View>
  );
};

export default ImageLoader;