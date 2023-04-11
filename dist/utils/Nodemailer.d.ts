export declare class NodeMailer {
    private static initiateTransport;
    static sendMail(data: {
        to: string[];
        subject: string;
        html: string;
    }): Promise<void>;
}
