import { Stack, TextField, Button } from '@mui/material';
import { ItemFormProps } from '../../types/item';

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, item }) => {
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
		const price = Number(target.price.value);
		const quantity = Number(target.quantity.value);
		const color = target.color.value;
		const description = target.description.value;
		const manufacturer = target.manufacturer.value;
		onSubmit(name, sku, price, quantity, color, description, manufacturer);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Stack spacing={2} alignItems="center">
					<TextField
						label="Item Name"
						type="text"
						name="name"
						defaultValue={item?.name}
						sx={{ width: '500px' }}
						variant="outlined"
					/>
					<TextField
						label="Item SKU"
						type="text"
						name="sku"
						defaultValue={item?.sku}
						sx={{ width: '500px' }}
						variant="outlined"
					/>
					<TextField
						label="Price"
						type="number"
						name="price"
						defaultValue={item?.price}
						sx={{ width: '500px' }}
						variant="outlined"
					/>
					<TextField
						label="Quantity"
						type="number"
						name="quantity"
						defaultValue={item?.quantity}
						sx={{ width: '500px' }}
						variant="outlined"
					/>
					<TextField
						label="Item Color"
						type="text"
						name="color"
						defaultValue={item?.color}
						sx={{ width: '500px' }}
						variant="outlined"
					/>
					<TextField
						label="Description"
						type="string"
						name="description"
						defaultValue={item?.description}
						sx={{ width: '500px' }}
						variant="outlined"
					/>
					<TextField
						label="Manufacturer"
						type="string"
						name="manufacturer"
						defaultValue={item?.manufacturer}
						sx={{ width: '500px' }}
						variant="outlined"
					/>
					<Button type="submit" variant="contained" color="primary" sx={{ width: '500px' }}>
						{`${!!item ? 'Edit' : 'Create'} Item`}
					</Button>
				</Stack>
			</form>
		</div>
	);
};

export default ItemForm;
