
import React, { useEffect } from 'react';
import { ButtonBack } from '@components/ButtonBack';
import { PIZZA_TYPES } from '@utils/pizzaTypes'
import {
  Container,
  Form,
  Header,
  Photo,
  Sizes,
  Title,
  InputGroup,
  FormRow,
  Label,
  Price,
  ContentScroll
} from './styles';
import { RadioButton } from '@components/RadioButton';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OderNavigationProps } from '@src/@types/navigation'
import { ProductProps } from '@src/components/ProductCard'
import { Alert } from 'react-native';
import { useAuth } from '@hooks/auth';


type PizzaResponse = ProductProps & {
  price_sizes: {
    [key: string]: number
  }
}

export function Order() {

  const [size, setSize] = React.useState('');
  const [pizza, setPizza] = React.useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = React.useState(0);
  const [tableNumber, setTableNumber] = React.useState('');
  const [sendingOrder, setSendingOrder] = React.useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const { id } = route.params as OderNavigationProps;

  const amount = size ? pizza.price_sizes[size] * quantity : '0,00';


  async function handleSendOrder() {

    if (!size) {
      Alert.alert('Selecione o tamanho');
      return;
    }

    if (!quantity) {
      Alert.alert('Selecione a quantidade');
      return;
    }

    if (!tableNumber) {
      Alert.alert('Selecione a mesa');
      return;
    }

    setSendingOrder(true);

    firestore()
      .collection('orders')
      .add({
        quantity,
        amount,
        pizza: pizza.name,
        size,
        table_number: tableNumber,
        status: 'Preparando',
        waiter_id: user?.id,
        image: pizza.photo_url,
      })
      .then(() => {

        navigation.navigate('home');
      }
      )
      .catch(() => {
        Alert.alert('Erro ao enviar pedido');
        setSendingOrder(false);
      }
      )

  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection('pizzas')
        .doc(id)
        .get()
        .then(response => setPizza(response.data() as PizzaResponse))
        .catch(() => Alert.alert('Erro', 'Não foi possível carregar a pizza'))
    }

  }, [])



  return (
    <Container >
      <ContentScroll >
        <Header>
          <ButtonBack
            onPress={() => navigation.goBack()}
            style={{
              marginBottom: 108
            }}
          />


        </Header>
        <Photo source={{ uri: pizza.photo_url }} />

        <Form>
          <Title>
            {pizza.name}
          </Title>
          <Label>Selecione um tamanho</Label>
          <Sizes>
            {PIZZA_TYPES.map((item) => {
              return <RadioButton
                key={item.id}
                title={item.name}
                onPress={() => setSize(item.id)}
                selected={size === item.id}
              />
            })}
          </Sizes>
          <FormRow>
            <InputGroup>
              <Label>
                Número da mesa
              </Label>
              <Input keyboardType="numeric"
                onChangeText={setTableNumber}

              />
            </InputGroup>

            <InputGroup>
              <Label>
                Quantidade
              </Label>
              <Input keyboardType="numeric"
                onChangeText={(value) => setQuantity(Number(value))}
              />
            </InputGroup>
          </FormRow>

          <Price>
            Valor de R$ {amount}
          </Price>

          <Button 
          onPress={handleSendOrder}
          isLoading={sendingOrder}
          title="Confirmar pedido" />

        </Form>
      </ContentScroll>
    </Container>
  )
}