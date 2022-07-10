import { fireEvent, render } from "@testing-library/react";

import TaskCard from "./index";

describe("Card component ", () => {
  const mockCardData = {
    id: "uuid-asdf-asdf",
    title: "Title",
    description: "Desc",
    list: "ToDo",
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
    const { getByTestId } = render(<TaskCard cardData={mockCardData} />);
    const titleContainer: any = getByTestId("test-title");
    const titleInput: any = titleContainer.firstChild?.firstChild;

    const descriptionContainer: any = getByTestId("test-description");
    const descriptionInput: any = descriptionContainer.firstChild?.firstChild;

    const editButton = getByTestId("test-edit-button");
    fireEvent.click(editButton);

    expect(titleInput.disabled).toBe(false);
    expect(descriptionInput.disabled).toBe(false);
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
});
