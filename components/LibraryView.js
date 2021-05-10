import React from "react";
import { FlatList, StyleSheet, Text, View, Button} from "react-native";
import MusicItem from "./MusicItem";
import Result from "./Result";

const LibraryView = ({ libraryList }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Library</Text>
      <FlatList
        data={libraryList}
        renderItem={({ item }) => <MusicItem item={item} />}
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

export default LibraryView;
