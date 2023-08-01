import React from 'react';
import ItemForm from './ItemForm'
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { ItemType } from '../../types/item';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/Api';

const CreateItem: React.FC = () => {
	const navigate = useNavigate();
	const mutation = useMutation(
		(itemData: ItemType) => {
			return api.post('http://localhost:3001/api/v1/items', itemData);
		},
		{
			onSuccess: (data) => {
				toast.success('Item Created Successful!');
				navigate(`/items/${data.data.id}`);
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

export default CreateItem;
