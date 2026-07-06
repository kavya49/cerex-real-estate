export declare class SummaryResponseDto {
    buyer: {
        id: string;
        email: string;
        name: string | null;
        familySize: string | null;
        children: string | null;
        workFromHome: string | null;
        lifestyle: string | null;
        timeline: string | null;
        style: string | null;
        budget: number | null;
        selectedLayout: string | null;
        lastActiveAt: Date | null;
    };
    layout: {
        key: string;
        name: string;
        tag: string;
        sqft: string;
        tower: string;
        floor: string;
    } | null;
    events: Array<{
        id: string;
        name: string;
        properties: any;
        timestamp: Date;
    }>;
    lead: {
        id: string;
        name: string;
        phone: string;
        email: string;
        intent: string;
        status: string;
        createdAt: Date;
    } | null;
    project: {
        id: string;
        name: string;
        slug: string;
    };
}
