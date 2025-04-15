import React from 'react'
import { ItemCard } from '../components/ItemCard.jsx'
import {Navigation} from '../components/Navigation.jsx';
import {useEffect, useState} from 'react'
import FetchService from '../services/FetchService.js'
import {useFetching} from "../hooks/useFetching.js";
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../components/Loading.jsx';

export function MenuMain() {
    const [data, setData] = useState([]);
    const [titles, setTitles] = useState([]);
    const [getMenuErr, setGetMenuErr] = useState('');

    const [fetchingGetMenu, isLoadingGetMenu] = useFetching(async () => {
        return await FetchService.getMenu();
    });

    useEffect(() => {
        proccessData();
    }, []);

    useEffect(() => {
        setTitles(data.map(item => ({
            id: item.id, 
            name: item.name
        })));
    }, [data]);

    const proccessData = async () => {
        const ResData = await fetchingGetMenu();

        if (!ResData.status) {
            setGetMenuErr(ResData.msg);
            return null;
        }
        setGetMenuErr('');

        console.log(ResData.data)
        setData(ResData.data)
    };

    return (<>
        <p className="menu-main__err">{getMenuErr}</p>
        {!isLoadingGetMenu && <>
            <Navigation
                titles={[...titles]}
            />
            <div className="content">
                <h1 className="menu-main__title">МЕНЮ</h1>
                {(data || []).map((item) => (
                    <div key={item.id} id={item.id}>
                        <h2 className="menu-main__category-title">{item.name}</h2>
                        <span className="menu-main__category-line"></span>
                        <div className="menu-main__item-cards">
                            {item.products.map((product) => (
                                <ItemCard
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>}
        {isLoadingGetMenu && <Loading className="menu-main__loading" />}
    </>)
}