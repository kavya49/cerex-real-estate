import { SummaryService } from "./summary.service";
export declare class SummaryController {
    private readonly summaryService;
    constructor(summaryService: SummaryService);
    getSummary(projectId: string, req: any): Promise<import("./dto/summary.dto").SummaryResponseDto>;
}
