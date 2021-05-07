import React from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import MusicItem from "../MusicItem";

const formatResponse = (item) => {
  return {
    title: item.trackName,
    artist: item.artistName,
    artwork: item.artworkUrl100,
    genre: item.primaryGenreName,
    year: item.releaseDate,
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
  const [listResults, setListResults] = useState([]);

  const handleSubmit = () => {
    searchItunes(input).then((result) => {
      setListResults(result);
    });
  };

  useEffect(() => {
    const timeout = setTimeout(handleSubmit, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return (
    <View>
      <Text style={styles.header}>SearchView</Text>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Search iTunes"
      />
      <FlatList
        data={listResults}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              onAdd(item);
            }}
          >
            <MusicItem item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    backgroundColor: "tomato",
    color: "white",
    padding: 10,
  },
});

export default SearchView;
