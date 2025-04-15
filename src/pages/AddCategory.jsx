import {useState} from 'react'
import FetchService from '../services/FetchService.js'
import {useFetching} from "../hooks/useFetching.js";
import ValidationService from '../services/ValidationService.js'
import {CheckAuth} from '../components/CheckAuth';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading.jsx';

export function AddCategory() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
    });
    const [errMsg, setErrMsg] = useState('');
    const [isAuthorized, setIsAuthorized]  = useState(false);

    const [fetching, isLoading] = useFetching(async (dataToSend) => {
        return await FetchService.addCategory(dataToSend);
    });

    const submitHandle = (event) => {
        event.preventDefault();

        const ValidationData = ValidationService.addCategory(values);

        if (!ValidationData.status) {
            setErrMsg(ValidationData.errorMessage);
            return null;
        }
        setErrMsg('');

        proccessDataRes();
    }

    const proccessDataRes = async () => {
        const DataRes = await fetching(values);
        
        if (!DataRes.status) {
            setErrMsg(DataRes.msg);
            return null;
        }
        setErrMsg('');

        navigate('/adpn-categories');
    };

    return (<>
        <div className="content">
            <CheckAuth setIsAuthorized={setIsAuthorized}/>
            {isAuthorized &&
                <div className="add-category">
                    <h1 className="add-category__title">Добавить категорию</h1>
                    <span className="menu-main__category-line"></span>
                    <form 
                        action="#" 
                        className="add-category__form"
                        onSubmit={submitHandle}
                    >
                        <label htmlFor="add-category_name" className="add-category__label">Наименование</label>
                        <input 
                            name="add-category_name" 
                            id="add-category_name" 
                            type="text" 
                            className="add-category__input"
                            value={values.name} 
                            onChange={(e) => setValues({...values, name: e.target.value})}
                        />
                        <div className="add-category__submit-container">
                            <button className="add-category__submit">Сохранить</button>
                            {isLoading && <Loading/>}
                        </div>
                        <p className="add-category__err-msg">{errMsg}</p>
                    </form>
                </div>
            }
            {!isAuthorized && <Loading/>}
        </div>
    </>)
}