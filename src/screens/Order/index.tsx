
import React from 'react';
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
 

export function Order() {

  const [size, setSize] = React.useState('');

  return (
    <Container >
      <ContentScroll >
        <Header>
          <ButtonBack
            onPress={() => { }}
            style={{
              marginBottom: 108
            }}
          />


        </Header>
        <Photo source={{ uri: 'http://github.com/ermessonlima.png' }} />

        <Form>
          <Title>
            Nome da Pizza
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
              <Input keyboardType="numeric" />
            </InputGroup>

            <InputGroup>
              <Label>
                Quantidade
              </Label>
              <Input keyboardType="numeric" />
            </InputGroup>
          </FormRow>

          <Price>
            Valor de R$ 00,00
          </Price>

          <Button title="Confirmar pedido" />

        </Form>
      </ContentScroll>
    </Container>
  )
}