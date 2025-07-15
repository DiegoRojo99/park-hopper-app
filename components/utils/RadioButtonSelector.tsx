import { Text, TouchableOpacity, View } from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';
import { SortOption } from "../../types/navigation";

export default function RadioButtonSelector({
  options,
  selectedOption,
  onSelect,
}: {
  options: SortOption[];
  selectedOption: SortOption;
  onSelect: (option: SortOption) => void;
}) {
  return (
    <View style={{ flexDirection: 'column' }}>
      {options.map((option) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }} key={option}>
          <Text>{option}</Text>
          <RadioButton active={selectedOption === option} onPress={() => onSelect(option)} />
        </View>
      ))}
    </View>
  );
}

function RadioButton({ active, onPress }: { active: boolean; onPress: () => void }) {
  if (active) {
    return (
      <TouchableOpacity onPress={onPress} style={{ padding: 8, borderRadius: 4 }}>
        <Fontisto name="radio-btn-active" size={16} color="black" />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 8, borderRadius: 4 }}>
      <Fontisto name="radio-btn-passive" size={16} color="black" />
    </TouchableOpacity>
  );
}