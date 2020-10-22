import React, {useState,useContext, useEffect} from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles'
import { FormControl } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import {ListItemIcon, ListItemText} from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails,Typography, List, ListItem} from '@material-ui/core';
import {v4 as uuidv4} from 'uuid';
import { Link } from 'react-router-dom';
import {ProjectContext} from '../projectContext';
import firebase from '../Firebase/Firebase';
import useProjects from '../hooks/hooks'
import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'


const useStyles = makeStyles({
		root: {
			display: 'flex',
			flexDirection: 'column'
		}
	})


function Project(props){
	const classes = useStyles();
	const [projectName, setProjectName] = useState('');


	const handleChange = (event) => {
		setProjectName(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if(projectName.length > 0){
			addProject();
		}

		setProjectName('')
	}

	const addProject = () => {

		firebase
		.firestore()
		.collection('projects')
		.add({
			name:projectName,
			completed: false,
			tasks: []
		})
	}

	const projects = useProjects()

	const items = projects.map((item) => (
		<Link to={'/project/' + item.id} key={item.id} style={{color: 'inherit', textDecoration: 'none'}}>
		<ListItem>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText>{item.name}</ListItemText>
		</ListItem>
		</Link>
	))

	  

	useEffect(() => {
      
	},[])

	return(
		<Accordion TransitionProps={{unmountOnExit: true}}>
		   <AccordionSummary 
		   expandIcon={<ExpandMoreIcon/>}
		   aria-controls='panel1a-content'
		   >
           <Typography>Projects</Typography>
		   </AccordionSummary>
		   <AccordionDetails className={classes.root}>
		       <List>
		          {items}
		       </List>
		        <form onSubmit={handleSubmit}>
		           <FormControl>
		              <TextField label="add project" value={projectName} onChange={handleChange}/>
		           </FormControl>
		        </form>
		        <Fab color="primary" size="small">
		          <AddIcon/>
		        </Fab>
		   </AccordionDetails>
		</Accordion>
	)
}

export default Project
