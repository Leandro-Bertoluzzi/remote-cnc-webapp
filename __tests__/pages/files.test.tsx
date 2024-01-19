import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import FilesView from "@/pages/files";
import apiRequest from "../../src/services/apiService";
import { getJwtToken } from "../../src/services/storage";
import mockRouter from "next-router-mock";
import FileInfo from "../../src/types/FileInfo";

// Mock Next.js router
jest.mock("next/router", () => require("next-router-mock"));

// Mock apiRequest import
jest.mock("../../src/services/apiService");
const mockedApiRequest = apiRequest as jest.MockedFunction<typeof apiRequest>;

// Mock getJwtToken import
jest.mock("../../src/services/storage");
const mockedGetJwtToken = getJwtToken as jest.MockedFunction<typeof getJwtToken>;

// Mock response from API
const files: FileInfo[] = [
    {
        id: 1,
        name: "archivo1.gcode",
        created_at: "Mon, 15 May of 2023",
    },
    {
        id: 2,
        name: "archivo2.gcode",
        created_at: "Mon, 15 May of 2023",
    },
    {
        id: 3,
        name: "archivo1-20230502-190205.gcode",
        created_at: "Mon, 15 May of 2023",
    },
    {
        id: 4,
        name: "example.txt",
        created_at: "Mon, 15 May of 2023",
    },
];

describe("FilesView", () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl("/");
    });

    afterEach(() => {
        cleanup();
    });

    it("renders the view after successful login", async () => {
        // Mock implementations of functions
        mockedApiRequest
            .mockImplementationOnce(
                (url, method) =>
                    new Promise((resolve, reject) => resolve("Mocked response from the API"))
            )
            .mockImplementationOnce(
                (url, method) => new Promise((resolve, reject) => resolve(files))
            );
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<FilesView />);

        // Assert components in widget
        const fileCards = await screen.findAllByTestId("item-card");
        expect(fileCards).toHaveLength(4);
        const notification = screen.queryByTestId("message-dialog");
        expect(notification).not.toBeInTheDocument();
        const form = screen.queryByTestId("item-form");
        expect(form).not.toBeInTheDocument();
        const button = screen.getByText("Subir archivo");
        expect(button).toBeInTheDocument();

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalledTimes(2);

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
        render(<FilesView />);

        // Assert calls to API
        expect(apiRequest).not.toHaveBeenCalled();

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/login?callbackUrl=files",
            pathname: "/login",
            query: { callbackUrl: "files" },
        });
    });

    it("redirects to login because of auth fails", async () => {
        // Mock implementations of functions
        mockedApiRequest.mockRejectedValue(new Error("Token inválido, vuelva a loguearse"));
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<FilesView />);

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalledTimes(1);
        await expect(apiRequest).rejects.toEqual(Error("Token inválido, vuelva a loguearse"));

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/login?callbackUrl=files",
            pathname: "/login",
            query: { callbackUrl: "files" },
        });
    });

    it("renders the view with no files", async () => {
        // Mock implementations of functions
        mockedApiRequest
            .mockImplementationOnce(
                (url, method) =>
                    new Promise((resolve, reject) => resolve("Mocked response from the API"))
            )
            .mockImplementationOnce((url, method) => new Promise((resolve, reject) => resolve([])));
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<FilesView />);

        // Assert components in widget
        const fileCards = screen.queryAllByTestId("item-card");
        expect(fileCards).toHaveLength(0);
        const notification = screen.queryByTestId("message-dialog");
        expect(notification).not.toBeInTheDocument();
        const form = screen.queryByTestId("item-form");
        expect(form).not.toBeInTheDocument();
        const emptyCardText = screen.getByText("No hay archivos guardados");
        expect(emptyCardText).toBeInTheDocument();

        // Assert calls to API
        //expect(apiRequest).toHaveBeenCalledTimes(2);

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/",
            pathname: "/",
            query: {},
        });
    });

    it("notifies error querying files from API", async () => {
        // Mock implementations of functions
        mockedApiRequest
            .mockImplementationOnce(
                (url, method) =>
                    new Promise((resolve, reject) => resolve("Mocked response from the API"))
            )
            .mockRejectedValueOnce(new Error("Error retornando archivos"));
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<FilesView />);

        // Assert notification popup appeared
        const notification = await screen.findByTestId("message-dialog");
        expect(notification).toBeInTheDocument();
        const notificationText = await screen.findByText("Error retornando archivos");
        expect(notificationText).toBeInTheDocument();

        // Trigger event to close window
        const button = screen.getByText("Entendido");
        fireEvent.click(button);

        // Assert notification popup is gone
        expect(notification).not.toBeInTheDocument();
        expect(notificationText).not.toBeInTheDocument();

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalledTimes(2);

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/",
            pathname: "/",
            query: {},
        });
    });

    it("opens the form to upload a new file", async () => {
        // Mock implementations of functions
        mockedApiRequest
            .mockImplementationOnce(
                (url, method) =>
                    new Promise((resolve, reject) => resolve("Mocked response from the API"))
            )
            .mockImplementationOnce(
                (url, method) => new Promise((resolve, reject) => resolve(files))
            );
        mockedGetJwtToken.mockImplementation(() => "VALID_TOKEN");

        // Instantiate widget under test
        render(<FilesView />);

        // Assert components in widget
        const button = screen.getByText("Subir archivo");
        expect(button).toBeInTheDocument();

        // Trigger event to open form
        fireEvent.click(button);

        // Assert form appeared
        const form = await screen.findByTestId("item-form");
        expect(form).toBeInTheDocument();

        // Trigger event to close form
        fireEvent.keyDown(form, {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            charCode: 27,
        });

        // Assert form is gone
        expect(form).not.toBeInTheDocument();

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalledTimes(2);

        // Assert status of router
        expect(mockRouter).toMatchObject({
            asPath: "/",
            pathname: "/",
            query: {},
        });
    });
});
