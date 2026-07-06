import { PrismaService } from "../../prisma/prisma.service";
import { SummaryResponseDto } from "./dto/summary.dto";
export declare class SummaryService {
    private prisma;
    constructor(prisma: PrismaService);
    getSummary(projectId: string, buyerId: string): Promise<SummaryResponseDto>;
    private getLayoutMeta;
}
