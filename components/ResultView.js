import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Result from "./Result";

const ResultView = ({ libraryList }) => {
  return (
    <View>
      <Text style={styles.header}>Details Music</Text>
      <FlatList
        data={libraryList}
        renderItem={({ item }) => <Result item={item} />}
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

export default ResultView;
