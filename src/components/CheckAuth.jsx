import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FetchService from '../services/FetchService';


export function CheckAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const AuthData = await FetchService.checkAuth();

        console.log(AuthData)

        if (!AuthData.status) {
            navigate('/adpn-login');
        }
    };

    return (<></>)
}