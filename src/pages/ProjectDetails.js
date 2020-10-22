import React, {useState, useContext, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, FormControl, TextField} from '@material-ui/core';
import TodoList from '../components/TodoList';
import Sidebar from '../components/sidebar';
import Nav from '../components/Nav';
import {useParams} from 'react-router-dom';
import  {ProjectContext} from '../projectContext';
import {v4 as uuidv4} from 'uuid';
import firebase from '../Firebase/Firebase';
import {useTasks} from '../hooks/hooks';


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

function ProjectDetail(prop){
	const classes = useStyles();
	const [projects] = useContext(ProjectContext);
	const [tasks, setTasks] = useState([])
	const [taskName, setTaskName] = useState();
	const [project, setProject] = useState()
    const params = useParams();

    
	const handleSubmit = (event) => {
		event.preventDefault();
        if (taskName.length > 0){
        	addTask(params.id);
        }
       
       setTaskName('');
	}

	const addTask = (id) => {
		let task = {
			id: uuidv4(),
			name:taskName,
			completed: false,
		}

		

		 firebase
		 .firestore()
		 .collection('projects')
		 .doc(id)
		 .update({
			tasks: firebase.firestore.FieldValue.arrayUnion(task)
		 })

	}

	const removeTodo = ((id) => {

          const updated_todos = tasks.filter((todo) => todo.id != id)
          setTasks(updated_todos);

          firebase
          .firestore()
          .collection('projects')
          .doc(params.id)
          .update({
          	tasks: tasks.filter((todo) => todo.id !=id)
          })
          .catch(error => {
          	 console.log('there was an error deleting task...')
          })
          
	})

	const markComplete = (markedTasks) => {
		const db = firebase.firestore()

		db.collection('projects').doc(params.id).update({
			tasks:markedTasks
		})

        
	}


	const getTasks = (id) => {
       const target = firebase.firestore().collection('projects').doc(id);

       if (target){
       	  target
       	  .get()
       	  .then(snapshot => {
       	  	 const tasks = snapshot.data().tasks;
       	  	 setTasks(tasks)
       	  })
       }
       	 
	}

	

	const handleChange = (event) => {
        setTaskName(event.target.value)
	}

	 
    const setTasksByProject = (id) => {
    	const db = firebase.firestore();

    	db.collection('projects').doc(id).onSnapshot(snapshot => {
    	const tasks = snapshot.data().tasks;
    	setTasks(tasks)
       })
    }
	 

	const getProject = (id) => {
		 firebase
		 .firestore()
		 .collection('projects')
		 .doc(id)
		 .get()
		 .then(snapshot => setProject(snapshot.data()))
		
	}

	 useEffect(() => {
	 	const object = getProject(params.id);
	 	setProject(object);
        getProject(params.id)
        setTasksByProject(params.id)

	 	
	 },[params.id])

	return(
		<div>
		   <Nav />
		   <main className={classes.main}>
		   <Container className={classes.root}>
		      <h2>{project ? project.name: ''}</h2>
		      <TodoList Todos={tasks} removeTodo={removeTodo} markComplete={markComplete}/>
		       <form style={{width: '100%'}} onSubmit={handleSubmit}>
		       <FormControl>
                   <TextField label="Add task" value={taskName} onChange={handleChange} />
		       </FormControl>
		       </form>
		   </Container>
		   </main>
		   <Sidebar />
		</div>
	)
	
}

export default ProjectDetail