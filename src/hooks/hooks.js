import React, {useState, useEffect} from 'react'
import firebase from '../Firebase/Firebase';

export default function useProjects(){
	const [projects, setProjects] = useState([])
	
	useEffect(() => {
		firebase
		.firestore()
		.collection('projects')
		.onSnapshot(snapshot => {
			const assignments = snapshot.docs.map(doc => ({
				id:doc.id,
				...doc.data(),
			}))
			setProjects(assignments)
		})
	},[])

	return projects
}

export function useTasks(id){
	const [tasks, setTasks] = useState([])
    const db = firebase.firestore()

    db.collection('projects').doc(id).onSnapshot(snapshot => {
    	const tasks = snapshot.data().tasks;
    	setTasks(tasks)
    })

    return tasks

}

