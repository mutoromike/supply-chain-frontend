import React from 'react';
import ItemForm from './ItemForm';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { ItemType } from '../../types/item';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/Api';

const UpdateItem: React.FC = () => {
    const { id } = useParams();
	const navigate = useNavigate();
    const query = useQuery(
        'item',
        () => {
            return api.get(`http://localhost:3001/api/v1/items/${id}`);
        },
        {
            onSuccess: (data) => {
            },
        },
    );
    const item = query.data?.data;
    console.log(item);

	const mutation = useMutation(
		(itemData: ItemType) => {
			return api.patch(`http://localhost:3001/api/v1/items/${id}`, itemData);
		},
		{
			onSuccess: () => {
				toast.success('Item updated Successful!');
				navigate('/items/' + id);
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
			<h2>Edit Item</h2>
			<ItemForm onSubmit={handleItemCreate} item={item} />
		</div>
	);
};

export default UpdateItem;
