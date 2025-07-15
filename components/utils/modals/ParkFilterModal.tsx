import { useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CheckboxSelector from "../RadioButtonSelector";
import colors from "../../../utils/Colors";
import { SortOption } from "../../../types/navigation";

type ParkFilterModalProps = {
  isVisible: boolean;
  onClose: () => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
};

export default function ParkFilterModal({ isVisible, onClose, sortOption, setSortOption }: ParkFilterModalProps) {
  const [sortOpen, setSortOpen] = useState(true);

  return (
    <Modal visible={isVisible} onRequestClose={onClose} animationType="slide" style={styles.modal}>
      <View style={styles.container}>
        {/* Sorting Container */}
        <View style={{ flex: 1}}>
          <View style={styles.titleAndChevron}>
            <Text style={styles.title}>Sort By</Text>
            {sortOpen ? (
              <MaterialCommunityIcons name="chevron-up" size={32} color="black" onPress={() => setSortOpen(false)} />
            ) : (
              <MaterialCommunityIcons name="chevron-down" size={32} color="black" onPress={() => setSortOpen(true)} />
            )}
          </View>
          {sortOpen && (
            <View style={{ marginTop: 16 }}>
              <CheckboxSelector
                options={["Number of Parks", "Name (A-Z)", "Name (Z-A)"]}
                selectedOption={sortOption}
                onSelect={(option) => setSortOption(option as SortOption)}
              />
            </View>
          )}
        </View>

        <Text onPress={onClose} style={styles.button}>Close</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    padding: 32,
    alignItems: "center",
  },
  titleAndChevron: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    color: 'white',
    marginTop: 20,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 16,
    backgroundColor: colors.light.primary,
    borderRadius: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
});