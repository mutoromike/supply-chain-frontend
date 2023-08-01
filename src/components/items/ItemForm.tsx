import { ItemFormProps } from "../../types/item";


const ItemForm: React.FC<ItemFormProps> = ({ onSubmit }) => {

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			name: { value: string };
			sku: { value: string };
			price: { value: number };
			quantity: { value: number };
			color: { value: string };
			description: { value: string };
			manufacturer: { value: string };
		};
		const name = target.name.value;
		const sku = target.sku.value;
		const price = target.price.value;
		const quantity = target.quantity.value;
		const color = target.color.value;
		const description = target.description.value;
        const manufacturer = target.manufacturer.value;
		onSubmit(name, sku, price, quantity, color, description, manufacturer);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Item Name:
						<input type="text" name="name" />
					</label>
				</div>
				<div>
					<label>
						Item SKU:
						<input type="text" name="sku" />
					</label>
				</div>
				<div>
					<label>
						Price:
						<input type="number" name="price" />
					</label>
				</div>
				<div>
					<label>
						Quantity:
						<input type="number" name="quantity" />
					</label>
				</div>
				<div>
					<label>
						Item Color:
						<input type="text" name="color" />
					</label>
				</div>
				<div>
					<label>
						Description:
						<input type="string" name="description" />
					</label>
				</div>
				<div>
					<label>
						Manufacturer:
						<input type="string" name="manufacturer" />
					</label>
				</div>
				<button type="submit">Create Item</button>
			</form>
		</div>
	);
}

export default ItemForm;