import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useMemo, useRef, useEffect } from "react";
import { useTheme, Text, Divider, Button } from "react-native-paper";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusCurrentLocation } from "../../redux/ApiCalls/bus";
import Loader from "../../components/Loader";
import MapMarker from "../../components/MapMarker";

const BusDetails = ({ navigation, route }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "10%"]);
  const theme = useTheme();
  const dispatch = useDispatch();

  const { currentBusLocation, loading, error } = useSelector(
    (state) => state.bus
  );

  useEffect(() => {
    dispatch(fetchBusCurrentLocation("surjomukhi22"));
    if (error) {
      console.log(error);
    }
    console.log(currentBusLocation);
  }, []);

  if (loading && currentBusLocation?.location?.coordinates == undefined) {
    return <Loader />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme?.colors.surface,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <MapMarker coordinates={currentBusLocation?.location?.coordinates} />

      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <BottomSheetView
          style={{
            ...styles.contentContainer,
            backgroundColor: theme.colors.surface,
          }}
        >
          <View>
            <Text
              variant="headlineLarge"
              style={{ paddingTop: 60, paddingBottom: 30 }}
            >
              Ticket Price: 25 BDT
            </Text>
            <Divider />
            <Text>Bus : {route.params?.busId}</Text>
            <Text>Route : {route.params?.routeId}</Text>
            <Text>Options: </Text>
            <TouchableOpacity>
              <Button>1: BKash</Button>
            </TouchableOpacity>
            <TouchableOpacity>
              <Button>2: OneCard</Button>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BusDetails;