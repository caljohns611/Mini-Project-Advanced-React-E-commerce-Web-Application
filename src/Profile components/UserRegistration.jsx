import React, { useState } from 'react';

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://fakestoreapi.com/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setMessage('User registered successfully');
                setFormData({ username: "", email: "", password: "" });
            } else {
                setMessage('Falied to register user. Please try again.');
            }
        } catch (error) {
            setMessage('An error ocurred. Please try again.');
        }
    };

    return (
        <div className='p-4 max-w-md mx-auto'>
            <h2 className='text-xl font-bold mb-4'>User Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block mb-1'>Username</label>
                    <input
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
                    Register
                </button>
            </form>
            {message && <p className='mt-4'>{message}</p>}
        </div>
    );
};

export default UserRegistration;