import "@testing-library/jest-dom";
import apiRequest from "@/services/apiService";
import { getJwtToken } from "@/services/storage";

// Mock config module
jest.mock("@/config", () => ({
    __esModule: true, // this property makes it work
    default: {
        API_URL: "http://api-baseurl",
    },
}));

// Mock getJwtToken import
jest.mock("@/services/storage");
const mockedGetJwtToken = jest.mocked(getJwtToken);

describe("api service", () => {
    it("successfull GET request", async () => {
        // Mock involved functions
        const mockResponse = { data: "fake response" };
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockResponse),
            })
        ) as jest.Mock;
        mockedGetJwtToken.mockReturnValue("VALID_TOKEN");

        // Invoke function under test
        const response = await apiRequest("path", "GET");

        // Assertions
        expect(response).toStrictEqual({ data: "fake response" });
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith("http://api-baseurl/path?token=VALID_TOKEN", {
            method: "GET",
            headers: undefined,
            body: undefined,
        });
    });

    it("successfull GET request with query", async () => {
        // Mock involved functions
        const mockResponse = { data: "fake response" };
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockResponse),
            })
        ) as jest.Mock;
        mockedGetJwtToken.mockReturnValue("VALID_TOKEN");

        // Invoke function under test
        const response = await apiRequest("path?query=value", "GET");

        // Assertions
        expect(response).toStrictEqual({ data: "fake response" });
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            "http://api-baseurl/path?query=value&token=VALID_TOKEN",
            {
                method: "GET",
                headers: undefined,
                body: undefined,
            }
        );
    });

    it("successfull POST request with JSON body", async () => {
        // Mock involved functions
        const mockResponse = { data: "fake response" };
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockResponse),
            })
        ) as jest.Mock;
        mockedGetJwtToken.mockReturnValue("VALID_TOKEN");

        // Invoke function under test
        const response = await apiRequest("path", "POST", { data: "fake body" }, true);

        // Assertions
        expect(response).toStrictEqual({ data: "fake response" });
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith("http://api-baseurl/path?token=VALID_TOKEN", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: '{"data":"fake body"}',
        });
    });

    it("successfull POST request with non-JSON body", async () => {
        // Mock involved functions
        const mockResponse = { data: "fake response" };
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockResponse),
            })
        ) as jest.Mock;
        mockedGetJwtToken.mockReturnValue("VALID_TOKEN");

        // Invoke function under test
        const response = await apiRequest("path", "POST", { data: "fake body" }, false);

        // Assertions
        expect(response).toStrictEqual({ data: "fake response" });
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith("http://api-baseurl/path?token=VALID_TOKEN", {
            method: "POST",
            headers: undefined,
            body: { data: "fake body" },
        });
    });

    it("error during request", async () => {
        // Mock involved functions
        global.fetch = jest.fn(() => Promise.reject("An error")) as jest.Mock;
        mockedGetJwtToken.mockReturnValue("VALID_TOKEN");

        // Invoke function under test and assert error
        await expect(apiRequest("path", "GET")).rejects.toEqual(
            Error("Falló la conexión con la API")
        );
    });

    it("unsuccessfull GET request", async () => {
        // Mock involved functions
        const mockResponse = { detail: [{ msg: "This is a mocked error" }] };
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 404,
                statusText: "Not found",
                json: () => Promise.resolve(mockResponse),
            })
        ) as jest.Mock;
        mockedGetJwtToken.mockReturnValue("VALID_TOKEN");

        // Invoke function under test and assert error
        await expect(apiRequest("path", "GET")).rejects.toEqual(
            Error("404 Not found: This is a mocked error\n")
        );
    });

    it("unsuccessfull GET request with no error detail", async () => {
        // Mock involved functions
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 404,
                statusText: "Not found",
                json: () => Promise.resolve({}),
            })
        ) as jest.Mock;
        mockedGetJwtToken.mockReturnValue("VALID_TOKEN");

        // Invoke function under test and assert error
        await expect(apiRequest("path", "GET")).rejects.toEqual(Error("404 Not found"));
    });
});
