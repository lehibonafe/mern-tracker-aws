import React, { useState } from 'react'
import Swal from 'sweetalert2'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Card } from 'react-bulma-components'

const TaskAdd = (props) => {
    const [description, setDescription] = useState('')
    const [teamId, setTeamId] = useState(undefined)

    const populateTeamOptions = () => {
        if (props.teams) {
            return props.teams.map((team) => {
                return <option key={ team.id } value={ team.id }>{ team.name }</option>
            })
        }
    }

    const addTask = (e) => {
        e.preventDefault()

        const newTask = {
            teamId: teamId,
            description: description
        }

        props.addTask(newTask)
        Swal.fire({ 
            title: 'Task Added', 
            text: 'The task has been added.', 
            type: 'success' 
        })
    }

    return (
        <Card>
            <Card.Header>
                <Card.Header.Title>Add Task</Card.Header.Title>
            </Card.Header>
            <Card.Content>
                <form onSubmit={ (e) => addTask(e) }>
                    Task Description
                    <input className="input" value={ description } onChange={ (e) => setDescription(e.target.value) } required/><br/><br/>
                    Team
                    <div className="select is-fullwidth">
                        <select defaultValue='default' value={ teamId } onChange={ (e) => setTeamId(e.target.value) } required>
                            <option value='default' disabled>Select Team</option>
                            { populateTeamOptions() }
                        </select>
                    </div><br/><br/>
                    <button type="submit" className="button is-success">Add</button>
                </form>
            </Card.Content>
        </Card>
    )
}

export default TaskAdd
