import { ViewerService } from "./viewer.service";
export declare class ViewerController {
    private readonly viewerService;
    constructor(viewerService: ViewerService);
    getModels(projectId: string): Promise<{
        id: string;
        name: string;
        url: string;
    }[]>;
    getModel(projectId: string, modelId: string): Promise<{
        id: string;
        name: string;
        url: string;
    }>;
}
