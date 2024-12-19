import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import battery from "../components/assets/interface.png";
import engine from "../components/assets/car.png";
import tire from "../components/assets/tire.png" 
import dashboard from "../components/assets/velocity.png" 
import vehicle from "../components/assets/wheel.png" 
import graphs from "../components/assets/graphs.png" 

const Dashboard = () => {

  const navigation = useNavigation();
  const menuItems = [
    { title: 'Dashboard', icon: dashboard},
    { title: 'Diagnostic', icon: engine },
    { title: 'Performance', icon: tire },
    { title: 'Graphing', icon: graphs},
    { title: 'Battery', icon: battery },
    { title: 'Vehicle', icon: vehicle },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battery Health Assement</Text>
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <View style={styles.iconPlaceholder}>
              <Image source={item.icon} style={styles.icon}/>
             
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.connectButton} onPress={()=>{navigation.navigate('BluetoothUI')}}>
        <Text style={styles.connectText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A5ACD',
    marginTop: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#E0E6FF',
    borderRadius: 15,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#C9D1FF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    color: '#6A5ACD',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon:{
    width:25,
    height:25,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6A5ACD',
  },
  connectButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  connectText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default Dashboard;
