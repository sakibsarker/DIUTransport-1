import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Text, useTheme } from "react-native-paper";
import MIcon from "react-native-vector-icons/MaterialIcons";

const Seat = ({ props, navigation }) => {
  const theme = useTheme();
  const { id, available, seatId, booked, sold } = props;
  const handlePress = () => {
    if (available && !booked && !sold) {
      navigation.navigate("selectMethod");
    }
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ marginVertical: 15, flexDirection: "row", padding: 10 }}
    >
      <MIcon
        name="airline-seat-recline-extra"
        size={25}
        color={
          available
            ? theme.colors.green
            : booked
            ? theme.colors.darkPurple
            : theme.colors.darkRed
        }
      />
      <Text>{seatId}</Text>
    </TouchableOpacity>
  );
};

export default Seat;
