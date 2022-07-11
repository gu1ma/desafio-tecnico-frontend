import {
  Delete,
  ArrowBack,
  ArrowForward,
  Edit,
  Cancel,
  Save,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Modal,
} from "@mui/material";
import { useContext, useState } from "react";

import { CardsContext } from "../../providers/cards";
import { Container, ContentContainerModal } from "./styles";

interface ICardData {
  id: string;
  title: string;
  description: string;
  list: string;
}

interface ICardDataProp {
  cardData: ICardData;
}

const TaskCard = ({ cardData }: ICardDataProp) => {
  const { removeCard, updateCard } = useContext(CardsContext);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(cardData.title);
  const [description, setDescription] = useState(cardData.description);

  const formatListType = (listType: string) => {
    if (listType === "Doing") {
      return "ToDo";
    }

    if (listType === "Done") {
      return "Doing";
    }
    return "";
  };

  const reverseFormatListType = (listType: string) => {
    if (listType === "Doing") {
      return "Done";
    }

    if (listType === "ToDo") {
      return "Doing";
    }
    return "";
  };

  return (
    <>
      <Container>
        <Card variant="outlined" sx={{ maxWidth: 300 }}>
          <CardContent>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                fullWidth
                margin="normal"
                label=""
                variant="standard"
                disabled={!editMode}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                data-testid="test-title"
              />
              <Button
                size="medium"
                endIcon={
                  !editMode ? (
                    <Edit sx={{ color: "black" }} />
                  ) : (
                    <Cancel sx={{ color: "black" }} />
                  )
                }
                onClick={() => setEditMode(!editMode)}
                data-testid="test-edit-button"
              />
            </div>
            <TextField
              fullWidth
              margin="normal"
              label=""
              variant="standard"
              disabled={!editMode}
              multiline
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              data-testid="test-description"
            />
          </CardContent>
          <CardActions
            style={{
              display: "flex",
              justifyContent: editMode ? "center" : "space-between",
            }}
          >
            {!editMode ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() =>
                    updateCard({
                      id: cardData.id,
                      titulo: cardData.title,
                      conteudo: cardData.description,
                      lista: formatListType(cardData.list),
                    })
                  }
                  disabled={cardData.list === "ToDo"}
                  data-testid="test-left-arrow"
                >
                  <ArrowBack />
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setIsModalOpen(true)}
                  data-testid="test-delete-button"
                >
                  <Delete />
                </Button>
                <Button
                  variant="outlined"
                  onClick={() =>
                    updateCard({
                      id: cardData.id,
                      titulo: cardData.title,
                      conteudo: cardData.description,
                      lista: reverseFormatListType(cardData.list),
                    })
                  }
                  disabled={cardData.list === "Done"}
                  data-testid="test-right-arrow"
                >
                  <ArrowForward />
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  updateCard({
                    id: cardData.id,
                    titulo: title,
                    conteudo: description,
                    lista: cardData.list,
                  });
                  setEditMode(false);
                }}
                data-testid="test-update-button"
              >
                <Save />
              </Button>
            )}
          </CardActions>
        </Card>
      </Container>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ContentContainerModal>
          <h2 id="parent-modal-title">
            Tem certeza que deseja deletar esse card?
          </h2>
          <p id="parent-modal-description">
            <Button
              variant="outlined"
              sx={{ marginRight: 1 }}
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                removeCard(cardData.id);
                setIsModalOpen(false);
              }}
              data-testid="test-modal-delete-button"
            >
              Confirmar
            </Button>
          </p>
        </ContentContainerModal>
      </Modal>
    </>
  );
};

export default TaskCard;
