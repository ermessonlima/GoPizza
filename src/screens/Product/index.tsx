import { ButtonBack } from '@components/ButtonBack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Title, DeleteLabel } from './styles';

export function Product() {

  return (
    <Container >
      <Header>
        <ButtonBack/>
      <Title>
        Cadastrar
      </Title>
      <TouchableOpacity>
        <DeleteLabel>
          Deletar
        </DeleteLabel>
      </TouchableOpacity>
      </Header>
   
    </Container>
  )
}