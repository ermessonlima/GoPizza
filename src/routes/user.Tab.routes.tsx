import React, {useEffect, useState} from 'react';

import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';   
import { useTheme } from 'styled-components/native';

import { Home  } from '@screens/Home';
import { Orders } from '@screens/Orders';
import BottomMenu from '@components/BottomMenu';
import firestore from '@react-native-firebase/firestore';

 

const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {

    const [notification, setNotification] = useState('0');
    const {COLORS} = useTheme();

    useEffect(() => {
        const subscribe = firestore()
          .collection('orders')
          .where('status', '==', 'Pronto')
          .onSnapshot(querySnapshot => {
                setNotification(querySnapshot.docs.length.toString());
          });

          return () => subscribe();


    }, []);

    return (
        <Navigator
            screenOptions={
                {
                    tabBarActiveTintColor: COLORS.SECONDARY_900,
                    tabBarInactiveTintColor: COLORS.SECONDARY_400, 
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        height: 80,
                        paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    },
                }
            }>
            <Screen name="home" component={Home}
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: ({ color, size }) => (
                        <BottomMenu  title="Cardápio" color={color}/>  
                    ),
                }}
            />
            <Screen name="orders" component={Orders}
            options={{
                tabBarLabel: 'Início',
                tabBarIcon: ({ color, size }) => (
                    <BottomMenu  title="Pedidos" color={color} notifications={notification}/>  
                ),
            }}
            />
            </Navigator>
    )
}