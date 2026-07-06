export declare const MAPPING_REGISTRY: {
    readonly household: {
        readonly familySize: {
            readonly map: (value: string) => number;
        };
        readonly children: {
            readonly map: (value: string) => number;
        };
    };
    readonly lifestyle: {
        readonly workFromHome: {
            readonly map: (value: string) => "full-time" | "hybrid" | "never";
        };
        readonly lifestyle: {
            readonly map: (value: string) => "quiet" | "social" | "wellness" | "balanced";
        };
        readonly timeline: {
            readonly map: (value: string) => 0 | 3 | 1 | 12 | 24 | 6 | 36;
        };
    };
    readonly design: {
        readonly style: {
            readonly map: (value: string) => string[];
        };
    };
    readonly financial: {
        readonly budget: {
            readonly map: (value: number | string) => number;
        };
    };
    readonly preferences: {
        readonly lifestyle: {
            readonly balcony: (value: string) => boolean;
            readonly homeOffice: (value: string) => boolean;
        };
        readonly style: {
            readonly floorLevel: (value: string) => "high" | "mid";
        };
    };
};
export type MappingRegistry = typeof MAPPING_REGISTRY;
