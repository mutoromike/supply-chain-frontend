import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/Api';
import {
	Card,
	CardContent,
	Grid,
	Typography,
	Divider,
	Button,
	Stack,
} from '@mui/material';
import { EventType } from '../../types/event';
import DeleteModal from './Delete';
import { toast } from 'react-toastify';

const ItemPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const handleClose = () => setOpen(!open);
	const onDelete = () => mutation.mutate(id!);
	const mutation = useMutation(
		(id: string) => {
			return api.delete(`http://localhost:3001/api/v1/items/${id}`);
		},
		{
			onSuccess: (data) => {
				toast.success('Item deleted successfully');
				navigate('/items');
			},
			onError: (error) => {
				toast.error('Error deleting item');
			},
		},
	);

	const eventsQuery = useQuery(
		`events-${id}`,
		() => {
			return api.get(`http://localhost:3001/api/v1/items/${id}/events`);
		},
		{
			onSuccess: (data) => {
			},
		},
	);
	const itemQuery = useQuery(
		`item-${id}`,
		() => {
			return api.get(`http://localhost:3001/api/v1/items/${id}`);
		},
		{
			onSuccess: (data) => {
			}
		},
	);

	if (itemQuery.isLoading || eventsQuery.isLoading) {
		return <div>Loading...</div>;
	}

	if (itemQuery.isError || eventsQuery.isError) {
		return <div>Error</div>;
	}

	const item = itemQuery.data?.data;
	const events = eventsQuery.data?.data;

	return (
		<div>
			<Card
				sx={{
					maxWidth: '80vw',
					flexGrow: 1,
					margin: 'auto',
					mt: 4,
					p: 2,
					borderRadius: 4,
					boxShadow: 5,
				}}
			>
				<CardContent>
					<Grid container spacing={2}>
						{/* Left Column - Item Details */}
						<Grid item xs={6}>
							<Typography variant="h5" gutterBottom align="left">
								Item Details
							</Typography>
							<Typography variant="body1" gutterBottom align="left">
								Name: {item.name}
							</Typography>
							<Typography variant="body1" gutterBottom align="left">
								SKU: {item.sku}
							</Typography>
							<Typography variant="body1" gutterBottom align="left">
								Price: ${item.price.toFixed(2)}
							</Typography>
							<Typography variant="body1" gutterBottom align="left">
								Quantity: {item.quantity}
							</Typography>
							<Typography variant="body1" gutterBottom align="left">
								Color: {item.color}
							</Typography>
							<Typography variant="body1" align="left">
								Description: {item.description}
							</Typography>
							<Typography variant="body1" align="left">
								Manufacturer: {item.manufacturer}
							</Typography>
							<Stack direction="row" spacing={2}>
								<Link to={`events/create`}>
									<Button variant="contained">Add New Event</Button>
								</Link>
								<Link to={`edit`}>
									<Button variant="contained">Edit</Button>
								</Link>
								<Button variant="contained" color="error" onClick={handleClose}>
									Delete
								</Button>
							</Stack>
						</Grid>

						{/* Right Column - List of Events */}
						<Divider
							orientation="vertical"
							flexItem
							sx={{ my: 2, flexGrow: 1 }}
						/>
						<Grid item xs={5} justifyContent={'start'}>
							<Typography variant="h5" gutterBottom align="left">
								Events
							</Typography>
							{events.map((event: EventType) => (
								<React.Fragment key={event.id}>
									<Link to={`events/${event.id}`} key={event.id}>
										<Typography variant="body1" align="left">
											Name: {event.name}
										</Typography>
									</Link>
									<Typography variant="body2" align='left'>
										Status: {event.status}
									</Typography>
									<Typography variant="body2" align='left'>
										Custodian: {event.custodian}
									</Typography>
									<Typography variant="body2" align='left'>
										Description: {event.description}
									</Typography>
									<Divider sx={{ my: 1 }} />
								</React.Fragment>
							))}
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<DeleteModal open={open} handleClose={handleClose} onDelete={onDelete} />
		</div>
	);
};

export default ItemPage;
