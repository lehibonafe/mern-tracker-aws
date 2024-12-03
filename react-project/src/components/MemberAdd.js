import React, { useState } from 'react'
import Swal from 'sweetalert2'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Card } from 'react-bulma-components'

const MemberAdd = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [position, setPosition] = useState('')
    const [teamId, setTeamId] = useState(undefined)

    const populateTeamOptions = () => {
        if (props.teams) {
            return props.teams.map((team) => {
                return <option key={ team.id } value={ team.id }>{ team.name }</option>
            })
        }
    }

    const addMember = (e) => {
        e.preventDefault()

        const newMember = {
            firstName: firstName,
            lastName: lastName,
            position: position,
            teamId: teamId
        }

        setFirstName('')
        setLastName('')
        setPosition('')
        setTeamId(undefined)

        props.addMember(newMember)
        Swal.fire({ 
            title: 'Member Added', 
            text: 'The member has been added.', 
            type: 'success' 
        })
    }

    return (
        <Card>
            <Card.Header>
                <Card.Header.Title>Add Member</Card.Header.Title>
            </Card.Header>
            <Card.Content>
                <form onSubmit={ (e) => addMember(e) }>
                    First Name
                    <input className="input" value={ firstName } onChange={ (e) => setFirstName(e.target.value) } required/><br/><br/>
                    Last Name
                    <input className="input" value={ lastName } onChange={ (e) => setLastName(e.target.value) } required/><br/><br/>
                    Position Name
                    <input className="input" value={ position } onChange={ (e) => setPosition(e.target.value) } required/><br/><br/>
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

export default MemberAdd
