import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import { AuthContext } from './auth';

interface ICardsContextProps {
    children: ReactNode
}

interface ICard {
    id: String;
    titulo: String;
    conteudo: String;
    lista: String
}

interface ICardsContext {
    cards: ICard[],
    getAllCards: () => void,
    addNewCard: (data: Omit<ICard, 'id'>) => void
    updateCard: (data: ICard) => void
    removeCard: (id: String) => void
}

export const CardsContext = React.createContext<ICardsContext>([] as unknown as ICardsContext);

export const CardsProvider = ({ children }: ICardsContextProps) => {
    const [cards, setCards] = useState<ICard[]>([])
    const { user, setUser } = React.useContext(AuthContext);

    const getAllCards = useCallback(() => {
        if(!user.logged) return;
        api.get('/cards').then(responseCards => {
            setCards(responseCards.data)
        }).catch(() => {
            alert('Sua sessão expirou! Faça o login para continuar')
            setUser({ logged: false, token: '' })
        })
    }, [user.logged, setUser])

    const addNewCard = useCallback((data: Omit<ICard, 'id'>) => {
        if(!user.logged) return;
        api.post('/cards', data).then(responseCards => {
            console.log('card adicionado')
        }).catch(() => {
            alert('Houve algum erro')
        })
        getAllCards()
    }, [user.logged, getAllCards])

    const updateCard = useCallback((data: ICard) => {
        if(!user.logged) return;
        api.put(`/cards/${data.id}`, {
            id: data.id,
            titulo: data.titulo,
            conteudo: data.conteudo,
            lista: data.lista
        }).then(responseCards => {
            console.log('card atualizado')
        }).catch(() => {
            console.log('Houve algum erro')
        })
        getAllCards()
    }, [user.logged, getAllCards])

    const removeCard = useCallback((id: String) => {
        if(!user.logged) return;
        api.delete(`/cards/${id}`).then(responseCards => {
            console.log('card removido')
        }).catch(() => {
            console.log('houve algum erro na deleção')
        })
        getAllCards()
    }, [user.logged, getAllCards])

    useEffect(() => {
        getAllCards()
    }, [getAllCards])

    return (
        <CardsContext.Provider value={{ cards, getAllCards, addNewCard, updateCard, removeCard }}>
            { children }
        </CardsContext.Provider>
    )
}