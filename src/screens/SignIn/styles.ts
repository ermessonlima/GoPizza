import styled from "styled-components/native";
import { LinearGradient } from 'expo-linear-gradient';
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled(LinearGradient).attrs(
    ({theme}) => ({
        colors: theme.COLORS.GRADIENT,
        start: { x: 0, y: 1 },
        end: { x: 0.5, y: 0.5 },
    })
    
    )`
    flex: 1;
    justify-content: center;
 
`;

export const Content = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace() + 48,
    },
})`
    width: 100% ;
    padding: 0 32px;
}`

export const Title = styled.Text`
    font-size: 32px;
    font-weight: bold;
    color: ${({theme}) => theme.COLORS.TITLE};
    font-family: ${({theme}) => theme.FONTS.TITLE};
    margin-bottom: 24px;
    align-self: flex-start;
`;

export const Brand = styled.Image.attrs({
    resizeMode: 'contain',
})`
    height: 340px;
    margin-top: 64px;
    margin-bottom: 32px;
`;	

export const ForgotPassword = styled.TouchableOpacity`
    margin-bottom:  20px;
    align-self: flex-end;
`;

export const ForgotPasswordLabel = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${({theme}) => theme.COLORS.PRIMARY_50};
    font-family: ${({theme}) => theme.FONTS.TEXT};
`;
