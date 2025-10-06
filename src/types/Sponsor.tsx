import { Account } from "./User";

export interface Sponsor {
    sponsorUuid: string;
    sponsorAmount: number;
    startDate: string;
    endDate: string;
    user: Account;
    status: string;
}