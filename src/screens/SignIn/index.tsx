import { Input } from '@components/Input';
import { Button } from '@components/Button';
import React, { useEffect } from 'react';
import brandImage from '@assets/brand.png';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '@hooks/auth';
 
import { Container, Content, Title, Brand, ForgotPassword,ForgotPasswordLabel } from './styles';

export function SignIn() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

    const { signIn,forgotPassword, isLogging } = useAuth();

    function handleSignIn() {
      forgotPassword(email);
    };

 
  return (
    <Container style={{backgroundColor: 'red'}}>
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
        <Content>
          <Brand source={brandImage} />
          <Title>
            Login
          </Title>
        <Input
          placeholder="Email"
          type='secondary'
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
         <Input
          placeholder="Senha"
          type='secondary'
          secureTextEntry
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />
        <ForgotPassword >
         <ForgotPasswordLabel>
         Esqueceu sua senha?
           </ForgotPasswordLabel> 
        </ForgotPassword>

        <Button
          title='Entrar'
          type='secondary'
          onPress={handleSignIn}
          isLoading={isLogging}
        />

      
        </Content>
 </KeyboardAvoidingView>
    </Container>
  )
}