import React, {useState, useContext} from 'react'
import { ColorContext } from '../providers/ColorProvider.jsx'
import { Popup } from './Popup.jsx'
import { Input } from './Input.jsx'
import { ColorButton } from './ColorButton.jsx'
import ColorService from '../services/ColorService.js';
import {useUpdateEffect} from '../hooks/useUpdateEffect.js';

export function ColorForm(props) {
    const [inputColorValue, setInputColorValue] = useState('');
    const [isInputError, setIsInputError] = useState(false);
    const [inputTpColorValue, setInputTpColorValue] = useState('#' + ColorService.getColorSave(localStorage.getItem("color")));
    const {color, setColor} = useContext(ColorContext);
    const [popupStatus, setPopupStatus] = useState(false);

    
    const submitHandle = (event) => {
        event.preventDefault();

        if (ColorService.colorValidation(inputColorValue)) {
            ColorService.setTheme(setColor, inputColorValue);
            localStorage.setItem("color", inputColorValue);
            if (inputColorValue.length === 6) {
                setInputTpColorValue('#' + inputColorValue);
            } else {
                setInputTpColorValue('#' + ColorService.convertToLongValue(inputColorValue));

            }
        } else {
            setIsInputError(true);
        }
    }
    const submitFocus = (event) => {
        setIsInputError(false);
    }

    useUpdateEffect(() => {
        if (ColorService.colorValidation(inputTpColorValue.slice(1))) {
            ColorService.setTheme(setColor, inputTpColorValue.slice(1));
            localStorage.setItem("color", inputTpColorValue.slice(1));
        }
    }, [inputTpColorValue]);

    return (
        <>
            <button 
                className="header__color"
                type="button"
                onClick={() => {
                    {setPopupStatus((popupStatus) ? false : true)}
                }}
            >
            </button>
            <Popup 
                isBgr={true} 
                className="color-form__popup"
                status={popupStatus}
                setStatus={setPopupStatus}
            >
                <h2 className="color-form__header">Цвет темы</h2>
                <form 
                    action=""
                    onSubmit={submitHandle}
                >
                    <label htmlFor="color_input" className="color-form__label">Цвет</label>
                    <Input
                        id="color_input"
                        placeholder={'E44DB4'}
                        inputValue={inputColorValue}
                        setInputValue={setInputColorValue}
                        onChange={submitFocus}
                        className={`color-form__input  ${isInputError ? '_error' : ''}`}
                    ></Input>
                    <input 
                        type="color" 
                        className="color-form__tp-color" 
                        onChange={(event) => {setInputTpColorValue(event.target.value)}}
                        value={inputTpColorValue}
                    />
                    <ColorButton
                        className="color-form__submit"
                        type="submit"
                    >
                        Изменить
                    </ColorButton>
                </form>
            </Popup>
            
        </>
    )
}
