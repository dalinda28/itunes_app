import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MusicItem from "../MusicItem";

const LibraryView = ({ libraryList }) => {
  return (
    <View>
      <Text style={styles.header}>LibraryView</Text>
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
