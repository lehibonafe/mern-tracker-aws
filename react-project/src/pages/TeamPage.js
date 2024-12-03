import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2'

import TeamAdd from '../components/TeamAdd'
import TeamList from '../components/TeamList'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Section, Heading, Columns } from 'react-bulma-components'

const TeamPage = (props) => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTeams();
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

    const addTeam = async (name) => {
        const url = `${process.env.REACT_APP_API_URL}/teams`
        const data = { name: name }
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          getTeams(setTeams);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    const deleteTeam = async (id) => {
        const url = `${process.env.REACT_APP_API_URL}/teams/${id}`
        await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            let result = response.ok;
            if (result) {
                Swal.fire({ 
                    title: 'Team Deleted', 
                    text: 'The team has been deleted.', 
                    type: 'success' 
                })
                getTeams(setTeams);
            } else {
                Swal.fire({ 
                    title: 'Operation Failed', 
                    text: 'The server encountered an error, try again.', 
                    type: 'error' 
                })
            }
        })
    }

    // const deleteTeam = (id) => {
    //     props.client.query({
    //         query: getTeamReferenceQuery,   
    //         variables: {
    //             id: id
    //         }
    //     }).then((response) => {
    //         const team = response.data.team
    //         const hasNoMembers = (team.members.length === 0)
    //         const hasNoTasks = team.tasks.length === 0

    //         if (hasNoMembers && hasNoTasks) {
    //             props.deleteTeamMutation({
    //                 variables: { 
    //                     id: id 
    //                 },
    //                 refetchQueries: [{ query: getTeams }]
    //             }).then((response) => {
    //                 let result = response.data.deleteTeam
    //                 if (result) {
    //                     Swal.fire({ 
    //                         title: 'Team Deleted', 
    //                         text: 'The team has been deleted.', 
    //                         type: 'success' 
    //                     })
    //                 } else {
    //                     Swal.fire({ 
    //                         title: 'Operation Failed', 
    //                         text: 'The server encountered an error, try again.', 
    //                         type: 'error' 
    //                     })
    //                 }
    //             })
    //         } else {
    //             Swal.fire({ 
    //                 title: 'Cannot remove team.', 
    //                 text: 'The team still has members and/or tasks.', 
    //                 type: 'error' 
    //             })
    //         }
    //     })
    // }

    const sectionStyle = {
        paddingTop: '15px',
        paddingBottom: '15px'
    }

    return (
        <Section style={ sectionStyle }>
            <Heading>Teams</Heading>
            <Columns>
                <Columns.Column size={ 3 }>
                    <TeamAdd addTeam={ addTeam }/>
                </Columns.Column>
                <Columns.Column size={ 9 }>
                    <TeamList teams={ teams } deleteTeam={ deleteTeam }/>
                </Columns.Column>
            </Columns>
        </Section>
    )
}

export default TeamPage;