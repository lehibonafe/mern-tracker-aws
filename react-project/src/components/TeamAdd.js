import React, { useState } from 'react'
import Swal from 'sweetalert2'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Card } from 'react-bulma-components'

const TeamAdd = (props) => {
    const [teamName, setTeamName] = useState('')

    const addTeam = (e) => {
        e.preventDefault()
        props.addTeam(teamName)
        Swal.fire({ 
            title: 'Team Added', 
            text: 'The team has been added.', 
            type: 'success' 
        })
    }

    return (
        <Card>
            <Card.Header>
                <Card.Header.Title>Add Team</Card.Header.Title>
            </Card.Header>
            <Card.Content>
                <form onSubmit={ (e) => addTeam(e) }>
                    Name
                    <input className="input" value={ teamName } onChange={ (e) => setTeamName(e.target.value) }/><br/><br/>
                    <button type="submit" className="button is-success">Add</button>
                </form>
            </Card.Content>
        </Card>
    )
}

export default TeamAdd