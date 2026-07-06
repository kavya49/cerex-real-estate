export declare class CreateKnowledgeDto {
    title: string;
    content: string;
    category: string;
    tags?: string[];
    isPublished?: boolean;
    priority?: number;
    metadata?: any;
}
export declare class UpdateKnowledgeDto {
    title?: string;
    content?: string;
    category?: string;
    tags?: string[];
    isPublished?: boolean;
    priority?: number;
}
export declare class KnowledgeQueryDto {
    page?: number;
    limit?: number;
    category?: string;
    isPublished?: boolean;
}
