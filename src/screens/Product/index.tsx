import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';
import { Input } from '@components/Input';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView, TouchableOpacity, Alert } from 'react-native';
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

export function Product() {

  const [image, setImage] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');
  const [isLoading, setIsLoading] = useState(false);




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
      if(!name.trim()){
        Alert.alert('Cadastro', 'Informe o nome da pizza.');
        return;
      }

      if(!description.trim()){
        Alert.alert('Cadastro', 'Informe a descrição da pizza.');
        return;
      }

      if(!image ){
        Alert.alert('Cadastro', 'Selecione a imagem da pizza.');
        return;
      }

      if(!priceSizeP.trim() || !priceSizeM.trim() || !priceSizeG.trim() ){
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
              price_sizes:  {
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

  return (
    <Container >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>
        <Header>
          <ButtonBack />
          <Title>
            Cadastrar
          </Title>
          <TouchableOpacity>
            <DeleteLabel>
              Deletar
            </DeleteLabel>
          </TouchableOpacity>
        </Header>
        <Upload  >
          <Photo
            uri={image}
          />
          <PickImageButton
            onPress={pickImage}
            title={'Carregar'}
            type={'secondary'}
          />
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

          <Button
            title='Cadastrar pizza'
            isLoading={isLoading}
            onPress={handleAdd}
          />

        </Form>
      </ScrollView>
    </Container>
  )
}