export declare const BULL_QUEUES: {
    readonly EMAIL: "email";
    readonly WHATSAPP: "whatsapp";
    readonly NOTIFICATIONS: "notifications";
    readonly ANALYTICS: "analytics";
    readonly AI_PROCESSING: "ai-processing";
    readonly EXPORT: "export";
    readonly WEBHOOK: "webhook";
};
export type BullQueueName = (typeof BULL_QUEUES)[keyof typeof BULL_QUEUES];
export declare class BullModule {
}
