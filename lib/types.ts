export type Budget={
    id: string;
    category: string;
    amount: number;
    spent: number;
    month: number;
    year: number;
    color: string;
}

export type Category={
    id: string;
    name: string;
    color: string;
}