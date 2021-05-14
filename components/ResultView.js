import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Details from "./Details";

const ResultView = ({ libraryList }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Details Music</Text>
      <FlatList
        data={libraryList}
        renderItem={({ item }) => <Details item={item} />}
        keyExtractor={item => item.trackId}      />
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

export default ResultView;
