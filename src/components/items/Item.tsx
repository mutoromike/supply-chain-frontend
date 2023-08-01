import React from 'react';
import ItemForm from './ItemForm';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { ItemType } from '../../types/item';

const Item: React.FC = () => {
	const mutation = useMutation(
		(itemData: ItemType) => {
			return axios.post('http://localhost:3001/api/v1/items', itemData);
		},
		{
			onSuccess: () => {
				toast.success('Login successful!');
			},
			onError: (error: AxiosError<AxiosError>) => {
				const errors = error.response?.data?.message;
				if (typeof errors === 'string') {
					toast.error(errors.split(',').join('\n'));
				} else {
					toast.error(`Erors: ${errors}`);
				}
			},
		},
	);

	const handleItemCreate = (
		name: string,
		sku: string,
		price: number,
		quantity: number,
		color: string,
		description: string,
		manufacturer: string,
	) => {
		const itemData: ItemType = {
			name,
			sku,
			price,
			quantity,
			color,
			description,
			manufacturer,
		};
		mutation.mutate(itemData);
	};

	return (
		<div>
			<h2>Create Item</h2>
			<ItemForm onSubmit={handleItemCreate} />
		</div>
	);
};

export default Item;
