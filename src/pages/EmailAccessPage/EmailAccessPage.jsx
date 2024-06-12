import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const email = searchParams.get('email');
        const code = searchParams.get('code');

        if (!email || !code) {
            console.error('Email or code is missing from the URL parameters.');
            return;
        }

        axios.post(`/api/user/verify_email?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`)
            .then(response => {
                const { location, msg, emailcheckSuccess } = response.data;
                alert(msg); // Display the message to the user

                if (emailcheckSuccess) {
                    console.log('Email verification successful.');
                } else {
                    console.log('Email verification failed.');
                }

                navigate(location);
            })
            .catch(error => {
                console.error('Error during email verification:', error);
            });
    }, [location.search, navigate]);

    return (
        <div>
            Verifying your email...
        </div>
    );
};

export default VerifyEmail;