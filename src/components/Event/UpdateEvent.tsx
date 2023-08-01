import React from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/Api';
import { EventType } from '../../types/event';
import EventForm from './EventForm';

const UpdateEvent: React.FC = () => {
	const { eventid, itemid } = useParams<{ eventid: string; itemid: string }>();
	const navigate = useNavigate();
	const query = useQuery(
		`events-${eventid}`,
		() => {
			return api.get(`http://localhost:3001/api/v1/events/${eventid}`);
		},
		{
			onSuccess: (data) => {
			},
		},
	);
	const event = query.data?.data?.data;

	const mutation = useMutation(
		(eventData: Partial<EventType>) => {
			return api.patch(`http://localhost:3001/api/v1/events/${eventid}`, eventData);
		},
		{
			onSuccess: () => {
				toast.success('Event updated Successful!');
				navigate(`/items/${itemid}/events/${eventid}`);
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
		const eventData: Partial<EventType> = {
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
			<h2>Update Event</h2>
			<EventForm onSubmit={handleEventCreate} event={event} />
		</div>
	);
};

export default UpdateEvent;
