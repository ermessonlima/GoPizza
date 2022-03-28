import styled from "styled-components/native";
import { Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.KeyboardAvoidingView.attrs({
    behavior: Platform.OS === "ios" ? "padding" : undefined,
})`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;


export const Header = styled(LinearGradient).attrs(({ theme }) => ({
    colors: theme.COLORS.GRADIENT,
}))`
    padding: ${getStatusBarHeight() + 33}px 24px 33px;
    
    `;

 

 

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.FONTS.TITLE};
    font-size: 24px;
    color: ${({ theme }) => theme.COLORS.TITLE};
  
    text-align: center;
`;