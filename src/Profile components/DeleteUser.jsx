import React, { useState } from 'react';

const DeleteUser = () => {
    const [message, setMessage] = useState("");
    const token = sessionStorage.getItem('token');

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this account? This cannot be undone."
        );
        if (confirmDelete) {
            try {
                const response = await fetch("https://fakestoreapi.com/user/1", {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    sessionStorage.clear();
                    setMessage("Account deleted successfully.");
                } else {
                    setMessage("Failed to delete account. Please try again.");
                }
            } catch (error) {
                setMessage("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className='p-4 max-w-md mx-auto'>
            <h2 className='text-xl font-bold-mb4'>Delete Account</h2>
            <button
                onClick={handleDelete}
                className='bg-red-500 text-white p-2 rounded'
            >
                Delete Account
            </button>
            {message && <p className='mt-4'>{message}</p>}
        </div>
    );
};

export default DeleteUser;