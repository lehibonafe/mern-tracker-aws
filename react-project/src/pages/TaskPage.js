import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'

import TaskAdd from '../components/TaskAdd'
import TaskList from '../components/TaskList'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Section, Heading, Columns } from 'react-bulma-components'

const TaskPage = (props) => {
    const [teams, setTeams] = useState([])
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTeams();
        getTasks();
    }, []);

    const getTeams = async () => {
        const url = `${process.env.REACT_APP_API_URL}/teams`
        await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            setTeams(data.Items)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const getTasks = async () => {
        const url = `${process.env.REACT_APP_API_URL}/tasks`
        await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            setTasks(data.Items)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const addTask = async (newTask) => {
        const url = `${process.env.REACT_APP_API_URL}/tasks`
        const data = newTask
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          getTasks();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    const deleteTask = async (id) => {
        const url = `${process.env.REACT_APP_API_URL}/tasks/${id}`
        await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            let result = response.ok;
            if (result) {
                Swal.fire({ 
                    title: 'Task Deleted', 
                    text: 'The task has been deleted.', 
                    type: 'success' 
                })
                getTasks()
            } else {
                Swal.fire({ 
                    title: 'Operation Failed', 
                    text: 'The server encountered an error, try again.', 
                    type: 'error' 
                })
            }
        })
    }

    const sectionStyle = {
        paddingTop: '15px',
        paddingBottom: '15px'
    }

    return (
        <Section style={ sectionStyle }>
            <Heading>Tasks</Heading>
            <Columns>
                <Columns.Column size={ 3 }>
                    <TaskAdd addTask={ addTask } teams={ teams }/>
                </Columns.Column>
                <Columns.Column size={ 9 }>
                    <TaskList tasks={ tasks } teams={ teams } deleteTask={ deleteTask }/>
                </Columns.Column>
            </Columns>
        </Section>
    )
}

export default TaskPage
