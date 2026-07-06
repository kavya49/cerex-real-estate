import { CrmService } from "./crm.service";
export declare class CrmController {
    private readonly crmService;
    constructor(crmService: CrmService);
    createDeal(projectId: string, body: any): Promise<any>;
    listDeals(projectId: string, query: any): Promise<{
        data: never[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
