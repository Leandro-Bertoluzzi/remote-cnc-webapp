import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import MainMenu from "@/app/(authenticated)/page";
import useAuth from "@/hooks/useauth";

// Mock authentication
jest.mock("@/hooks/useauth");
const mockedAuth = jest.mocked(useAuth);

describe("MainMenu", () => {
    beforeEach(() => {
        mockedAuth.mockReturnValue(true);
    });

    afterEach(() => {
        cleanup();
    });

    it("renders the menu after successful login", () => {
        // Instantiate widget under test
        render(<MainMenu />);

        // Assert components in widget
        const options = [
            "Ver estado de tareas",
            "Administrar archivos",
            "Control manual y monitoreo",
            "Administrar usuarios",
            "Administrar inventario",
        ];

        options.forEach((option) => {
            const optionWidget = screen.getByText(option);
            expect(optionWidget).toBeInTheDocument();
        });
    });

    it("renders the load screen before authenticating", async () => {
        // Mock authentication hook
        mockedAuth.mockReturnValue(false);

        // Instantiate widget under test
        render(<MainMenu />);

        // Assert components in widget
        const loader = screen.queryByTestId("loader");
        expect(loader).toBeInTheDocument();
    });
});
