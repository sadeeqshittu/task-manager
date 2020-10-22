import React from 'react';
import {AppBar} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles'
import {Toolbar} from '@material-ui/core'
import  IconButton  from '@material-ui/core/IconButton'

const drawerWidth = 240;
const useStyles = makeStyles({
	menuButton: {
		marginRight: 2,
	},
	title: {
	   flexGrow: 1,
	},
	appbar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
	}
	
	

})

function Nav(props){
	const classes = useStyles();
	return(
		  <AppBar position="static" className={classes.appbar}>
             <Toolbar>
               <IconButton edge="start" color="inherit" className={classes.menuButton}>
                   <MenuIcon />
               </IconButton>
                <Typography variant="h6" className={classes.title}>
		           Todoist
		       </Typography>
             </Toolbar>
		  </AppBar>
		)
}

export default Nav;