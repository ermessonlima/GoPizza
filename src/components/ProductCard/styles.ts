import styled, { css } from "styled-components/native";
 
export const Container = styled.View`
    width: 100%;
`;

export const Content = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
 
`;

export const Image = styled.Image`
    width: 104px;
    height: 104px;
    border-radius: 52px;
    margin-right: 20px;
`;

export const Details = styled.View`
    flex: 1;
`;

export const Identification = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Name = styled.Text`
    flex:1 ;
    font-size: 20px;
    font-family: ${({ theme }) => theme.FONTS.TITLE};
    color: ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const Description = styled.Text`
 
    font-size: 12px;
    line-height: 20px;
    margin-right: 21px;

    font-family: ${({ theme }) => theme.FONTS.TITLE};
    color: ${({ theme }) => theme.COLORS.SECONDARY_400};
`;

export const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.COLORS.SHAPE};
    margin-top: 12px;
    margin-bottom: 12px;
    margin-left: 124px;
`;