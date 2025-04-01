import {useContext, useState} from 'react'
import ValidationService from '../services/ValidationService.js'
import FetchService from '../services/FetchService.js'
import {useFetching} from "../hooks/useFetching.js";
import { Loading } from './Loading.jsx';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        login: '',
        password: '',
    });
    const [errMsg, setErrMsg] = useState('');

    const submitHandle = (event) => {
        event.preventDefault();

        const ValidationData = ValidationService.login(values);

        if (!ValidationData.status) {
            setErrMsg(ValidationData.errorMessage);
            return null;
        }
        setErrMsg('');

        proccessDataRes();
    }

    const proccessDataRes = async () => {
        const DataRes = await fetching();
        
        if (!DataRes.status) {
            setErrMsg(DataRes.msg);
            return null;
        }
        setErrMsg('');

        navigate('/adpn')        
    };

    const [fetching, isLoading] = useFetching(async () => {
        return await FetchService.login(values);
    })

    return (<>
        <div className="login">
            <h1 className="add-product__title login__title ">Войти</h1>
            <span className="menu-main__category-line"></span>
            <form 
                action="#" 
                className="add-product__form login__form"
                onSubmit={submitHandle}
            >
                <label htmlFor="add_product_name" className="add-product__label login__label">Логин</label>
                <input 
                    name="add_product_name" 
                    id="add_product_name" 
                    type="text" className="add-product__input login__input"
                    value={values.login} 
                    onChange={(e) => setValues({...values, login: e.target.value})}
                />
                <label htmlFor="add_product_weight" className="add-product__label login__label">Пароль</label>
                <input 
                    name="add_product_weight" 
                    id="add_product_weight" 
                    type="password" 
                    className="add-product__input login__input"
                    value={values.password} 
                    onChange={(e) => setValues({...values, password: e.target.value})} 
                />
                <div className="login__submit-container">
                    <button className="add-product__submit login__submit">Войти</button>
                    {isLoading && <Loading/>}
                </div>
                <p className="add-product__err-msg login__err-msg">{errMsg}</p>
            </form>
        </div>
    </>)
}