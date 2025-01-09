export interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
    isReplied: boolean;
    reply?: string;
    repliedAt?: Date;

}