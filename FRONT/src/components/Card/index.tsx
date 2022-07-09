import { useContext, useState } from 'react';
import { CardsContext } from '../../providers/cards';
import { Button, Card, CardActions, CardContent, TextField } from '@mui/material';
import { Container } from './styles';
import { Delete, ArrowBack, ArrowForward, Edit, Cancel, Save } from '@mui/icons-material';

interface CardData {
    id: String,
    title: String,
    description: String,
    list: String
}

interface CardDataProp {
    cardData: CardData
}

const TaskCard = ({ cardData } : CardDataProp) => {
    const { removeCard, updateCard } = useContext(CardsContext)
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(cardData.title)
    const [description, setDescription] = useState(cardData.description)

    return (
        <Container>
            <Card variant="outlined" sx={{ maxWidth: 300 }}>
                <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField 
                            fullWidth 
                            margin='normal' 
                            label="" 
                            variant="standard" 
                            disabled={!editMode} 
                            value={title} 
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <Button 
                            size='medium' 
                            endIcon={
                                !editMode ? 
                                <Edit sx={{ color: 'black' }} /> : 
                                <Cancel sx={{ color: 'black' }} /> 
                            } 
                            onClick={() => setEditMode(!editMode)}
                        />
                    </div>
                    <TextField 
                        fullWidth margin='normal' 
                        label="" 
                        variant="standard" 
                        disabled={!editMode} 
                        multiline 
                        value={description} 
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: editMode ? 'center' : 'space-between' }}>
                    {
                        !editMode ? (
                            <>
                                <Button 
                                    variant="outlined"
                                    onClick={() => updateCard(
                                        {
                                            id: cardData.id,
                                            titulo: cardData.title,
                                            conteudo: cardData.description,
                                            lista: cardData.list === 'Doing' ? 'ToDo' : cardData.list === 'Done' ? 'Doing' : '' 
                                        }
                                    )}
                                    disabled={cardData.list === 'ToDo'}
                                    >
                                        <ArrowBack />
                                    </Button>
                                    <Button 
                                        variant="contained"
                                        onClick={() => removeCard(cardData.id)}
                                    >
                                        <Delete />
                                    </Button>
                                    <Button 
                                        variant="outlined"
                                        onClick={() => updateCard(
                                            {
                                                id: cardData.id,
                                                titulo: cardData.title,
                                                conteudo: cardData.description,
                                                lista: cardData.list === 'Doing' ? 'Done' : cardData.list === 'ToDo' ? 'Doing' : '' 
                                            }
                                        )}
                                        disabled={cardData.list === 'Done'}
                                        >
                                        <ArrowForward />
                                    </Button>
                                </>
                        ) : (
                            <Button 
                                variant="contained"
                                onClick={() => {
                                    updateCard(
                                        {
                                            id: cardData.id,
                                            titulo: title,
                                            conteudo: description,
                                            lista: cardData.list 
                                        }
                                    )
                                    setEditMode(false)
                                }}
                            >
                                <Save />
                            </Button>
                        )
                    }
                </CardActions>
            </Card>
        </Container>
    )
}

export default TaskCard;