import { fireEvent, render } from "@testing-library/react";

import { CardsContext } from "../../providers/cards";
import TaskCard from "./index";

describe("Card component ", () => {
  const mockCardData = {
    id: "uuid-asdf-asdf",
    title: "Title",
    description: "Desc",
    list: "Doing",
  };
  const renderCardWithMockProvider = (
    updateCard = jest.fn(),
    removeCard = jest.fn(),
    listType = "Doing"
  ) => {
    const getAllCards = jest.fn();
    const addNewCard = jest.fn();
    const cards = [
      {
        ...mockCardData,
        titulo: mockCardData.title,
        conteudo: mockCardData.description,
        lista: listType,
      },
    ];
    return render(
      <CardsContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          removeCard,
          getAllCards,
          addNewCard,
          updateCard,
          cards,
        }}
      >
        <TaskCard cardData={{ ...mockCardData, list: listType }} />
      </CardsContext.Provider>
    );
  };

  it("should render card correctly", () => {
    const { getByTestId } = render(<TaskCard cardData={mockCardData} />);
    const titleContainer: any = getByTestId("test-title");
    const titleInput: any = titleContainer.firstChild?.firstChild;

    const descriptionContainer: any = getByTestId("test-description");
    const descriptionInput: any = descriptionContainer.firstChild?.firstChild;

    expect(titleInput.value).toBe(mockCardData.title);
    expect(titleInput.disabled).toBe(true);
    expect(descriptionInput.value).toBe(mockCardData.description);
    expect(descriptionInput.disabled).toBe(true);
  });

  it("should enable/disable edit mode", () => {
    const { getByTestId } = render(<TaskCard cardData={{ ...mockCardData }} />);
    const titleContainer: any = getByTestId("test-title");
    const titleInput: any = titleContainer.firstChild?.firstChild;

    const descriptionContainer: any = getByTestId("test-description");
    const descriptionInput: any = descriptionContainer.firstChild?.firstChild;

    const editButton = getByTestId("test-edit-button");
    fireEvent.click(editButton);

    expect(titleInput.disabled).toBe(false);
    expect(descriptionInput.disabled).toBe(false);

    fireEvent.click(editButton);

    expect(titleInput.disabled).toBe(true);
    expect(descriptionInput.disabled).toBe(true);
  });

  it("should test input change", () => {
    const { getByTestId } = render(<TaskCard cardData={mockCardData} />);
    const titleContainer: any = getByTestId("test-title");
    const titleInput: any = titleContainer.firstChild?.firstChild;

    const descriptionContainer: any = getByTestId("test-description");
    const descriptionInput: any = descriptionContainer.firstChild?.firstChild;

    fireEvent.change(titleInput, { target: { value: "New title" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New description" },
    });

    expect(titleInput.value).toBe("New title");
    expect(descriptionInput.value).toBe("New description");
  });

  it("should render modal when click on delete button", () => {
    const { getByTestId, getByText } = render(
      <TaskCard cardData={mockCardData} />
    );
    const deleteButton = getByTestId("test-delete-button");

    fireEvent.click(deleteButton);

    expect(
      getByText("Tem certeza que deseja deletar esse card?")
    ).toBeInTheDocument();
    expect(getByText("Cancelar")).toBeInTheDocument();
    expect(getByText("Confirmar")).toBeInTheDocument();
  });

  it("should call removeCard after modal showed and confirm button clicked", () => {
    const removeCard = jest.fn();
    const updateCard = jest.fn();
    const { getByTestId } = renderCardWithMockProvider(updateCard, removeCard);
    const deleteButton = getByTestId("test-delete-button");
    fireEvent.click(deleteButton);

    const modalDeleteButton = getByTestId("test-modal-delete-button");
    fireEvent.click(modalDeleteButton);

    expect(removeCard).toHaveBeenCalled();
  });

  it("should call updateCard function when user click on right arrow button with 'Doing' listType", () => {
    const removeCard = jest.fn();
    const updateCard = jest.fn();
    const { getByTestId } = renderCardWithMockProvider(
      updateCard,
      removeCard,
      "Doing"
    );

    const rightButton = getByTestId("test-right-arrow");
    fireEvent.click(rightButton);

    expect(updateCard).toHaveBeenCalled();
  });

  it("should call updateCard function when user click on right arrow button with 'ToDo' listType", () => {
    const removeCard = jest.fn();
    const updateCard = jest.fn();
    const { getByTestId } = renderCardWithMockProvider(
      updateCard,
      removeCard,
      "ToDo"
    );

    const rightButton = getByTestId("test-right-arrow");
    fireEvent.click(rightButton);

    expect(updateCard).toHaveBeenCalled();
  });

  it("should call updateCard function when user click on left arrow button 'Done' listType", () => {
    const removeCard = jest.fn();
    const updateCard = jest.fn();
    const { getByTestId } = renderCardWithMockProvider(
      updateCard,
      removeCard,
      "Done"
    );

    const leftButton = getByTestId("test-left-arrow");
    fireEvent.click(leftButton);

    expect(updateCard).toHaveBeenCalled();
  });

  it("should call updateCard function when user click on left arrow button with 'Doing' listType", () => {
    const removeCard = jest.fn();
    const updateCard = jest.fn();
    const { getByTestId } = renderCardWithMockProvider(
      updateCard,
      removeCard,
      "Doing"
    );

    const leftButton = getByTestId("test-left-arrow");
    fireEvent.click(leftButton);

    expect(updateCard).toHaveBeenCalled();
  });

  it("should call updateCard function when user edit the card", () => {
    const removeCard = jest.fn();
    const updateCard = jest.fn();
    const { getByTestId } = renderCardWithMockProvider(
      updateCard,
      removeCard,
      "ToDo"
    );

    const editButton = getByTestId("test-edit-button");
    fireEvent.click(editButton);

    const updateButton = getByTestId("test-update-button");
    fireEvent.click(updateButton);

    expect(updateCard).toHaveBeenCalled();
  });
});
