import { Button, Card, CardActions, CardContent } from '@mui/material';
import React, { useRef } from 'react';
import { CardsContext } from '../../providers/cards';
import { Container, Title, TitleInput, DescriptionInput } from './styles';

const NewCard = () => {
    const  { addNewCard }  = React.useContext(CardsContext);
    const title = useRef<HTMLInputElement>(null)
    const description = useRef<HTMLInputElement>(null)

    const sendNewCardRequest = () => {
        addNewCard({
            titulo: String(title.current?.value),
            conteudo: String(description.current?.value),
            lista: 'ToDo'
        })
        if(title.current) {
            title.current.value = ''
        }
        if(description.current) {
            description.current.value = ''
        }
    }

    return (
        <Container>
            <Card variant="outlined" sx={{ maxWidth: 300 }}>
                <CardContent>
                    <TitleInput fullWidth margin='normal' label="Titulo" variant="standard" inputRef={title} />
                    <DescriptionInput fullWidth margin='normal' label='Descrição' variant='filled' multiline inputRef={description} />
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={sendNewCardRequest}>Salvar</Button>
                </CardActions>
            </Card>
        </Container>
    )
}

export default NewCard;