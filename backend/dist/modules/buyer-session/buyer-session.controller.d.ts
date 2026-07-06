import { BuyerSessionService } from "./buyer-session.service";
import { CreateBuyerSessionDto, RefreshBuyerSessionDto, BuyerSessionResponseDto } from "./dto/buyer-session.dto";
export declare class BuyerSessionController {
    private readonly buyerSessionService;
    constructor(buyerSessionService: BuyerSessionService);
    createSession(projectId: string, dto: CreateBuyerSessionDto, ipAddress: string): Promise<BuyerSessionResponseDto>;
    refreshSession(projectId: string, dto: RefreshBuyerSessionDto): Promise<BuyerSessionResponseDto>;
    getProfile(req: any): Promise<{
        buyer: {
            id: any;
            email: any;
            name: any;
            familySize: any;
            children: any;
            workFromHome: any;
            lifestyle: any;
            timeline: any;
            style: any;
            budget: any;
            selectedLayout: any;
        };
        session: {
            id: any;
            expiresAt: any;
            lastSeenAt: any;
        };
    }>;
}
