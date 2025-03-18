export type Budget={
    _id: string;
    category: string;
    amount: number;
    spent: number;
    month: number;
    year: number;
    color: string;
}

export type Category={
    _id: string;
    name: string;
    color: string;
}

export type Transaction= {
    _id: string;
    description: string;
    amount: number;
    date: Date;
    category: string;
    type: string;
}