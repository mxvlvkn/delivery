import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FetchService from '../services/FetchService';


export function CheckAuth({setIsAuthorized}) {
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        if (localStorage.getItem('login') === 'false') {
            navigate('/adpn-login');
        }

        const AuthData = await FetchService.checkAuth();
        if (!AuthData.status) {
            navigate('/adpn-login');
        } else {
            if (setIsAuthorized) {
                setIsAuthorized(true);
            }
        }
    };

    return (<></>)
}