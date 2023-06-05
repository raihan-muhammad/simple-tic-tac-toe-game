import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  difficulty: {
    color: "#fff",
    fontSize: 22,
  },
  results: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 40
  },
  resultsBox: {
    alignItems: "center",
    marginHorizontal: 10
  },
  resultTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },
  resultCount: {
    color: "#fff",
    fontSize: 20
  },
  modal: {
    position: "absolute",
    backgroundColor: "orange",
    bottom: 40,
    left: 30,
    right: 30,
    padding: 30,
    borderWidth: 3,
    borderColor: "#fff"
  },
  modalText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30
  }
});

export default styles;
