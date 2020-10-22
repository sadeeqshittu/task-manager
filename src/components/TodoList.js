import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List} from '@material-ui/core';
import {ListItem} from '@material-ui/core';
import {ListItemText} from '@material-ui/core';
import {Checkbox} from '@material-ui/core'
import {ListItemIcon} from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Divider} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import firebase from '../Firebase/Firebase';


function TodoList(props){
	const[checked, setChecked] = useState(false)
    const items = props.Todos;
    
    const deleteTodo = (id) => {
    	props.removeTodo(id)
    }

    const toggleCheckBox = () => {

    }

    const handleInputChange = (event) => {
    	for(const each of items){
    		if (each.id == event.target.value){
    			each.completed = event.target.checked;
    		}
    	}
    	props.markComplete(items)
    }

	const listItem = items.map((item) =>(
		<div key={item.id}>
		<ListItem key={item.id} >
		   <ListItemIcon>
		       <Checkbox
		        value={item.id}
                onChange={handleInputChange}
                checked={item.checked}
		       />
		   </ListItemIcon>
		    <ListItemText>{item.name}</ListItemText>
		    <ListItemIcon>
		       <IconButton onClick={(e)=> deleteTodo(item.id)}>
		           <DeleteIcon  />
		       </IconButton>
		    </ListItemIcon>
		</ListItem>
		<Divider />
		</div>
	))
	
	return (
		<List>{listItem}</List>
	)
}

export default TodoList;