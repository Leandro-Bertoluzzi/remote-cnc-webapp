import { useState, useEffect } from 'react';
import UserCard from '../components/userCard';
import CardsList from '../components/cardsList';
import User from '../types/User';
import EmptyCard from '../components/emptyCard';
import config from '../config';

export default function UsersView() {
    // Hooks for state variables
    const [users, setUsers] = useState<User[]>([]);
    const { API_PORT, API_HOST } = config;

    /*  Function: updateUsers
    *   Description: Initializes the array of users to display
    */
    function updateUsers() {
        const apiBaseUrl = `http://${API_HOST}:${API_PORT}`;

        fetch(`${apiBaseUrl}/users`)
            .then((res) => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.log("Connection error: ", error.message);
            });
    }

    // Action to execute at the beginning
    useEffect(() => updateUsers(), []);

    return (
        <CardsList title="Usuarios">
            {users.length === 0 ? (
                <EmptyCard itemName="usuarios registrados" />
            ) : (
                    <>
                        {
                            users.map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))
                        }
                    </>
                )
            }
        </CardsList>
    )
}
