import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';
import React, { useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Title, DeleteLabel, PickImageButton, Upload } from './styles';
import { InputPrice } from '@components/InputPrice';

export function Product() {
 
  const [image, setImage] = useState('');


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
  

  return (
    <Container >
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

      <InputPrice size='P' />
      <InputPrice size='M' />
      <InputPrice size='G' />

 

    </Container>
  )
}