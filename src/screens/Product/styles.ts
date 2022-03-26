import styled from "styled-components/native";
import { Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
 import { Button } from "@components/Button";
export const Container = styled.KeyboardAvoidingView.attrs({
    behavior:   Platform.OS === "ios" ? "padding" : undefined,
    })`
    flex: 1;
   background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(({theme}) => ({
    colors: theme.COLORS.GRADIENT,
   

}))`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: ${getStatusBarHeight() +33}px 20px 24px;
`;

export const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: ${({theme}) => theme.COLORS.TITLE};
    font-family: ${({theme}) => theme.FONTS.TITLE};
`;

export const DeleteLabel = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${({theme}) => theme.COLORS.TITLE};
    font-family: ${({theme}) => theme.FONTS.TITLE};
`;

export const Upload = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 32px 0;
`
export const PickImageButton = styled(Button)`
    max-width: 90px;
    margin-left: 32px;
`

export const Form = styled.View`
    width: 100%;
    padding: 24px;
    `;

export const Label = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${({theme}) => theme.COLORS.SECONDARY_900};
    font-family: ${({theme}) => theme.FONTS.TEXT};
    margin-bottom: 12px;
`;

export const InputGroup = styled.View`
    width: 100%;
    margin-bottom: 16px;
`;

export const InputGroupHeader = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    `;

export const MaxCharacteres = styled.Text`
    font-size: 14px;
    margin-bottom: 12px;
    color: ${({theme}) => theme.COLORS.SECONDARY_900};
    font-family: ${({theme}) => theme.FONTS.TEXT};
`;
 