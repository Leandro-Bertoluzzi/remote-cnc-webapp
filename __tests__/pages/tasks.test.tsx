import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import TasksView from "@/app/(authenticated)/tasks/page";
import apiRequest from "@/services/apiService";
import Task from "@/types/Task";
import { TaskCardProps } from "@/components/cards/taskCard";
import { TaskFormProps } from "@/components/forms/taskForm";
import MessageDialogProps from "@/types/MessageDialogProps";
import { NotificationProvider } from "@/contexts/notificationContext";
import NotificationsWrapper from "@/components/wrappers/notificationsWrapper";
import { ItemsProvider } from "@/contexts/itemsContext";
import useAuth from "@/hooks/useauth";

// Mock authentication
jest.mock("@/hooks/useauth");
const mockedAuth = jest.mocked(useAuth);

// Mock apiRequest import
jest.mock("@/services/apiService");
const mockedApiRequest = jest.mocked(apiRequest);

// Mock response from API
const tasks: Task[] = [
    {
        id: 1,
        name: "An example project 1",
        user_id: 1,
        material_id: 1,
        tool_id: 1,
        file_id: 1,
        note: "Additional instructions for admin",
        priority: 20,
        created_at: "El lunes pasado",
        status: "pending_approval",
        status_updated_at: "El lunes pasado",
        cancellation_reason: "",
    },
    {
        id: 2,
        name: "An example project 2",
        user_id: 1,
        material_id: 2,
        tool_id: 1,
        file_id: 2,
        note: "Additional instructions for admin",
        priority: 10,
        created_at: "El martes pasado",
        status: "on_hold",
        admin_id: 1,
        status_updated_at: "El martes pasado",
        cancellation_reason: "",
    },
    {
        id: 3,
        name: "An example project 3",
        user_id: 1,
        material_id: 3,
        tool_id: 3,
        file_id: 3,
        note: "Additional instructions for admin",
        priority: 5,
        created_at: "El martes pasado",
        status: "on_hold",
        admin_id: 1,
        status_updated_at: "El martes pasado",
        cancellation_reason: "",
    },
    {
        id: 4,
        name: "An example project 4",
        user_id: 1,
        material_id: 4,
        tool_id: 4,
        file_id: 4,
        note: "Additional instructions for admin",
        priority: 30,
        created_at: "Hace un mes",
        status: "in_progress",
        admin_id: 1,
        status_updated_at: "El lunes pasado",
        cancellation_reason: "",
    },
];

// Mock child React components
jest.mock("@/components/cards/taskCard", () =>
    // eslint-disable-next-line react/display-name
    ({ task, show }: TaskCardProps) => {
        if (!show) {
            return <></>;
        }
        return (
            <div data-testid="task-card">
                {task.id} - {task.name} - {task.created_at}
            </div>
        );
    }
);

jest.mock("@/components/forms/taskForm", () =>
    // eslint-disable-next-line react/display-name
    ({ exitAction }: TaskFormProps) => (
        <div data-testid="task-form">
            <button onClick={exitAction}>Close form</button>
        </div>
    )
);

jest.mock("@/components/dialogs/messageDialog", () =>
    // eslint-disable-next-line react/display-name
    ({ onClose, text }: MessageDialogProps) => (
        <div data-testid="message-dialog">
            {text}
            <button onClick={onClose}>Close dialog</button>
        </div>
    )
);

// View component with its wrappers for context
const WrappedComponent = () => (
    <NotificationProvider>
        <NotificationsWrapper>
            <ItemsProvider>
                <TasksView />
            </ItemsProvider>
        </NotificationsWrapper>
    </NotificationProvider>
);

describe("TasksView", () => {
    beforeEach(() => {
        mockedAuth.mockReturnValue(true);
    });

    afterEach(() => {
        cleanup();
    });

    it("renders the view after successful login", async () => {
        // Mock API calls
        mockedApiRequest
            .mockResolvedValueOnce([]) // files
            .mockResolvedValueOnce([]) // materials
            .mockResolvedValueOnce([]) // tools
            .mockResolvedValueOnce(tasks);

        // Instantiate widget under test
        render(<WrappedComponent />);

        // Assert components in widget
        const taskCards = await screen.findAllByTestId("task-card");
        expect(taskCards).toHaveLength(4);
        const notification = screen.queryByTestId("message-dialog");
        expect(notification).not.toBeInTheDocument();
        const form = screen.queryByTestId("task-form");
        expect(form).not.toBeInTheDocument();
        const button = screen.getByText("Crear tarea");
        expect(button).toBeInTheDocument();

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalledTimes(4);
    });

    it("renders the load screen before authenticating", async () => {
        // Mock authentication hook
        mockedAuth.mockReturnValue(false);

        // Instantiate widget under test
        render(<WrappedComponent />);

        // Assert components in widget
        const loader = screen.queryByTestId("loader");
        expect(loader).toBeInTheDocument();

        // Assert calls to API
        expect(apiRequest).toHaveBeenCalledTimes(0);
    });

    it("renders the view with no tasks", async () => {
        // Mock API calls
        mockedApiRequest
            .mockResolvedValueOnce([]) // files
            .mockResolvedValueOnce([]) // materials
            .mockResolvedValueOnce([]) // tools
            .mockResolvedValueOnce([]); // tasks

        // Instantiate widget under test
        render(<WrappedComponent />);

        // Assert components in widget
        const taskCards = screen.queryAllByTestId("task-card");
        expect(taskCards).toHaveLength(0);
        const notification = screen.queryByTestId("message-dialog");
        expect(notification).not.toBeInTheDocument();
        const form = screen.queryByTestId("task-form");
        expect(form).not.toBeInTheDocument();
        const emptyCardText = screen.getByText("No hay tareas programadas");
        expect(emptyCardText).toBeInTheDocument();
    });

    it("notifies error querying items from API", async () => {
        // Mock API calls
        mockedApiRequest.mockRejectedValue(new Error("Error en comunicación con API"));

        // Instantiate widget under test
        render(<WrappedComponent />);

        // Assert notification popup appeared
        const notification = await screen.findByTestId("message-dialog");
        expect(notification).toBeInTheDocument();
        const notificationText = await screen.findByText("Error en comunicación con API");
        expect(notificationText).toBeInTheDocument();

        // Trigger event to close window
        const button = screen.getByText("Close dialog");
        fireEvent.click(button);

        // Assert notification popup is gone
        expect(notification).not.toBeInTheDocument();
        expect(notificationText).not.toBeInTheDocument();
    });

    it("opens the form to upload a new task", async () => {
        // Mock API calls
        mockedApiRequest
            .mockResolvedValueOnce([]) // files
            .mockResolvedValueOnce([]) // materials
            .mockResolvedValueOnce([]) // tools
            .mockResolvedValueOnce(tasks);

        // Instantiate widget under test
        render(<WrappedComponent />);

        // Assert components in widget
        const taskCards = await screen.findAllByTestId("task-card");
        expect(taskCards).toHaveLength(4);
        const button = screen.getByText("Crear tarea");
        expect(button).toBeInTheDocument();

        // Trigger event to open form
        fireEvent.click(button);

        // Assert form appeared
        const form = await screen.findByTestId("task-form");
        expect(form).toBeInTheDocument();

        // Close form
        const closeFormBtn = screen.getByText("Close form");
        expect(closeFormBtn).toBeInTheDocument();
        fireEvent.click(closeFormBtn);

        // Assert form is gone
        expect(form).not.toBeInTheDocument();
    });
});
