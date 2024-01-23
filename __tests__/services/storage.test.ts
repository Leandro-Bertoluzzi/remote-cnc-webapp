import "@testing-library/jest-dom";
import { getJwtToken, setJwtToken } from "@/services/storage";

jest.mock("@/config", () => ({
    __esModule: true, // this property makes it work
    default: {
        JWT_NAME: "jwt-test",
    },
}));

describe("storage", () => {
    it("gets value from local storage", async () => {
        const mockGetItem = jest.spyOn(Storage.prototype, "getItem");
        mockGetItem.mockImplementation(() => "a-token");

        const value = getJwtToken();
        expect(value).toBe("a-token");
        expect(mockGetItem).toHaveBeenCalledTimes(1);
    });

    it("gets non-existent value from local storage", async () => {
        const mockGetItem = jest.spyOn(Storage.prototype, "getItem");
        mockGetItem.mockImplementation(() => null);

        const value = getJwtToken();
        expect(value).toBe("");
        expect(mockGetItem).toHaveBeenCalledTimes(1);
    });

    it("sets value in local storage", async () => {
        const mockSetItem = jest.spyOn(Storage.prototype, "setItem");
        mockSetItem.mockImplementation(() => {
            return;
        });

        setJwtToken("a-new-token");
        expect(mockSetItem).toHaveBeenCalledTimes(1);
        expect(mockSetItem).toHaveBeenCalledWith("jwt-test", "a-new-token");
    });
});
