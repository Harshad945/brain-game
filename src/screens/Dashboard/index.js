import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import CardComponent from '../../components/cardComponent/index';
import {sampleData} from './sampleData';

const Dashboard = () => {
  const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = useWindowDimensions();
  const [isData, setData] = useState(sampleData);
  const [count, setCount] = useState(0);
  const [match, setMatch] = useState(0);

  useEffect(() => {
    const isShuffleData = isData.sort(() => Math.random() - 0.5);
    setData([...isShuffleData]);
  }, []);

  useEffect(() => {
    if (match === 8) {
      Alert.alert(
        'GAME OVER',
        `
      No Of Attempts: ${count}

      `,
        [
          {
            text: 'Play Again',
            onPress: () => {
              setData(sampleData);
              setCount(0);
              setMatch(0);
            },
          },
          {text: 'Exit', onPress: () => BackHandler.exitApp()},
        ],
      );
    }
  }, [match]);

  const renderItem = ({item, index}) => (
    <View style={{width: '25%'}} key={index}>
      <CardComponent
        isSelected={item.isSelected || item.frize}
        letterName={item.letter}
        onPressCard={() => onCallSelection(item, index)}
      />
    </View>
  );

  const onCallSelection = (item, index) => {
    isData[index].isSelected = true;
    setData([...isData]);
    let value = isData.filter((i, j) => i.isSelected && !i.frize);
    if (value.length === 2) {
      setCount(count + 1);
      if (value[0].letter === value[1].letter) {
        setMatch(match + 1);
        isData.map((i, j) => {
          if (i.id === value[0].id || i.id === value[1].id) {
            i.frize = true;
          }
        });
        setData([...isData]);
      } else {
        const timer = setTimeout(() => {
          isData.map((i, j) => {
            i.isSelected = false;
          });
          setData([...isData]);
        }, 700);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`Attempts: ${count}`}</Text>
        <Text style={styles.title}>{`Matches: ${match}`}</Text>
      </View>
      {isData && isData.length > 0 && (
        <FlatList
          horizontal={false}
          numColumns={4}
          data={isData}
          renderItem={renderItem}
          keyExtractor={(_, j) => j}
        />
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
