import React, { ReactNode, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

import api from "../services/api";
import { AuthContext } from "./auth";

interface ICardsContextProps {
  children: ReactNode;
}

interface ICard {
  id: string;
  titulo: string;
  conteudo: string;
  lista: string;
}

interface ICardsContext {
  cards: ICard[];
  getAllCards: () => void;
  addNewCard: (data: Omit<ICard, "id">) => void;
  updateCard: (data: ICard) => void;
  removeCard: (id: string) => void;
}

export const CardsContext = React.createContext<ICardsContext>(
  [] as unknown as ICardsContext
);

export const CardsProvider = ({ children }: ICardsContextProps) => {
  const [cards, setCards] = useState<ICard[]>([]);
  const { user, setUser } = React.useContext(AuthContext);

  const getAllCards = useCallback(() => {
    if (!user.logged) return;
    api
      .get("/cards")
      .then((responseCards) => {
        setCards(responseCards.data);
      })
      .catch(() => {
        toast.error("Sua sessão expirou! Faça o login para continuar");
        setUser({ logged: false, token: "" });
      });
  }, [user.logged, setUser]);

  const addNewCard = useCallback(
    (data: Omit<ICard, "id">) => {
      if (!user.logged) return;
      api
        .post("/cards", data)
        .then((response) => {
          if (!response) {
            toast.error("Houve algum erro ao adicionar o card!");
            return;
          }
          toast.success("Card adicionado!");
        })
        .catch(() => {
          toast.error("Houve algum erro ao adicionar o card!");
        });
      getAllCards();
    },
    [user.logged, getAllCards]
  );

  const updateCard = useCallback(
    (data: ICard) => {
      if (!user.logged) return;
      api
        .put(`/cards/${data.id}`, {
          id: data.id,
          titulo: data.titulo,
          conteudo: data.conteudo,
          lista: data.lista,
        })
        .catch(() => {
          toast.error("Houve algum erro ao atualizar o card!");
        });
      getAllCards();
    },
    [user.logged, getAllCards]
  );

  const removeCard = useCallback(
    (id: string) => {
      if (!user.logged) return;
      api
        .delete(`/cards/${id}`)
        .then((response) => {
          if (!response) {
            toast.error("Houve algum erro na deleção!");
            return;
          }
          toast.success("Card removido!");
        })
        .catch(() => {
          toast.error("Houve algum erro na deleção!");
        });
      getAllCards();
    },
    [user.logged, getAllCards]
  );

  useEffect(() => {
    getAllCards();
  }, [getAllCards]);

  return (
    <CardsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ cards, getAllCards, addNewCard, updateCard, removeCard }}
    >
      {children}
    </CardsContext.Provider>
  );
};
