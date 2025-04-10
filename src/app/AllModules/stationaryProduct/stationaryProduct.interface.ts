export type StationaryProduct = {
    name: string;
    photo: string;
    brand: string;
    price: number;
    category: "Writing" | "Office Supplies" | "Art Supplies" | "Educational" | "Technology";
    description: string;
    quantity: number;
    inStock: boolean;
    isDeleted:boolean;
    createdAt: Date;
    updatedAt: Date;
}