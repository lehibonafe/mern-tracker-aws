import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Section, Heading, Card, Columns } from 'react-bulma-components'

const TaskUpdatePage = (props) => {
    const [teams, setTeams] = useState([])
	const [task, setTask] = useState();
    const id = props.match.params.id

    useEffect(() => {
        getTeams();
        getTask(id);
    }, [id]);

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

    const getTask = async (id) => {
        const url = `${process.env.REACT_APP_API_URL}/tasks/${id}`
        await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            setTask(data.Item)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    let form = <i>Loading form...</i>

    if (typeof task != 'undefined') {
        form = <TaskUpdateForm teams={ teams } task={ task }/>
    }

    const sectionStyle = {
        paddingTop: '15px',
        paddingBottom: '15px'
    }

    return (
        <Section style={ sectionStyle }>
            <Columns>
                <Columns.Column size="half" offset="one-quarter">
                    <Heading>Update Task</Heading>
                    <Card>
                        <Card.Header>
                            <Card.Header.Title>Task Details</Card.Header.Title>
                        </Card.Header>
                        <Card.Content>
                            { form }
                        </Card.Content>
                    </Card>
                </Columns.Column>
            </Columns>
        </Section>
    )
}

const TaskUpdateForm = (props) => {
    const [description, setDescription] = useState(props.task.description)
    const [teamId, setTeamId] = useState(props.task.teamId)

    const populateTeamOptions = () => {
        let teams = props.teams

        if (typeof teams == 'undefined') {
            return <option>Loading teams...</option>
        } else {
            return teams.map((team) => {
                return <option key={ team.id } value={ team.id }>{ team.name }</option>
            })
        }
    }

    const updateTask = async (e) => {
        e.preventDefault()

        const id = props.task.id
        const url = `${process.env.REACT_APP_API_URL}/tasks/${id}`

        const data = {
            id: props.task.id,
            description: description,
            teamId: teamId,
        }

        await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((response) => {
            let result = response.ok
            if (result) {
                Swal.fire({ 
                    title: 'Task Updated', 
                    text: 'The task has been updated.', 
                    type: 'success' 
                }).then(() => {
                    window.location.href = '/tasks'
                })
            } else {
                Swal.fire({ 
                    title: 'Operation Failed', 
                    text: 'The server encountered an error, try again.', 
                    type: 'error' 
                })
            }
        })
    }

    return (
        <form onSubmit={ (e) => updateTask(e) }>
            Description
            <input className="input" value={ description } onChange={ (e) => setDescription(e.target.value) } required/><br/><br/>
            Team
            <div className="select is-fullwidth">
                <select value={ teamId } onChange={ (e) => setTeamId(e.target.value) } required>
                    <option value='default' disabled>Select Team</option>
                    { populateTeamOptions() }
                </select>
            </div><br/><br/>
            <button type="submit" className="button is-success">Update</button>&nbsp;
            <Link to="/tasks"><button type="button" className="button is-warning">Cancel</button></Link>
        </form>
    )
}

export default TaskUpdatePage
