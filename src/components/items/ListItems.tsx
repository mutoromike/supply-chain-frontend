import React from 'react';
import { useMutation, useQuery } from 'react-query';
import api from '../../utils/Api';
import { toast } from 'react-toastify';
import ItemComponent from './Item';
import { List, colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './Delete';
import { queryClient } from '../..';

const ListItems = () => {
	const [open, setOpen] = React.useState(false);
	const [id, setId] = React.useState<string | null>(null);
	const navigate = useNavigate();
	const toggleModal = () => setOpen(!open);
	const handleDeleteItem = (id: string) => {
		setId(id);
		toggleModal();
	};
	const onDelete = () => mutation.mutate(id!);
	const mutation = useMutation(
		(id: string) => {
			return api.delete(`http://localhost:3001/api/v1/items/${id}`);
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries('items');
				toast.success('Item deleted successfully');
			},
			onError: (error) => {
				toast.error('Error deleting item');
			},
		},
	);
	const { data, error } = useQuery(
		'items',
		() => {
			return api.get('http://localhost:3001/api/v1/items');
		},
		{
			onError: (error) => {
				toast.error('An error occured while fetching data');
			},
			onSuccess: (data) => {
				toast.success('Data fetched successfully');
			},
		},
	);
	if (error) {
		return <div>Error fetching data</div>;
	}

	return (
		<div>
			<p></p>
			<List
				sx={{
					width: '100%',
					maxWidth: 360,
					bgcolor: colors.grey['300'],
				}}
				style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}
			>
				{data?.data.map((item: any) => (
					<ItemComponent
						item={item}
						key={item.id}
						onDeleteItem={handleDeleteItem}
					/>
				))}
			</List>
			<DeleteModal onDelete={onDelete} open={open} handleClose={toggleModal} />
		</div>
	);
};

export default ListItems;
