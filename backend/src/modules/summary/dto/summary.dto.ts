import { ApiProperty } from "@nestjs/swagger";

export class SummaryResponseDto {
  @ApiProperty()
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

  @ApiProperty()
  layout: {
    key: string;
    name: string;
    tag: string;
    sqft: string;
    tower: string;
    floor: string;
  } | null;

  @ApiProperty()
  events: Array<{
    id: string;
    name: string;
    properties: any;
    timestamp: Date;
  }>;

  @ApiProperty()
  lead: {
    id: string;
    name: string;
    phone: string;
    email: string;
    intent: string;
    status: string;
    createdAt: Date;
  } | null;

  @ApiProperty()
  project: {
    id: string;
    name: string;
    slug: string;
  };
}
