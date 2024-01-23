import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EmptyCard from "@/components/cards/emptyCard";

describe("EmptyCard", () => {
    it("renders the empty card", async () => {
        // Instantiate widget under test
        render(<EmptyCard itemName="archivos guardados" />);

        // Assert components in widget
        const text = screen.getByText("No hay archivos guardados");
        expect(text).toBeInTheDocument();
    });
});
