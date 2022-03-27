import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';
import { Input } from '@components/Input';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductNavigationProps } from '@src/@types/navigation'

import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView, TouchableOpacity, Alert, View, ActivityIndicator } from 'react-native';
import {
  Container,
  Header,
  Title,
  DeleteLabel,
  PickImageButton,
  Upload,
  InputGroup,
  Form,
  InputGroupHeader,
  Label,
  MaxCharacteres
} from './styles';
import { InputPrice } from '@components/InputPrice';
import { Button } from '@components/Button';
import { ProductProps } from '@components/ProductCard';

type PizzaResponse = ProductProps & {
  photo_path: string
  price_sizes: {
    p: string;
    m: string;
    g: string;

  }

}

export function Product() {
  const [photoPath, setPhotoPath] = useState('');
  const [image, setImage] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  const { id } = route.params as ProductNavigationProps;
console.log(id)

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  const handleAdd = async () => {
    if (!name.trim()) {
      Alert.alert('Cadastro', 'Informe o nome da pizza.');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Cadastro', 'Informe a descrição da pizza.');
      return;
    }

    if (!image) {
      Alert.alert('Cadastro', 'Selecione a imagem da pizza.');
      return;
    }

    if (!priceSizeP.trim() || !priceSizeM.trim() || !priceSizeG.trim()) {
      Alert.alert('Cadastro', 'Informe o preço de todos os tamanhos da pizza.');
      return;
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    try {
      await reference.putFile(image);
      const photo_url = await reference.getDownloadURL();

      firestore().collection('pizzas').add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        price_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG
        },
        photo_url,
        photo_path: reference.fullPath
      }).then(() => {
        Alert.alert('Cadastro', 'Pizza cadastrada com sucesso.');
        setIsLoading(false);
        setName('');
        setDescription('');
        setImage('');
        setPriceSizeP('');
        setPriceSizeM('');
        setPriceSizeG('');
      }).catch(() => {
        Alert.alert('Cadastro', 'Erro ao cadastrar a pizza.');
        setIsLoading(false);
      });

    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }


  };


  function handleDelete() {
    setIsLoading(true);
    firestore()
    .collection('pizzas')
    .doc(id)
    .delete()
    .then(() => {
        storage()
        .ref(photoPath)
        .delete()
        .then(() =>  navigation.navigate('home'))
  
      }).catch((err) => {
        console.log(err)
        setIsLoading(false);
      });
  }



  useEffect(() => {
    if (id) {
      firestore().collection('pizzas').doc(id).get().then(doc => {
        if (doc.exists) {
          const { name, description, price_sizes, photo_url, photo_path } = doc.data() as PizzaResponse;
          setName(name);
          setDescription(description);
          setPriceSizeP(price_sizes.p);
          setPriceSizeM(price_sizes.m);
          setPriceSizeG(price_sizes.g);
          setImage(photo_url);
          setPhotoPath(photo_path);
        }
      }).catch(() => {
        Alert.alert('Erro', 'Erro ao carregar a pizza.');
      });
    }
  }, [id]);


  return (
    <Container >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>
        <Header>
          <ButtonBack onPress={() => navigation.goBack()} />
          <Title>
            Cadastrar
          </Title>
          {id ? <TouchableOpacity>
           { isLoading ?  <ActivityIndicator size="small" color="#fff" />
            :
            <DeleteLabel onPress={handleDelete}>
              Deletar
            </DeleteLabel>}

          </TouchableOpacity> :
            <View style={{ width: 20 }} />
          }
        </Header>
        <Upload  >
          <Photo
            uri={image}
          />
          {!id && <PickImageButton
            onPress={pickImage}
            title={'Carregar'}
            type={'secondary'}
          />}
        </ Upload  >

        <Form>
          <InputGroup>
            <Label>
              Nome
            </Label>
            <Input
              value={name}
              onChangeText={setName}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>
                Descrição
              </Label>
              <MaxCharacteres>
                {description.length} de 60 caracteres
              </MaxCharacteres>
            </InputGroupHeader>
            <Input
              multiline={true}
              maxLength={60}
              style={{ height: 80 }}
              value={description}
              onChangeText={setDescription}
            />
          </InputGroup>

          <InputGroup>
            <Label>
              Tamanhos e preços
            </Label>
            <InputPrice
              value={priceSizeP}
              onChangeText={setPriceSizeP}
              size='P'
            />
            <InputPrice
              size='M'
              value={priceSizeM}
              onChangeText={setPriceSizeM}
            />
            <InputPrice
              size='G'
              value={priceSizeG}
              onChangeText={setPriceSizeG}
            />

          </InputGroup>

          {!id && <Button
            title='Cadastrar pizza'
            isLoading={isLoading}
            onPress={handleAdd}
          />}

        </Form>
      </ScrollView>
    </Container>
  )
}