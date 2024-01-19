import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import MainMenu from "../../src/pages/index";
import apiRequest from "../../src/services/apiService";
import { getJwtToken } from "../../src/services/storage";
import mockRouter from "next-router-mock";

// Mock Next.js router
jest.mock("next/router", () => require("next-router-mock"));

// Mock apiRequest import
jest.mock("../../src/services/apiService");
const mockedApiRequest = apiRequest as jest.MockedFunction<typeof apiRequest>;

// Mock getJwtToken import
jest.mock("../../src/services/storage");
const mockedGetJwtToken = getJwtToken as jest.MockedFunction<typeof getJwtToken>;

describe("MainMenu", () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl("/");
    });

    afterEach(() => {
        cleanup();
    });

    it("renders the menu after successful login", () => {
        // Mock implementations of functions
        mockedApiRequest.mockImplementation(
            (url, method) =>
                new Promise((resolve, reject) => resolve("Mocked response from the API"))
        );
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<MainMenu />);

        // Assert components in widget
        const options = [
            "Ver estado de tareas",
            "Monitorizar equipo",
            "Administrar archivos",
            "Control manual y calibración",
            "Administrar solicitudes",
            "Administrar usuarios",
            "Administrar inventario",
        ];

        options.forEach((option) => {
            const optionWidget = screen.getByText(option);
            expect(optionWidget).toBeInTheDocument();
        });

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalled();

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/",
            pathname: "/",
            query: {},
        });
    });

    it("redirects to login because of no token", () => {
        // Mock implementations of functions
        mockedGetJwtToken.mockImplementation(() => "");

        // Instantiate widget under test
        render(<MainMenu />);

        // Assert calls to API
        expect(apiRequest).not.toHaveBeenCalled();

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/login?callbackUrl=",
            pathname: "/login",
            query: { callbackUrl: "" },
        });
    });

    it("redirects to login because of auth fails", async () => {
        // Mock implementations of functions
        mockedApiRequest.mockRejectedValue(new Error("Token inválido, vuelva a loguearse"));
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<MainMenu />);

        // Assert calls to API
        await expect(apiRequest).rejects.toEqual(Error("Token inválido, vuelva a loguearse"));

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/login?callbackUrl=",
            pathname: "/login",
            query: { callbackUrl: "" },
        });
    });
});
