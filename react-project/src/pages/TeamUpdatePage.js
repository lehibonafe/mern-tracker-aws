import React, {useState, useEffect} from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Section, Heading, Card, Columns } from 'react-bulma-components'

const TeamUpdatePage = (props) => {
    const [team, setTeam] = useState();
    const id = props.match.params.id

    useEffect(() => {
        getTeam(id);
    }, [id]);

    const getTeam = async (id) => {
        const url = `${process.env.REACT_APP_API_URL}/teams/${id}`
        await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            setTeam(data.Item)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    let form = <i>Loading form...</i>

    if (typeof team != 'undefined') {
        form = <TeamUpdateForm team={ team } updateTeamMutation={ props.updateTeamMutation }/>
    }

    const sectionStyle = {
        paddingTop: '15px',
        paddingBottom: '15px'
    }

    return (
        <Section style={ sectionStyle }>
            <Columns>
                <Columns.Column size="half" offset="one-quarter">
                    <Heading>Update Team</Heading>
                    <Card>
                        <Card.Header>
                            <Card.Header.Title>Team Details</Card.Header.Title>
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

const TeamUpdateForm = (props) => {
    const [name, setName] = useState(props.team.name)

    useEffect(() => {
        setName(props.team.name);
    }, [props.team.name]);

    const updateTeam = async (e) => {
        e.preventDefault()

        const id = props.team.id
        const url = `${process.env.REACT_APP_API_URL}/teams/${id}`
        const data = { name: name }

        await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((response) => {
            let result = response.ok
            if (result) {
                Swal.fire({ 
                    title: 'Team Updated', 
                    text: 'The team has been updated.', 
                    type: 'success' 
                }).then(() => {
                    window.location.href = '/teams'
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
        <form onSubmit={ (e) => updateTeam(e) }>
            Name
            <input className="input" value={ name } onChange={ (e) => setName(e.target.value) } required/><br/><br/>
            <button type="submit" className="button is-success">Update</button>&nbsp;
            <Link to="/teams"><button type="button" className="button is-warning">Cancel</button></Link>
        </form>
    )
}

export default TeamUpdatePage
