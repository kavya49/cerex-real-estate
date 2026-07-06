"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAPPING_REGISTRY = void 0;
exports.MAPPING_REGISTRY = {
    household: {
        familySize: {
            map: (value) => {
                const num = parseInt(value.replace(/\D/g, ""), 10);
                return isNaN(num) ? 2 : Math.max(1, Math.min(10, num));
            },
        },
        children: {
            map: (value) => {
                if (value.toLowerCase().includes("none") ||
                    value.toLowerCase().includes("no"))
                    return 0;
                const num = parseInt(value.replace(/\D/g, ""), 10);
                return isNaN(num) ? 0 : Math.max(0, Math.min(5, num));
            },
        },
    },
    lifestyle: {
        workFromHome: {
            map: (value) => {
                const normalized = value.toLowerCase().trim();
                if (normalized.includes("full"))
                    return "full-time";
                if (normalized.includes("sometimes") ||
                    normalized.includes("occasionally") ||
                    normalized.includes("hybrid"))
                    return "hybrid";
                if (normalized.includes("never") || normalized.includes("no"))
                    return "never";
                return "hybrid";
            },
        },
        lifestyle: {
            map: (value) => {
                const normalized = value.toLowerCase().trim();
                if (normalized.includes("quiet") || normalized.includes("peaceful"))
                    return "quiet";
                if (normalized.includes("social") ||
                    normalized.includes("party") ||
                    normalized.includes("entertain"))
                    return "social";
                if (normalized.includes("wellness") ||
                    normalized.includes("health") ||
                    normalized.includes("fitness") ||
                    normalized.includes("active"))
                    return "wellness";
                return "balanced";
            },
        },
        timeline: {
            map: (value) => {
                const normalized = value.toLowerCase().trim();
                if (normalized.includes("immediate") ||
                    normalized.includes("now") ||
                    normalized.includes("asap"))
                    return 0;
                if (normalized.includes("month") || normalized.includes("30 day"))
                    return 1;
                if (normalized.includes("3 month") || normalized.includes("quarter"))
                    return 3;
                if (normalized.includes("6 month") || normalized.includes("half year"))
                    return 6;
                if (normalized.includes("year") || normalized.includes("12 month"))
                    return 12;
                if (normalized.includes("2 year") || normalized.includes("24 month"))
                    return 24;
                if (normalized.includes("3 year") || normalized.includes("36 month"))
                    return 36;
                return 6;
            },
        },
    },
    design: {
        style: {
            map: (value) => {
                const normalized = value.toLowerCase().trim();
                const tokens = [];
                if (normalized.includes("modern") ||
                    normalized.includes("contemporary"))
                    tokens.push("modern");
                if (normalized.includes("luxury"))
                    tokens.push("luxury");
                if (normalized.includes("minimal") || normalized.includes("zen"))
                    tokens.push("minimalist");
                if (normalized.includes("scandinavian"))
                    tokens.push("scandinavian");
                if (normalized.includes("classic") ||
                    normalized.includes("traditional") ||
                    normalized.includes("heritage"))
                    tokens.push("classic");
                if (normalized.includes("warm") ||
                    normalized.includes("family") ||
                    normalized.includes("cozy") ||
                    normalized.includes("comfort"))
                    tokens.push("warm");
                if (tokens.length === 0)
                    tokens.push("modern");
                return tokens;
            },
        },
    },
    financial: {
        budget: {
            map: (value) => {
                const num = typeof value === "string"
                    ? parseFloat(value.replace(/[^\d.]/g, ""))
                    : value;
                if (isNaN(num))
                    return 25000000;
                if (num <= 10)
                    return num * 10000000;
                if (num <= 100)
                    return num * 100000;
                return num * 100000;
            },
        },
    },
    preferences: {
        lifestyle: {
            balcony: (value) => {
                const normalized = value.toLowerCase();
                return (normalized.includes("wellness") ||
                    normalized.includes("outdoor") ||
                    normalized.includes("balcony") ||
                    normalized.includes("terrace"));
            },
            homeOffice: (value) => {
                const normalized = value.toLowerCase();
                return (normalized.includes("work") &&
                    (normalized.includes("full") ||
                        normalized.includes("hybrid") ||
                        normalized.includes("home")));
            },
        },
        style: {
            floorLevel: (value) => {
                const normalized = value.toLowerCase();
                if (normalized.includes("wellness") ||
                    normalized.includes("quiet") ||
                    normalized.includes("peaceful"))
                    return "high";
                if (normalized.includes("social") || normalized.includes("family"))
                    return "mid";
                return "mid";
            },
        },
    },
};
//# sourceMappingURL=mapping-registry.js.map