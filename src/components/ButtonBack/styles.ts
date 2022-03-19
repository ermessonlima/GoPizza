import styled  from "styled-components/native";

export const Container = styled.TouchableOpacity`
        width : 40px ;
        height : 40px ;
        border-radius : 12px ;
        justify-content : center ;
        align-items : center ;
        background-color : ${({ theme }) => theme.COLORS.PRIMARY_100} ;
`;
