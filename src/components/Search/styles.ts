import styled, { css } from "styled-components/native";
 
export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-top: -30px;
    padding: 0 24px;
  
`;
 
export const InputArea = styled.View`
    flex:1;
    flex-direction: row;
    align-items: center;
    border-radius: 16px;

    ${({ theme }) => css`
        background-color: ${theme.COLORS.BACKGROUND};
        border: 1px solid ${theme.COLORS.SHAPE}; ;
    `}
`;

export const Input = styled.TextInput`
    flex: 1;
    height: 52px;
    font-family: ${({ theme }) => theme.FONTS.TEXT};
    padding-left: 12px;
     
`;

export const ButtonClear = styled.TouchableOpacity`
    margin-right: 7px ;
`;

export const Button = styled.TouchableOpacity`
    width: 52px;
    height: 52px;
    border-radius: 18px;
    background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
    justify-content: center;
    align-items: center;
    margin-left: 7px;
`;

