import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmDialog from "@/components/dialogs/confirmDialog";

describe("ConfirmDialog", () => {
    it("renders the dialog", async () => {
        // Instantiate widget under test
        render(
            <ConfirmDialog
                onAccept={jest.fn()}
                onCancel={jest.fn()}
                title="Testing"
                text="This is a test"
                confirmText="Accept"
            />
        );

        // Assert components in widget
        const title = screen.getByText("Testing");
        expect(title).toBeInTheDocument();
        const content = screen.getByText("This is a test");
        expect(content).toBeInTheDocument();
        const acceptBtn = screen.getByText("Accept");
        expect(acceptBtn).toBeInTheDocument();
        const cancelBtn = screen.getByText("Cancelar");
        expect(cancelBtn).toBeInTheDocument();
    });

    it("cancels the action", async () => {
        // Instantiate widget under test
        const mockOnCancel = jest.fn();
        const mockOnAccept = jest.fn();
        render(
            <ConfirmDialog
                onAccept={mockOnAccept}
                onCancel={mockOnCancel}
                title="Testing"
                text="This is a test"
                confirmText="Accept"
            />
        );

        // Action to close the dialog
        const button = screen.getByText("Cancelar");
        fireEvent.click(button);

        // Assert close action was called
        expect(mockOnCancel).toHaveBeenCalled();
        expect(mockOnAccept).not.toHaveBeenCalled();
    });

    it("accepts the action", async () => {
        // Instantiate widget under test
        const mockOnCancel = jest.fn();
        const mockOnAccept = jest.fn();
        render(
            <ConfirmDialog
                onAccept={mockOnAccept}
                onCancel={mockOnCancel}
                title="Testing"
                text="This is a test"
                confirmText="Accept"
            />
        );

        // Action to close the dialog
        const button = screen.getByText("Accept");
        fireEvent.click(button);

        // Assert close action was called
        expect(mockOnAccept).toHaveBeenCalled();
        expect(mockOnCancel).not.toHaveBeenCalled();
    });
});
