import React, {useState, useContext} from 'react'
import {AuthContext} from '../providers/AuthProvider.jsx';
import { Popup } from './Popup.jsx'
import { Input } from './Input.jsx'
import { ColorButton } from './ColorButton.jsx'
import {useFetching} from "../hooks/useFetching.js";
import { Loading } from './Loading.jsx';

export function AuthForm(props) {   
    const {authStatus, setAuthStatus} = useContext(AuthContext);
    const [inputs, setInputs] = useState(props.inputsData.reduce((accumulator, currentValue) => {
        accumulator[currentValue.name] = '';
        return accumulator;
    }, {}));

    const [validationInfo, setValidationInfo] = useState({
        errorMessage: '',
        errorInputs: [],
        status: false
    });
    const [fetching, isLoading] = useFetching(async (event) => {
        event.preventDefault();

        // Проверяем введенные данные
        const tempValidationInfo = props.validationCallback(inputs);
        setValidationInfo(tempValidationInfo);

        if (tempValidationInfo.status) {

            // Проверяем верность введенного кода
            await props.fetchCallback(inputs)
            .then(data => {
                if (!data.status) {
                    setValidationInfo({...validationInfo, errorMessage: data.message});
                } else {
                    // Отрисовываем вход
                    localStorage.setItem("authStatus", "true");
                    localStorage.setItem("accessToken", data.accessToken);
                    setAuthStatus(true);
                    props.setPopupStatus(false);             
                }
            })
            // Ошибка проверки кода
            .catch(() => setValidationInfo({...validationInfo, errorMessage: 'Непредвиденная ошибка'}));
        }
    })
    const submitHandle = async (event) => {
        fetching(event);
    }
    const focusHandle = () => {
        setValidationInfo(
            {
                errorMessage: '',
                errorInputs: []
            }
        );
    }

    return (
        <>
            <Popup 
                isBgr={true} 
                className="reg__popup"
                status={props.popupStatus}
                setStatus={props.setPopupStatus}
            >
                <h2 className="reg__title">{props.title}</h2>
                {!isLoading 
                ? 
                    <form 
                        action="#" 
                        className="reg__form"
                        onSubmit={submitHandle}
                    >
                        {props.inputsData.map(inputData => 
                            <>
                                <label key={inputData.name + '_label'} htmlFor={`reg_${inputData.name}`} className={`reg__label reg__label-${inputData.name}`}>{inputData.label}</label>
                                <Input 
                                    key={inputData.name + '_input'}
                                    className={`reg__input reg__${inputData.name} ${validationInfo.errorInputs.indexOf(inputData.name) != -1 ? '_error' : ''}`}
                                    id={`reg_${inputData.name}`}
                                    type={inputData.type}
                                    inputValue={inputs[inputData.name]}
                                    setInputValue={value => setInputs({...inputs, [inputData.name]: value})}
                                    onChange={focusHandle}
                                    onFocus={focusHandle}
                                ></Input>
                            </>
                        )}

                        <p className="reg__error">{validationInfo.errorMessage}</p>
                        <ColorButton className="reg__submit" type="submit">Создать</ColorButton>
                    </form>
                :
                <Loading></Loading>
                }
            </Popup>
            
        </>
    )
}
