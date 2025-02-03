import React from 'react';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

const Profile = () => {
    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-6'>User Profile</h1>
            <UpdateUser />
            <hr className='my-6' />
            <DeleteUser />
        </div>
    );
};

export default Profile;