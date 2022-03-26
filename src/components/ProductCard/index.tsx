import React from "react";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { Container,Details,Image,Name,Content,Description, Line,Identification } from "./styles";

export type ProductProps = {
    name: string;
    description: string;
    id: string;
    photo_url: string;
}

type Props = TouchableOpacityProps & {
    data: ProductProps;
}

export function ProductCard({data, ...rest}: Props) {

    const { COLORS } = useTheme();

    return (
        <Container  >
            <Content {...rest}>
                <Image source={{ uri:data?.photo_url }} />
                <Details>
                <Identification>
                    <Name>{data?.name}</Name>
                    <Feather name="chevron-right" size={18} color={COLORS.SHAPE} />
                  
                    </Identification>

                    <Description>{data?.description}</Description>

                </Details>
            </Content>  

            <Line/>  

    
        </Container>
    );
};
