import React from 'react'
import { Link } from 'react-router-dom'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Card } from 'react-bulma-components'

const MemberList = (props) => {
    let rows = ''

    if (typeof props.members === 'undefined' || props.members.length === 0) {
        rows = (
            <tr>
                <td colSpan="4"><i>No members found.</i></td>
            </tr>
        )
    } else {
        rows = props.members.map((member) => {
            if (props.teams) {
                const team = props.teams.find(team => {
                    return team.id === member.teamId
                })
                return <MemberRow member={ member } team={ team } key={ member.id } deleteMember={ props.deleteMember }/>
            }
            return <MemberRow member={ member } key={ member.id } deleteMember={ props.deleteMember }/>
            
        })
    }

    return (
        <Card>
            <Card.Header>
                <Card.Header.Title>Member List</Card.Header.Title>
            </Card.Header>
            <Card.Content>
                <div className="table-container">
                    <table className="table is-fullwidth is-bordered">
                        <thead>
                            <tr>
                                <th>Member Name</th>
                                <th>Position</th>
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

const MemberRow = (props) => {
    const member = props.member
    let teamName = ''
    if (props.team) {
        teamName = props.team.name
    }

    return (
        <tr>
            <td>{ member.firstName + ' ' + member.lastName }</td>
            <td>{ member.position }</td>
            <td>{ teamName }</td>
            <td>
                <Link to={ "/member/update/" + props.member.id }><button className="button is-link">Update</button></Link>&nbsp;
                <button className="button is-danger" onClick={ () => props.deleteMember(member.id) }>Remove</button>
            </td>
        </tr>
    )
}

export default MemberList