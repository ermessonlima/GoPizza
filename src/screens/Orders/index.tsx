
import React, {useEffect, useState} from 'react';
import {
  Container,
 Title,
  Header 
} from './styles';
import { OrderCard, OrderProps } from '@components/OrderCard';
import { FlatList } from 'react-native-gesture-handler';
import ItemSeparator from '@components/ItemSeparator';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/auth';
import { Alert } from 'react-native';

 
export function Orders() {

  const [orders, setOrders] = useState<OrderProps[]>([]);

  const { user } = useAuth();

    function  handlePizzaDelivered (id:string) {
      Alert.alert('Pedido', 'Confirmar que a pizza foi entregue?', [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            firestore()
              .collection('orders')
              .doc(id)
              .update({
                status: 'Entregue',
              });
          },
        }
      ]);
    }

  useEffect(() => {
    const subscribe = firestore()
      .collection('orders')
      .where('waiter_id', '==', user?.id)
      .onSnapshot(querySnapshot => {
          const data = querySnapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            }
          }) as OrderProps[];
          setOrders(data);
      });

      return () => subscribe();

  }, []);
   
  return (
    <Container >

        <Header>
                 <Title >
            Pedidos feitos
          </Title>


        </Header>

        <FlatList 
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
          <OrderCard 
          index={index}
           data={item}
           disabled={item.status === 'Entregue'}
           onPress={() => handlePizzaDelivered(item.id)}
/>
           )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 125 }}
          ItemSeparatorComponent={() => <ItemSeparator/>}

        />


    
     

    </Container>
  )
}