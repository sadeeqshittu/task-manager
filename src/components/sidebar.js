import React from 'react';
import {Drawer} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Project from './project'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	drawer: {
		width: 240,
		flexShrink: 0,
	},
	drawerContainer: {
		overflow: 'auto',
	},
	drawerPaper: {
		width: 240,
	}
})


function Sidebar(props){
   const classes = useStyles();
	return(
		<Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Inbox', 'Today', 'Upcoming'].map((text, index) => (
              <Link to={`/${text}/`} key={text} style={{textDecoration: 'none', color: 'inherit'}}>
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
              </Link>
            ))}
          </List>
             <Project />
        </div>
      </Drawer>
	)
}

export default Sidebar;