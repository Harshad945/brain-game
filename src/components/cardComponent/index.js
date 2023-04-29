import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CardComponent = ({letterName, isSelected, onPressCard}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const scale = animation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const onPressIn = () => {
    if (!isSelected) {
      Animated.timing(animation, {
        toValue: 180,
        useNativeDriver: true,
        duration: 500,
      }).start();
    }
  };

  const onPressOut = () => {
    if (!isSelected) {
      setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          useNativeDriver: true,
          duration: 500,
        }).start();
      }, 200);
    }
  };

  return (
    <Animated.View style={[styles.m5, {transform: [{rotateY: scale}]}]}>
      <TouchableOpacity
        activeOpacity={isSelected ? 1 : 0}
        onPress={onPressCard}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={styles.cardPressStyle}>
        {isSelected ? (
          <View style={styles.cardTextViewStyle}>
            <Text style={styles.cardTextStyle}>{letterName}</Text>
          </View>
        ) : (
          <View
            style={[styles.cardTextViewStyle, {backgroundColor: '#BA68C8'}]}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  m5: {
    margin: 5,
  },
  cardPressStyle: {
    height: 100,
    elevation: 3,
    borderRadius: 10,
  },
  cardImgStyle: {
    height: 100,
    width: '100%',
    borderRadius: 10,
  },
  cardTextViewStyle: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#E1BEE7',
    borderRadius: 10,
  },
  cardTextStyle: {
    alignSelf: 'center',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 40,
  },
});
