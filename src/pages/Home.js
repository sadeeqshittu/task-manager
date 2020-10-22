import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Nav from '../components/Nav';
import TodoList from '../components/TodoList';
import Sidebar from '../components/sidebar';
import { v4 as uuidv4 } from  'uuid';
import moment from 'moment'
import firebase from '../Firebase/Firebase'
import {Link} from 'react-router-dom';

const date = new Date()
const drawerWidth = 240;
const useStyles = makeStyles({
	root:{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		maxWidth: '960px',
		margin: '40px auto',
	},
	main: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
	}
})
function Home(props) {
	const classes = useStyles();
	const [task, setTask] = useState('')
    
    const handleChange = (event) => {
    	setTask(event.target.value)
    }

	const [todos, setTodos] = useState([])

	const handleSubmit = (event) => {
		event.preventDefault();
		if (task.length > 0 ){
			addTodo()
		}
        
        setTask('')
	}

	const addTodo = (() => {
		const todo = {
			id:uuidv4(),
			name: task,
			completed: false,
			date_created:moment().format('dddd MMMM Do'),
		}

		const db = firebase.firestore()

		db.collection('today').add({
			...todo
		})

		setTodos([todo, ...todos])
	})

	const removeTodo = ((id) => {
          const updated_todos = todos.filter((todo) => todo.id != id)
          setTodos(updated_todos);
          console.log(todos);
	})

	const getTodaysTasks = () => {
		const db = firebase.firestore()

		db.collection('today').where('date_created', '==', moment().format('dddd MMMM Do'))
		   .onSnapshot(snapshot => {
		   	  const tasks = snapshot.docs.map(doc => ({
		   	  	id: doc.id,
		   	  	...doc.data(),
		   	  }))
		   	  setTodos(tasks)
		   })
	}


   useEffect(() => {
   	   
       getTodaysTasks();
   }, [])

	return(
		<div>
		   <Nav />
		   <main className={classes.main}>
		   <Container className={classes.root}>
		   <div>
		      <h2>Today</h2>
		      <span style={{display: 'inline'}}>{moment().format('dddd MMMM Do')}</span>
		   </div>
		      <TodoList Todos ={todos}  removeTodo={removeTodo}/>
		       <form style={{width: '100%'}} onSubmit={handleSubmit}>
		       <FormControl>
                   <TextField label="Add task" value={task} onChange={handleChange} />
		       </FormControl>
		       </form>
		   </Container>
		   </main>
		   <Sidebar />
		</div>
	)
}


export default Home;