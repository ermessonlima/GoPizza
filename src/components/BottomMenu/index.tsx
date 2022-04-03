import React from 'react'

import { Container,Notification,Quantity,Title } from './styles'


type Props = {
    title: string;
    color: string;
    notifications?: string | undefined;
}

export default function BottomMenu({ title, color, notifications, ...rest }: Props) {
    const noNotifications = notifications === '0';

    return (
        <Container {...rest}>

            <Title color={color}>{title}</Title>
        
            {notifications && (
            <Notification noNotifications={noNotifications}>
                <Quantity noNotifications={noNotifications}>{notifications}</Quantity>
            </Notification>
            )}
        </Container>

    )
    }
    