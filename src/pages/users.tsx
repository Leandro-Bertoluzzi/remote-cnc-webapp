import UserCard from '../components/userCard';
import CardsList from '../components/cardsList';
import User from '../types/User';

const users: User[] = [
    {
        id: 1,
        name: 'Testing admin',
        email: 'testingadmin@test.com',
        role: 'admin',
    },
    {
        id: 2,
        name: 'Fulano Mengano',
        email: 'fulano.mengano@test.com',
        role: 'user',
    },
    {
        id: 3,
        name: 'Testing user 1',
        email: 'testinguser1@test.com',
        role: 'user',
    },
    {
        id: 4,
        name: 'Testing user 2',
        email: 'testinguser2@test.com',
        role: 'user',
    },
]

export default function UsersView() {
    return (
        <CardsList title="Usuarios">
            <div className="flex flex-wrap -m-3">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
            {users.length === 0 &&
                <div className="flex flex-wrap -m-3">
                    There are no users
                </div>
            }
        </CardsList>
    )
}
