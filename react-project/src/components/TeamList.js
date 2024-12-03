import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Card } from 'react-bulma-components'

const TeamList = (props) => {
    let rows = ''

    if (typeof props.teams === 'undefined' || props.teams.length === 0) {
        rows = (
            <tr>
                <td colSpan="2"><i>No teams found.</i></td>
            </tr>
        )
    } else {
        rows = props.teams.map((team) => {
            return (
                <tr key={ team.id }>
                    <td>{ team.name }</td>
                    <td>
                        <Link to={ "/team/update/" + team.id }><button className="button is-link">Update</button></Link>&nbsp;
                        <button className="button is-danger" onClick={ () => props.deleteTeam(team.id) }>Remove</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Card>
            <Card.Header>
                <Card.Header.Title>Team List</Card.Header.Title>
            </Card.Header>
            <Card.Content>
                <div className="table-container">
                    <table className="table is-fullwidth is-bordered">
                        <thead>
                            <tr>
                                <th>Team</th>
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

TeamList.propTypes = {
    teams: PropTypes.array
}

export default TeamList