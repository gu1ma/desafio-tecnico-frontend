import { Button, Card, CardActions, CardContent } from "@mui/material";
import React, { useState, useRef } from "react";

import { CardsContext } from "../../providers/cards";
import { Container, TitleInput, DescriptionInput } from "./styles";

const NewCard = () => {
  const { addNewCard } = React.useContext(CardsContext);
  const titleInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const sendNewCardRequest = () => {
    addNewCard({
      titulo: title,
      conteudo: description,
      lista: "ToDo",
    });
    setTitle("");
    setDescription("");
    if (titleInput.current) titleInput.current.value = "";
    if (descriptionInput.current) descriptionInput.current.value = "";
  };

  return (
    <Container>
      <Card variant="outlined" sx={{ maxWidth: 300 }}>
        <CardContent>
          <TitleInput
            fullWidth
            margin="normal"
            label="Titulo"
            variant="standard"
            inputRef={titleInput}
            onChange={(event) => setTitle(event.target.value)}
          />
          <DescriptionInput
            fullWidth
            margin="normal"
            label="Descrição"
            variant="filled"
            multiline
            inputRef={descriptionInput}
            onChange={(event) => setDescription(event.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={sendNewCardRequest}
            disabled={title === "" || description === ""}
          >
            Salvar
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default NewCard;
