export interface EventType {
	id?: string;
	itemId: string;
	name: string;
	custodian: string;
	status: string;
	condition: string;
	eventType: string;
	location: string;
	description: string;
}

export interface DeleteModalProps {
	onDelete: () => void;
	open: boolean;
	handleClose: () => void;
}

export interface EventFormProps {
	onSubmit: (
		name: string,
		custodian: string,
		status: string,
		condition: string,
		eventType: string,
		location: string,
		description: string,
	) => void;
	event?: EventType;
}
