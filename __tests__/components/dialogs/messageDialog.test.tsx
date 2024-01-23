import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import MessageDialog from "@/components/dialogs/messageDialog";

describe("MessageDialog", () => {
    it("renders the dialog", async () => {
        // Instantiate widget under test
        render(
            <MessageDialog onClose={jest.fn()} type="info" title="Testing" text="This is a test" />
        );

        // Assert components in widget
        const title = screen.getByText("Testing");
        expect(title).toBeInTheDocument();
        const content = screen.getByText("This is a test");
        expect(content).toBeInTheDocument();
        const button = screen.getByText("Entendido");
        expect(button).toBeInTheDocument();
    });

    it("closes the dialog", async () => {
        // Instantiate widget under test
        const mockOnClose = jest.fn();
        render(
            <MessageDialog
                onClose={mockOnClose}
                type="info"
                title="Testing"
                text="This is a test"
            />
        );

        // Action to close the dialog
        const button = screen.getByText("Entendido");
        fireEvent.click(button);

        // Assert close action was called
        expect(mockOnClose).toHaveBeenCalled();
    });
});
