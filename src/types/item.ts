export interface ItemType {
    name: string;
    sku: string;
    price: number;
    quantity: number;
    color: string;
    description: string;
    manufacturer: string;
}

export interface ItemFormProps {
	onSubmit: (
		name: string,
        sku: string,
        price: number,
        quantity: number,
        color: string,
        description: string,
        manufacturer: string,
	) => void;
    item?: ItemType;
}