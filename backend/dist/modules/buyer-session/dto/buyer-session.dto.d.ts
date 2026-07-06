export declare class CreateBuyerSessionDto {
    deviceInfo?: string;
    ipAddress?: string;
}
export declare class RefreshBuyerSessionDto {
    refreshToken: string;
}
export declare class BuyerSessionResponseDto {
    buyerId: string;
    sessionId: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}
