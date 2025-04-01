import {useState, useRef, useContext} from 'react'
import {AuthContext} from '../providers/AuthProvider.jsx';
import {PostCreaterSVG} from './PostCreaterSVG.jsx';
import {Popup} from './Popup.jsx';
import {ImageUpload} from './ImageUpload.jsx';
import {Input} from './Input.jsx';
import {Textarea} from './Textarea.jsx';
import { ColorButton } from './ColorButton.jsx';
import ValidationService from '../services/ValidationService.js';
import {useFetching} from "../hooks/useFetching.js";
import FetchService from '../services/FetchService.js';
import InterceptorService from '../services/InterceptorService.js';
import {Loading} from './Loading.jsx';

export function PostCreater(props) {
    const {authStatus, setAuthStatus} = useContext(AuthContext);
    const file = useRef(null);
    const [isPopupActive, setIsPopupActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [validationInfo, setValidationInfo] = useState({
        title: false, 
        desc: false
    });
    const [inputsValue, setInputsValue] = useState({
        title: '',
        desc: ''
    });

    const [fetching, isLoading] = useFetching(async (event) => {
        event.preventDefault();

        if (localStorage.getItem("authStatus") === "true") {
            // Проверяем введенные данные
            const tempValidationInfo = ValidationService.createPostValidation(inputsValue);
            //! ограничить символы.
            setValidationInfo(tempValidationInfo);
            console.log(tempValidationInfo)
            if (tempValidationInfo.status) {
                let formData = new FormData();

                if (file.current.files[0]) {
                    formData.append('file', file.current.files[0]);
                }
                formData.append('title', inputsValue.title);
                formData.append('desc', inputsValue.desc);

                let data = await InterceptorService.authInterceptor(async () => {
                    return await FetchService.createPost(formData);
                });

                console.log(data)
                
                
                if (!data.status) {
                    if (data.authErr) {
                        localStorage.setItem("authStatus", "false");
                        setAuthStatus(false);
                        setIsPopupActive(false);
                    } else {
                        setErrorMessage(data.data.message)
                    }
                } else {
                    setIsPopupActive(false);
                    //!
                }
            }
        }
    });

    const handleSubmit = (event) => {
        fetching(event);
    }

    const handleFocus = (event) => {
        setValidationInfo({
            title: false, 
            desc: false
        });
        setErrorMessage('');
    }

    return (
        <div className="post-creater">
            <div 
                className="post-creater__button"
                onClick={() => {setIsPopupActive(true)}}
            >
                <div className="post-creater__img">
                    <PostCreaterSVG></PostCreaterSVG>
                </div>
                <h2 className="post-creater__title">Создать пост</h2>
            </div>
            <Popup 
                isBgr={true} 
                className="post-creater__popup"
                status={isPopupActive}
                setStatus={setIsPopupActive}
            >
			    <h2 className="post-creater__inner-title">Создание поста</h2>
                <>{isLoading 
                ?
                    <Loading/>
                :
                    <form onSubmit={handleSubmit} className="post-creater__form" action="">
                        <ImageUpload 
                            className="post-creater__upload"
                            innerRef={file}/>
                        <label htmlFor="post_creater_title" className="post-creater__label">Заголовок</label>
                        <Input
                            id="post_creater_title"
                            placeholder={''}
                            inputValue={inputsValue.title}
                            setInputValue={value => setInputsValue({...inputsValue, title: value})}
                            onChange={handleFocus}
                            className={`post-creater__input  ${validationInfo.title ? '_error' : ''}`}
                        ></Input>
                        <label htmlFor="post_creater_desc" className="post-creater__label">Описание</label>
                        <Textarea
                            id="post_creater_desc"
                            placeholder={''}
                            inputValue={inputsValue.desc}
                            setInputValue={value => setInputsValue({...inputsValue, desc: value})}
                            onChange={handleFocus}
                            className={`post-creater__textarea  ${validationInfo.desc ? '_error' : ''}`}
                        />
                        <div className="post-creater__info">
                            <ColorButton
                                className="post-creater__submit"
                                type="submit"
                            >
                                Изменить
                            </ColorButton>
                            <p className="post-creater__error">{errorMessage}</p>
                        </div>
                        
                    </form>
                }</>
            </Popup>
        </div>
    )
}