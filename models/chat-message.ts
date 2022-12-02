export interface ChatMessage {
    question: string;
    answer: string | undefined;
    time: Date;
}