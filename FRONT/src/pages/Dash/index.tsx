import React from 'react';
import Card from '../../components/Card';
import NewCard from '../../components/NewCard';
import { CardsContext } from '../../providers/cards';
import { Container, CardContainer, CardsContainer } from './styles';
import { Typography } from '@mui/material'

const Dash: React.FC = () => {
    const  { cards }  = React.useContext(CardsContext);

    return (
        <Container>
            <CardsContainer>
                <CardContainer>
                    <Typography variant="h4" padding={2}>Novo cartão</Typography>
                    <NewCard />
                </CardContainer>
                <CardContainer>
                    <Typography variant="h4" padding={2}>ToDo</Typography>
                    {
                        cards.filter(card => card.lista === 'ToDo').map(card => (
                            <Card key={String(card.id)} cardData={{ id: card.id, title: card.titulo, description: card.conteudo, list: card.lista }} />
                        ))
                    }
                </CardContainer>
                <CardContainer>
                <Typography variant="h4" padding={2}>Doing</Typography>
                    {
                        cards.filter(card => card.lista === 'Doing').map(card => (
                            <Card key={String(card.id)} cardData={{ id: card.id, title: card.titulo, description: card.conteudo, list: card.lista }} />
                        ))
                    }
                </CardContainer>
                <CardContainer>
                <Typography variant="h4" padding={2}>Done</Typography>
                    {
                        cards.filter(card => card.lista === 'Done').map(card => (
                            <Card key={String(card.id)} cardData={{ id: card.id, title: card.titulo, description: card.conteudo, list: card.lista }} />
                        ))
                    }
                </CardContainer>
            </CardsContainer>
        </Container>
    )
}

export default Dash;