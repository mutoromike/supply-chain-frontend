import React from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/Api';
import { EventType } from '../../types/event';
import EventForm from './EventForm';

const CreateEvent: React.FC = () => {
	const navigate = useNavigate();
	const { itemid } = useParams<{ itemid: string }>();
	const mutation = useMutation(
		(eventData: EventType) => {
			return api.post('http://localhost:3001/api/v1/events', eventData);
		},
		{
			onSuccess: ({ data }) => {
				toast.success('Event Created Successful!');
				navigate(`/items/${itemid}/events/${data.data.id}`);
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

	const handleEventCreate = (
		name: string,
		custodian: string,
		status: string,
		condition: string,
		eventType: string,
		location: string,
		description: string,
	) => {
		const eventData: EventType = {
			itemId: itemid!,
			name,
			custodian,
			status,
			condition,
			eventType,
			location,
			description,
		};
		mutation.mutate(eventData);
	};

	return (
		<div>
			<h2>Create Event</h2>
			<EventForm onSubmit={handleEventCreate} />
		</div>
	);
};

export default CreateEvent;
