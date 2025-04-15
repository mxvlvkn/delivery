import BackIcon from '../assets/back.png';
import PlusIcon from '../assets/plus.png';
import CrossIcon from '../assets/cross.png';
import {useEffect, useState} from 'react'
import FetchService from '../services/FetchService.js'
import {useFetching} from "../hooks/useFetching.js";
import ValidationService from '../services/ValidationService.js'
import {CheckAuth} from '../components/CheckAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../components/Loading.jsx';

export function SetCategory() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
    });
    const [errMsg, setErrMsg] = useState('');
    const [tableErrMsg, setTableErrMsg] = useState('');
    const [isAuthorized, setIsAuthorized]  = useState(false);
    const [tableViewStatusIsIncluded, setTableViewStatusIsIncluded] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [tableArr, setTableArr] = useState([]);
    const [includedProducts, setIncludedProducts] = useState([]);
    const [otherProducts, setOtherProducts] = useState([]);
    const { id } = useParams();
    const CATEGORY_ID = Number(id);

    const [fetchingFillFields, isLoadingFillFields] = useFetching(async (dataToSend) => {
        return await FetchService.getCategory(dataToSend);
    });

    const [fetchingSet, isLoadingSet] = useFetching(async (dataToSend) => {
        return await FetchService.setCategory(dataToSend);
    });

    const [fetchingAddProductToCategory, isLoadingAddProductToCategory] = useFetching(async (dataToSend) => {
        return await FetchService.addProductToCategory(dataToSend);
    });

    const [fetchingDeleteProductFromCategory, isLoadingDeleteProductFromCategory] = useFetching(async (dataToSend) => {
        return await FetchService.deleteProductFromCategory(dataToSend);
    });

    useEffect(() => {
        fillFields(CATEGORY_ID);
    }, []);

    useEffect(() => {
        setTableArr(
            tableViewStatusIsIncluded 
            ?
                [...includedProducts]
            :
                [...otherProducts]
        )
    }, [tableViewStatusIsIncluded]);

    useEffect(() => {
            fillProductsState();
        }, [includedProducts, otherProducts, searchValue, tableViewStatusIsIncluded]);
    
        const fillProductsState = () => {
            if (!searchValue) {
                setTableArr(
                    tableViewStatusIsIncluded 
                    ?
                        [...includedProducts]
                    :
                        [...otherProducts]
                )
            } else {
                setTableArr(
                    tableViewStatusIsIncluded 
                    ?
                        [...includedProducts].filter(item =>
                            item.name.toLowerCase().includes(searchValue.toLowerCase())
                        )
                    :
                        [...otherProducts].filter(item =>
                            item.name.toLowerCase().includes(searchValue.toLowerCase())
                        )
                )
            }
        };

    const fillFields = async (ID) => {
        const DataRes = await fetchingFillFields({ID});

        if (!DataRes.status) {
            setErrMsg(DataRes.msg);
            return null;
        }

        setValues({
            name: DataRes.data.name
        })
        setTableArr(
            tableViewStatusIsIncluded 
            ?
                [...DataRes.data.products]
            :
                [...DataRes.data.other]
        )
        setIncludedProducts(DataRes.data.products);
        setOtherProducts(DataRes.data.other)
    }

    const submitHandle = (event) => {
        event.preventDefault();

        const ValidationData = ValidationService.setCategory(values);

        if (!ValidationData.status) {
            setErrMsg(ValidationData.errorMessage);
            return null;
        }
        setErrMsg('');

        proccessDataRes();
    }

    const proccessDataRes = async () => {  
        const DataRes = await fetchingSet({id: CATEGORY_ID,  ...values});
        
        if (!DataRes.status) {
            setErrMsg(DataRes.msg);
            return null;
        }
        setErrMsg('');

        fillFields(CATEGORY_ID);
    };

    const productClickHandle = async (event, id) => {
        if (!event.target.closest('.product-list__delete')) {
            navigate(`/adpn-product-set/${id}?nav=categories_${CATEGORY_ID}`);
        }
    }

    const addProductToCategoryHandle = async (productID) => {
        const ResData = await fetchingAddProductToCategory({
            categoryID: CATEGORY_ID,
            productID
        })

        if (!ResData.status) {
            setTableErrMsg(ResData.msg);
            return null;
        }
        setTableErrMsg('');

        const AddedItem = otherProducts.find(item => item.id === productID);
        setIncludedProducts([AddedItem, ...includedProducts]);
        setOtherProducts(otherProducts.filter(item => item.id !== productID));
    }

    const deleteProductFromCategoryHandle = async (productID) => {
        const ResData = await fetchingDeleteProductFromCategory({
            categoryID: CATEGORY_ID,
            productID
        })

        if (!ResData.status) {
            setTableErrMsg(ResData.msg);
            return null;
        }
        setTableErrMsg('');

        const DeletedItem = includedProducts.find(item => item.id === productID);
        setOtherProducts([DeletedItem, ...otherProducts]);
        setIncludedProducts(includedProducts.filter(item => item.id !== productID));
    }

    return (<>
        <div className="content">
            <CheckAuth setIsAuthorized={setIsAuthorized}/>
            {isAuthorized &&
                <div className="add-category set-category">
                    <button 
                        className="set-category__back-btn"
                        onClick={() => navigate('/adpn-categories')}
                        type="button"
                    >
                        <div className="set-category__back-btn-img">
                            <img src={BackIcon} alt="" />
                        </div>
                        <p className="set-category__back-btn-title">Назад</p>
                    </button>
                    <h1 className="add-category__title">Изменить категорию</h1>
                    <span className="menu-main__category-line"></span>
                    <form 
                        action="#" 
                        className="add-category__form set-category__form"
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
                            {isLoadingSet && <Loading/>}
                        </div>
                        <p className="add-category__err-msg">{errMsg}</p>
                    </form>
                    <h1 className="add-category__title">Товары категории</h1>
                    <span className="menu-main__category-line"></span>
                    <div className="set-category__table-panel">
                        <div className="set-category__table-toggle">
                            <button 
                                type="button" 
                                className={`set-category__table-toggle-item ${tableViewStatusIsIncluded === true ? '_active' : ''}`}
                                onClick={() => setTableViewStatusIsIncluded(true)}
                            >В категории</button>
                            <p className="add-category__err-msg">{tableErrMsg}</p>
                            <button 
                                type="button" 
                                className={`set-category__table-toggle-item ${tableViewStatusIsIncluded === false ? '_active' : ''}`}
                                onClick={() => setTableViewStatusIsIncluded(false)}
                            >Вне категории</button>
                            {isLoadingAddProductToCategory && <Loading/>}
                            {isLoadingDeleteProductFromCategory && <Loading/>}
                        </div>
                        <div className="set-category__table-search">
                            <input 
                                className="product-list__search" 
                                type="text" 
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                    </div>
                    <table className="product-list__table set-category__table">
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
                        {tableArr.map((product) => (
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
                                        onClick={() => {
                                            if (tableViewStatusIsIncluded) deleteProductFromCategoryHandle(product.id);
                                            if (!tableViewStatusIsIncluded) addProductToCategoryHandle(product.id);
                                        }}
                                    >
                                        {!tableViewStatusIsIncluded &&
                                            <img src={PlusIcon} alt="" />
                                        }
                                        {tableViewStatusIsIncluded &&
                                            <img src={CrossIcon} alt="" />
                                        }
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            }
            {!isAuthorized && <Loading/>}
            {isLoadingFillFields && <Loading/>}
        </div>
    </>)
}