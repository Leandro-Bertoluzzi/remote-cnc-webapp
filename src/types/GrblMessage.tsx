type MessageType = "sent" | "received";

export default interface GrblMessage {
    type: MessageType;
    message: string;
}
