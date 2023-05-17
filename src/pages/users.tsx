import { useState, useEffect } from 'react';
import apiRequest from '../services/apiService';
import CardsList from '../components/cardsList';
import EmptyCard from '../components/emptyCard';
import User from '../types/User';
import UserCard from '../components/userCard';

export default function UsersView() {
    // Hooks for state variables
    const [users, setUsers] = useState<User[]>([]);

    // Action to execute at the beginning
    useEffect(() => {
        apiRequest('users', 'GET')
        .then(data => {
            setUsers(data);
        })
        .catch(error => {
            console.log("Connection error: ", error.message);
        });
    }, []);

    return (
        <CardsList title="Usuarios" addItemBtnText="Agregar usuario" showAddItemBtn>
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
