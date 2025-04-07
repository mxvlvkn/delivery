import DeleteIcon from '../assets/bin.png';
import React, { useState, useEffect } from 'react';
import {useFetching} from "../hooks/useFetching.js";
import { useNavigate } from 'react-router-dom';
import {CheckAuth} from '../components/CheckAuth';
import FetchService from '../services/FetchService.js';
import { Loading } from '../components/Loading.jsx';

export const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [productsAll, setProductsAll] = useState([]);
    const [isAuthorized, setIsAuthorized]  = useState(false);
    const [isError, setIsError]  = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const [fetchingDelete, isLoadingDelete] = useFetching(async (dataToSend) => {
        return await FetchService.deleteProduct(dataToSend);
    })
    const [fetchingFill, isLoadingFill] = useFetching(async () => {
        return await FetchService.getProducts();
    })

    useEffect(() => {
        fillProducts();
    }, []);

    const fillProducts = async () => {
        const ResData = await fetchingFill();
        
        if (ResData.status) {
            setProductsAll(ResData.data);
            setIsError(false);
        } else {
            setIsError(true);
        }
    }

    useEffect(() => {
        console.log('YES')
        fillProductsState();
    }, [productsAll, searchValue]);

    const fillProductsState = () => {
        console.log(!searchValue)
        if (!searchValue) {
            console.log([...productsAll])
            setProducts([...productsAll]);
        } else {
            setProducts(productsAll.filter(item =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            ));
        }
    };

    const deleteHandle = async (id) => {
        const ResData = await fetchingDelete({id});
        
        if (ResData.status) {
            setProductsAll([...productsAll].filter(item => item.id !== id));
            setIsError(false);
        } else {
            setIsError(true);
        }
    }

    const productClickHandle = async (event, id) => {
        if (!event.target.closest('.product-list__delete')) {
            navigate(`/adpn-set/${id}`);
        }
    }

    return (<>
        <CheckAuth setIsAuthorized={setIsAuthorized}/>
        {isAuthorized &&
            <div className="product-list">
                <h1 className="product-list__title">Ассортимент</h1>
                <span className="menu-main__category-line"></span>
                <div className="product-list__top-container">
                    <div className="product-list__top-container-left">
                        <button 
                            type="button" 
                            className="product-list__add"
                            onClick={() => navigate('/adpn-add')}
                        >Добавить</button>
                        {isLoadingDelete && <Loading/>}
                        {isLoadingFill && <Loading/>}
                        {isError && <p className="product-list__error-top">Ошибка!</p>}
                    </div>
                    <div className="product-list__top-container-right">
                        <input 
                            className="product-list__search" 
                            type="text" 
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    
                </div>
                <table className="product-list__table">
                    <thead className="product-list__thead">
                        <tr className="product-list__tr">
                            <th className="product-list__th">Название</th>
                            <th className="product-list__th">Скидка</th>
                            <th className="product-list__th">Цена</th>
                            <th className="product-list__th">Цена со скидкой</th>
                            <th className="product-list__th">Описание</th>
                            <th className="product-list__th"></th>
                        </tr>
                    </thead>
                    <tbody className="product-list__tbody">
                    {products.map((product) => (
                        <tr 
                            className="product-list__tr product-list__tr-hover" 
                            key={product.id}
                            onClick={(event) => productClickHandle(event, product.id)}
                        >
                            <td className="product-list__td">{(product.name.length > 25) ? (product.name.substring(0, 25).trim() + '...') : product.name}</td>
                            <td className="product-list__td">{product.isSale ? 'Да' : 'Нет'}</td>
                            <td className="product-list__td">{product.price} ₽</td>
                            <td className="product-list__td">{product.isSale ? (product.salePrice + ' ₽') : '-'}</td>
                            <td className="product-list__td">{(product.desc.length > 25) ? (product.desc.substring(0, 25).trim() + '...') : product.desc}</td>
                            <td className="product-list__td">
                                <button
                                    className="product-list__delete"
                                    onClick={() => deleteHandle(product.id)}
                                >
                                <img src={DeleteIcon} alt="" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        }
        {!isAuthorized && <Loading/>}
    </>);
};