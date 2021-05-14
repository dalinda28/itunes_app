import React from "react";
import { FlatList, StyleSheet, Text, View, Button} from "react-native";
import Favorites from "./Favorites";

const LibraryView = ({ libraryList }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Favorites</Text>
      <FlatList
        data={libraryList}
        renderItem={({ item }) => <Favorites item={item} />}
        keyExtractor={(item) => item.id}
      />
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
});

export default LibraryView;
