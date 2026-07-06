export declare class CreateBuyerDto {
    email: string;
    phone?: string;
    name?: string;
    familySize?: string;
    children?: string;
    workFromHome?: string;
    lifestyle?: string;
    timeline?: string;
    style?: string;
    budget?: number;
    selectedLayout?: string;
}
export declare class UpdateBuyerDto {
    phone?: string;
    name?: string;
    familySize?: string;
    children?: string;
    workFromHome?: string;
    lifestyle?: string;
    timeline?: string;
    style?: string;
    budget?: number;
    selectedLayout?: string;
    preferences?: any;
    dnaProfile?: any;
}
export declare class BuyerQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    layout?: string;
}
