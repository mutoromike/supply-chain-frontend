import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Typography,
	Stack,
	Button,
	Divider,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const ItemComponent = ({ item, onDeleteItem }: any) => {
	return (
		<div style={{ margin: '8px 0', display: 'flex' }}>
			<ListItem alignItems="flex-start" sx={{ display: 'flex' }}>
				<ListItemAvatar>
					<Avatar alt="Supply Chain Item" src="/static/images/item.jpg" />
				</ListItemAvatar>
				<ListItemText
					primary={item.name}
					secondary={
						<Stack>
							<Typography
								sx={{ display: 'inline' }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								SKU: {item.sku}
							</Typography>
							<Typography
								sx={{ display: 'inline' }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								Price: {item.price}
							</Typography>
							<Typography
								sx={{ display: 'inline' }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								Quantity: {item.quantity}
							</Typography>
							<Typography
								sx={{ display: 'inline' }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								Color: {item.color}
							</Typography>
							<Typography
								sx={{ display: 'inline' }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								Manufacturer: {item.manufacturer}
							</Typography>
							<Typography
								sx={{ display: 'inline' }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								Description: {item.description}
							</Typography>
							<Divider style={{ margin: '8px 0' }} />
							<Stack direction="row" spacing={2}>
								<Link to={`${item.id}`}>
									<Button variant="contained">Events</Button>
								</Link>
								<Link to={`${item.id}/edit`}>
									<Button variant="contained">Edit</Button>
								</Link>
								<Button
									variant="contained"
									color="error"
									onClick={() => onDeleteItem(item.id)}
								>
									Delete
								</Button>
							</Stack>
						</Stack>
					}
				/>
			</ListItem>
		</div>
	);
};

export default ItemComponent;
