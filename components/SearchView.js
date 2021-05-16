import React from "react";
import { useHistory } from "react-router-dom";
import { useNavigation } from '@react-navigation/native';

import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import Favorites from "./Favorites";

const formatResponse = (item) => {
  return {
    title: item.trackName,
    artist: item.artistName,
    artwork: item.artworkUrl100,
    price: item.collectionPrice,
    genre: item.primaryGenreName,
    year: item.releaseDate,
    url: item.previewUrl,
    id: item.trackId.toString(),
  };
};

const searchItunes = async (query) => {
  if (query == "") return;
  const formattedQuery = query.split(" ").join("+");
  const response = await fetch(
    `https://itunes.apple.com/search?term=${formattedQuery}`
  );
  const json = await response.json();
  return json.results
    .filter((item) => item.trackId && item.trackName)
    .map(formatResponse);
};

const SearchView = ({ onAdd }) => {
  const [input, setInput] = useState("");
  const [listResults, setListResults, List] = useState([]);

  const handleSubmit = () => {
    searchItunes(input).then((result) => {
      setListResults(result);
    });
  };

  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(handleSubmit, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Search</Text>
      <TextInput
        value={input}
        style={styles.input}
        onChangeText={setInput}
        placeholder="Search artist or music ..."
      />
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={listResults}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onAdd(item);
                  navigation.navigate('Result');
                }}
              >
                <Favorites item={item} />
                <Button style={styles.button} color="black" title="Add to favories" onPress={() => { onAdd(item); navigation.navigate('Music'); }} />
              </TouchableOpacity>

            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    backgroundColor: "black",
    color: "white",
    padding: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
  },
  button: {
    paddong: 200,
  },

});

export default SearchView;
