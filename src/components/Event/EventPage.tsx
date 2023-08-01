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
import { toast } from 'react-toastify';
import DeleteModal from '../Items/Delete';

const EventPage = () => {
	const { eventid, itemid } = useParams<{ eventid: string; itemid: string }>();
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const handleClose = () => setOpen(!open);
	const onDelete = () => mutation.mutate(eventid!);
	const mutation = useMutation(
		(id: string) => {
			return api.delete(`http://localhost:3001/api/v1/events/${id}`);
		},
		{
			onSuccess: (data) => {
				toast.success('Event deleted successfully');
				navigate(`/items/${itemid}`);
			},
			onError: (error) => {
				toast.error('Error deleting item');
			},
		},
	);

	const eventQuery = useQuery(
		`events-${eventid}`,
		() => {
			return api.get(`http://localhost:3001/api/v1/events/${eventid}`);
		},
		{
			onSuccess: (data) => {
				
			},
			onError: (error) => {
				toast.error('An error occured while fetching data');
			}
		},
	);
	const itemQuery = useQuery(
		`item-${itemid}`,
		() => {
			return api.get(`http://localhost:3001/api/v1/items/${itemid}`);
		},
		{
			onSuccess: (data) => {
				
			},
			onError: (error) => {
				toast.error('An error occured while fetching data');
			},
		},
	);

	if (itemQuery.isLoading || eventQuery.isLoading) {
		return <div>Loading...</div>;
	}

	if (itemQuery.isError || eventQuery.isError) {
		return <div>Error</div>;
	}

	const item = itemQuery.data?.data;
	const event = eventQuery.data?.data?.data;

	return (
		<div>
			<Card
				sx={{ maxWidth: '80vw', height: '80vh', margin: 'auto', mt: 4, p: 2 }}
			>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant="h4" gutterBottom align='left'>
								Item: {item.name}
							</Typography>
							<Divider />
						</Grid>
						{/* Left Column - Item Details */}
						<Grid item xs={12}>
							<Typography variant="h5" gutterBottom align='left'>
								Event Details
							</Typography>
							<Typography variant="body1" gutterBottom align='left'>
								Name: {event.name}
							</Typography>
							<Typography variant="body1" gutterBottom align='left'>
								Custodian: {event.custodian}
							</Typography>
							<Typography variant="body1" gutterBottom align='left'>
								Status: {event.status}
							</Typography>
							<Typography variant="body1" gutterBottom align='left'>
								Condition: {event.condition}
							</Typography>
							<Typography variant="body1" gutterBottom align='left'>
								Event Type: {event.eventType}
							</Typography>
							<Typography variant="body1" align='left'>
								Location: {event.location}
							</Typography>
							<Typography variant="body1" align='left'>
								Description: {event.description}
							</Typography>
							<Stack direction="row" spacing={2}>
								<Link to={`edit`}>
									<Button variant="contained">Edit</Button>
								</Link>
								<Button variant="contained" color="error" onClick={handleClose}>
									Delete
								</Button>
							</Stack>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<DeleteModal open={open} handleClose={handleClose} onDelete={onDelete} />
		</div>
	);
};

export default EventPage;
