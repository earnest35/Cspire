import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View, } from 'react-native';
import { useState,useEffect } from 'react';
import axios from 'axios'

export default function App() {
  const [ip, setIP] = useState("");
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [summaryNetworkStatistics, setSummaryNetworkStatistics] = useState("");
  const [currentData, setCurrentData] = useState({});
  const [allData, setAllData] = useState([]);

  // This function is correctly implemented for an Axios call
  const getIPAndLocation = async () => {
    try {
      const res = await axios.get("https://geolocation-db.com/json/");
      console.log(res.data);
      setLocation(`${res.data.city},${res.data.state},${res.data.country_code}`);
      setCoordinates(`Latitude: ${res.data.latitude}, Longitude: ${res.data.longitude}`);
      //setIP(res.data)
      setIP(res.data.IPv4);
      //setLocation(`${res.data.city},${res.data.state},${res.data.country_code}`);
     // setCoordinates(`Latitude: ${res.data.latitude}, Longitude: ${res.data.longitude}`);
      console.log(`IP:${ip}`)
      console.log(`Coordinaties: ${coordinates}`)
      console.log("IP and Location Request Complete");
    } catch (error) {
      console.warn(error);
    }
  };

  // Adjusted to use useEffect for dependency on IP change
  useEffect(() => {
    const getSummaryNetworkStatistics = async () => {
      if (ip) {
        try {
          const response = await axios.get(`http://192.168.0.89:5000/ip?ipAddr=${ip}`);
          console.log(response.data);
          setSummaryNetworkStatistics(response.data.summarynetworkstats);
          console.log("Summary Network Statistics Complete");
          setCurrentData({
            ip,
            location,
            coordinates,
            summaryNetworkStatistics: response.data.summarynetworkstats,
          });
        } catch (error) {
          console.warn(error);
        }
      }
    };

    getSummaryNetworkStatistics();
  }, [ip]);

  // Adjusting logic for adding to allData
  useEffect(() => {
    if (Object.keys(currentData).length > 0) {
      setAllData(currentAllData => [...currentAllData, currentData]);
      // Reset states after updating allData
      setIP('');
      setLocation('');
      setCoordinates('');
      setSummaryNetworkStatistics('');
      setCurrentData({});
    }
  }, [currentData]);

  const bigRequest = () => {
    getIPAndLocation();
  };
  
  return (
    <ScrollView>
    <Text style={{textAlign:'center',marginTop:100,fontSize:40,color:'black'}}>CrowdNet</Text>
    <View style={styles.container}>
      <StatusBar style="auto" />
      {allData && allData.map((i,index)=>{
        return(
        <View style={styles.square} key={index}>
          <Text>Network Analysis:{"\n"}{i.summaryNetworkStatistics}</Text>
          <Text>Location:{"\n"}{i.location}</Text>
          <Text>Coordinates:{"\n"}{i.coordinates}</Text>
          <Text>IP:{i.ip}</Text>
        </View>
        )
      })}
    </View>
    <Button style={{margin:50,backgroundColor:"black"}} onPress={bigRequest} title="Check Network" backgroundColor ="black"color="red" accessibilityLabel="Learn more about this purple button"/>
    <Button style={{margin:50,backgroundColor:"black"}} onPress={bigRequest} title="Save To CSV" backgroundColor ="black"color="red" accessibilityLabel="Learn more about this purple button"/>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin:1
  },
  square:{
    width:350,
    height:500,
    backgroundColor:'#F5F5F5',
    color:'black',
    margin:10,
    padding:15,
    borderRadius:15
  }
});
