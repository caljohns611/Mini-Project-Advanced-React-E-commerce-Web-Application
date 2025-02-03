import React, { useState, useEffect } from 'react';

const UpdateUser = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://fakestoreapi.com/user/1", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setFormData({
                        username: data.username,
                        email: data.email,
                        password: "",
                    });
                } else {
                    setMessage("Failed to fetch user data.");
                }
            } catch (error) {
                setMessage("An error occurred. Please try again.");
            }
        };

        if (token) fetchUserData();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://fakestoreapi.com/user/1", {
                method: 'PUT',
                headers: {
                    "COntent-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setMessage("Profile updated successfully.");
            } else {
                setMessage("Failed to update profile. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className='p-4 max-w-md mx-auto'>
            <h2 className='text-xl font-bold mb-4'>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        className='w-full border p-2 rounded'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block mb-1'>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full border p-2 rounded'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block mb-1'>Password</label>
                    <input 
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='w-full border p-2 rounded'
                        required
                    />
                </div>
                <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
                    Update
                </button>
            </form>
            {message && <p className='mt-4'>{message}</p>}
        </div>
    );
};

export default UpdateUser;