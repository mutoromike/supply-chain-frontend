import {
	Stack,
	TextField,
	Button,
	MenuItem,
	Select,
} from '@mui/material';
import { EventFormProps } from '../../types/event';

const EventForm: React.FC<EventFormProps> = ({ onSubmit, event }) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			name: { value: string };
			custodian: { value: string };
			status: { value: string };
			condition: { value: string };
			eventType: { value: string };
			location: { value: string };
			description: { value: string };
		};
		const name = target.name.value;
		const custodian = target.custodian.value;
		const status = target.status.value;
		const condition = target.condition.value;
		const eventType = target.eventType.value;
		const location = target.location.value;
		const description = target.description.value;
		onSubmit(
			name,
			custodian,
			status,
			condition,
			eventType,
			location,
			description,
		);
	};
	return (
		<form onSubmit={handleSubmit}>
			<Stack spacing={2} alignItems="center">
				<TextField
					label="Event Name"
					type="text"
					name="name"
					defaultValue={event?.name}
					sx={{ width: '500px' }}
					variant="outlined"
				/>
				<TextField
					label="Custodian"
					type="text"
					name="custodian"
					defaultValue={event?.custodian}
					sx={{ width: '500px' }}
					variant="outlined"
				/>
				Event Status:
				<Select
					label="Status"
					name="status"
					defaultValue={event ? event?.status : 'Status'}
					sx={{ width: '500px', align: 'left' }}
					variant="outlined"
					placeholder="Status"
				>

					<MenuItem value="Pending">Pending</MenuItem>
					<MenuItem value="In-Progress">In-Progress</MenuItem>
					<MenuItem value="Completed">Completed</MenuItem>
					<MenuItem value="Cancelled">Cancelled</MenuItem>
				</Select>
				<TextField
					label="Condition"
					type="select"
					name="condition"
					defaultValue={event?.condition}
					sx={{ width: '500px' }}
					variant="outlined"
				/>
				Event Type:
				<Select
					label="Event Type"
					name="eventType"
					defaultValue={!!event ? event?.eventType : 'Event Type'}
					sx={{ width: '500px' }}
					variant="outlined"
				>
					<MenuItem value="Check-In">Check-In</MenuItem>
					<MenuItem value="Check-Out">Check-Out</MenuItem>
					<MenuItem value="Transfer">Transfer</MenuItem>
					<MenuItem value="Maintenance">Maintenance</MenuItem>
					<MenuItem value="Repair">Repair</MenuItem>
					<MenuItem value="Delivery">Delivery</MenuItem>
					<MenuItem value="Return">Return</MenuItem>
					<MenuItem value="Disposal">Disposal</MenuItem>
					<MenuItem value="Shipping">Shipping</MenuItem>
					<MenuItem value="Receiving">Receiving</MenuItem>
					<MenuItem value="Customs-Inspection">Customs-Inspection</MenuItem>
					<MenuItem value="Quarantine">Quarantine</MenuItem>
					<MenuItem value="Other">Other</MenuItem>
				</Select>
				<TextField
					label="Location"
					type="text"
					name="location"
					defaultValue={event?.location}
					sx={{ width: '500px' }}
					variant="outlined"
				/>
				<TextField
					label="Description"
					type="text"
					name="description"
					defaultValue={event?.description}
					sx={{ width: '500px' }}
					variant="outlined"
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					sx={{ width: '500px' }}
				>
					{`${!!event ? 'Update' : 'Create'} Event`}
				</Button>
			</Stack>
		</form>
	);
};

export default EventForm;
