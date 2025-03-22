import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { People as PeopleIcon, TrendingUp as LeadsIcon } from '@mui/icons-material';

const Navigation = () => {
  return (
    <List>
      <ListItem button component={Link} to="/customers">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>
      <ListItem button component={Link} to="/leads">
        <ListItemIcon>
          <LeadsIcon />
        </ListItemIcon>
        <ListItemText primary="Leads" />
      </ListItem>
    </List>
  );
};