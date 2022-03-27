import React, { useState, useCallback } from 'react';
import happyEmoji from '@assets/happy.png';
import { MaterialIcons } from '@expo/vector-icons';
import { NewProductButton, Container, Header, Greeting, GreetingEmoji, GreetingText, SignOut, MenuHeader, MenuItemsNumber, Title } from './styles';
import { useTheme } from 'styled-components';
import { Search } from '@components/Search';
import { ProductCard, ProductProps } from '@components/ProductCard';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export function Home() {

  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const theme = useTheme();

  function fetchPizzas(value: string) {
    const formatedValue = value.toLowerCase().trim();

    firestore()
      .collection('pizzas')
      .orderBy('name_insensitive')
      .startAt(formatedValue)
      .endAt(`${formatedValue}\uf8ff`)
      .get()
      .then(response => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as ProductProps[];
        setPizzas(data);
      }).catch(() => {
        Alert.alert('Consulta', 'Não foi possível realizar a consulta');
      });
  }

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleSearchClear() {
    setSearch('');
    fetchPizzas('');
  }

  function handleOpen(id: string) {
    navigation.navigate('product', { id });
  }

  function handleAdd() {
    navigation.navigate('product', {});
  }



  useFocusEffect(
    useCallback(() => {
      fetchPizzas('');
    }, [])
  );





  return (
    <Container >
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <SignOut>
          <MaterialIcons name="logout" size={24} color={theme.COLORS.TITLE} />
        </SignOut>
      </Header>
      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear} />
      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber >
          10 pizzas
        </MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            onPress={() => handleOpen(item.id)}
            data={item} />
        )

        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 125, marginHorizontal: 24 }}
      />

      <NewProductButton
        onPress={handleAdd}
        title={'Cadastrar pizza'}
        type={'secondary'}

      />


    </Container>
  )
}