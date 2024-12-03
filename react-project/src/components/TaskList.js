import React from 'react'
import { Link } from 'react-router-dom'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Card } from 'react-bulma-components'

const TaskList = (props) => {
    let rows = ''

    if (typeof props.tasks === 'undefined' || props.tasks.length === 0) {
        rows = (
            <tr>
                <td colSpan="3"><i>No tasks found.</i></td>
            </tr>
        )
    } else {
        rows = props.tasks.map((task) => {
            if (props.teams) {
                const team = props.teams.find(team => {
                    return team.id === task.teamId
                })
                return <TaskRow task={ task } team={ team } key={ task.id } deleteTask={ props.deleteTask }/>
            }
            return <TaskRow task={ task } key={ task.id } deleteTask={ props.deleteTask }/>
        })
    }

    return (
        <Card>
            <Card.Header>
                <Card.Header.Title>Task List</Card.Header.Title>
            </Card.Header>
            <Card.Content>
                <div className="table-container">
                    <table className="table is-fullwidth is-bordered">
                        <thead>
                            <tr>
                                <th>Task Description</th>
                                <th>Assigned Team</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { rows }
                        </tbody>
                    </table>
                </div>
            </Card.Content>
        </Card>
    )
}

const TaskRow = (props) => {
    const task = props.task
    let teamName = ''
    if (props.team) {
        teamName = props.team.name
    }

    return (
        <tr key={ task.id }>
            <td>{ task.description }</td>
            <td>{ teamName }</td>
            <td>
                <Link to={ "/task/update/" + task.id }><button className="button is-link">Update</button></Link>&nbsp;
                <button className="button is-danger" onClick={ () => props.deleteTask(task.id) }>Remove</button>
            </td>
        </tr>
    )
}

export default TaskList