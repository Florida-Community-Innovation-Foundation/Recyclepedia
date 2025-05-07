import React, { useRef, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { useSearchBox } from "react-instantsearch-core";

export function SearchBox(props) {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

  function setQuery(newQuery) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  // Bypass the state update if the input is focused to avoid concurrent
  // updates when typing.
  if (query !== inputValue && !inputRef.current?.isFocused()) {
    setInputValue(query);
  }

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={inputValue}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
        autoCapitalize="none"
        autoCorrect={true}
        spellCheck={true}
        autoComplete="off"
        placeholder="Search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    fontSize: 16,
    borderRadius: 8,
  },
});
