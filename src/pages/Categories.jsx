import DeleteIcon from '../assets/bin.png';
import React, { useState, useEffect } from 'react';
import {useFetching} from "../hooks/useFetching.js";
import { useNavigate } from 'react-router-dom';
import {CheckAuth} from '../components/CheckAuth';
import FetchService from '../services/FetchService.js';
import { Loading } from '../components/Loading.jsx';
import { Popup } from '../components/Popup.jsx';

export function Categories() {
    const navigate = useNavigate();
        const [categories, setCategories] = useState([]);
        const [categoriesAll, setCategoriesAll] = useState([]);
        const [isAuthorized, setIsAuthorized]  = useState(false);
        const [isError, setIsError]  = useState(false);
        const [searchValue, setSearchValue] = useState('');
        const [popupAlertStatus, setPopupAlertStatus] = useState(false);
        const [currentDeleteItem, setCurrentDeleteItem] = useState(-1);
    
        const [fetchingDelete, isLoadingDelete] = useFetching(async (dataToSend) => {
            return await FetchService.deleteCategory(dataToSend);
        })
        const [fetchingFill, isLoadingFill] = useFetching(async () => {
            return await FetchService.getCategories();
        })
    
        useEffect(() => {
            fillCategories();
        }, []);
    
        const fillCategories = async () => {
            const ResData = await fetchingFill();
            
            if (ResData.status) {
                setCategoriesAll(ResData.data);
                setIsError(false);
            } else {
                setIsError(true);
            }
        }
    
        useEffect(() => {
            fillCategoriesState();
        }, [categoriesAll, searchValue]);
    
        const fillCategoriesState = () => {
            if (!searchValue) {
                setCategories([...categoriesAll]);
            } else {
                setCategories(categoriesAll.filter(item =>
                    item.name.toLowerCase().includes(searchValue.toLowerCase())
                ));
            }
        };
    
        const deleteHandle = async (id) => {
            setCurrentDeleteItem(id);
            setPopupAlertStatus(true);
        }
    
        const deleteCategory = async () => {
            const ID = currentDeleteItem;
            const ResData = await fetchingDelete({id: ID});
            
            if (ResData.status) {
                setCategoriesAll([...categoriesAll].filter(item => item.id !== ID));
                setIsError(false);
                setCurrentDeleteItem(-1);
                setPopupAlertStatus(false);
            } else {
                setIsError(true);
            }
        }
    
        const categoryClickHandle = async (event, id) => {
            if (!event.target.closest('.categories__delete')) {
                navigate(`/adpn-category-set/${id}`);
            }
        }
    
    return (<>
        <div className="content">
            <CheckAuth setIsAuthorized={setIsAuthorized}/>
            <Popup
                className="product-list__popup"
                status={popupAlertStatus}
                setStatus={setPopupAlertStatus}
                isBgr={true}
            >
                <div className="product-list__delete-alert-container">
                    <p className="product-list__delete-alert">Вы точно хотите удалить запись ?</p>
                    <button 
                        className="product-list__delete-alert-btn"
                        onClick={deleteCategory}
                        type="button"
                    >Удалить</button>
                </div>
            </Popup>
            {isAuthorized &&
                <div className="categories">
                    <h1 className="categories__title">Категории</h1>
                    <span className="menu-main__category-line"></span>
                    <div className="categories__top-container">
                        <div className="categories__top-container-left">
                            <button 
                                type="button" 
                                className="categories__add"
                                onClick={() => navigate('/adpn-categories-add')}
                            >Добавить</button>
                        </div>
                        <div className="categories__top-container-right">
                            <input 
                                className="categories__search" 
                                type="text" 
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            {isLoadingDelete && <Loading/>}
                            {isLoadingFill && <Loading/>}
                            {isError && <p className="categories__error-top">Ошибка!</p>}
                        </div>
                    </div>
                    <div className="categories__list">
                        {categories.map((category) => (
                            <div 
                                className="categories__item"
                                key={category.id}
                                onClick={(event) => categoryClickHandle(event, category.id)}
                            >
                                <h3 className="categories__item-title">{(category.name.length > 25) ? (category.name.substring(0, 25).trim() + '...') : category.name}</h3>
                                <button
                                    className="categories__delete"
                                    onClick={() => deleteHandle(category.id)}
                                >
                                    <img src={DeleteIcon} alt="" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {!isAuthorized && <Loading/>}
        </div>
    </>);
}