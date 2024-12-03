import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'

import MemberAdd from '../components/MemberAdd'
import MemberList from '../components/MemberList'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Section, Heading, Columns } from 'react-bulma-components'

const MemberPage = (props) => {
    const [teams, setTeams] = useState([])
    const [members, setMembers] = useState([]);

    useEffect(() => {
        getTeams();
        getMembers();
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

    const getMembers = async () => {
        const url = `${process.env.REACT_APP_API_URL}/members`
        await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            setMembers(data.Items)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const addMember = async (newMember) => {
        const url = `${process.env.REACT_APP_API_URL}/members`
        const data = newMember
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          getMembers();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    const deleteMember = async (id) => {
        const url = `${process.env.REACT_APP_API_URL}/members/${id}`
        await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            let result = response.ok;
            if (result) {
                Swal.fire({ 
                    title: 'Member Deleted', 
                    text: 'The member has been deleted.', 
                    type: 'success' 
                })
                getMembers();
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
            <Heading>Members</Heading>
            <Columns>
                <Columns.Column size={ 3 }>
                    <MemberAdd addMember={ addMember } teams={ teams }/>
                </Columns.Column>
                <Columns.Column size={ 9 }>
                    <MemberList members={ members } teams={ teams } deleteMember={ deleteMember }/>
                </Columns.Column>
            </Columns>
        </Section>
    )
}

export default MemberPage
