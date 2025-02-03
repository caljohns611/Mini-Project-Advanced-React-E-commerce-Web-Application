import React, { useState } from 'react';

const UserLogin = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem('token', data.token);
                setMessage('Login successfully');
                onLogin(data.token);
            } else {
                setMessage('Invalid credentials. Please try again.');
            }
        } catch (error) {
            setMessage('An error ocurred. Please try again.');
        }
    };

    return (
        <div className='p-4 mx-w-md mx-auto'>
            <h2 className='text-ul font-bold mb-4'>Login</h2>
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
                <button type='submit' className='bg-green-500 text-white p-2 rounded'>
                    Login
                </button>
            </form>
            {message && <p className='mt-4'>{message}</p>}
        </div>
    );
};

export default UserLogin;