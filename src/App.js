import {Route, Routes, useLocation} from 'react-router-dom'
import {MenuMain} from './pages/MenuMain.jsx'
import React, {useContext, useLayoutEffect} from 'react'
import ColorService from './services/ColorService.js';
import { ColorContext } from './providers/ColorProvider.jsx'
import { Header } from './components/Header.jsx';
import { AdminHeader } from './components/AdminHeader.jsx';
import { Footer } from './components/Footer.jsx';
import { ProductList } from './components/ProductList.jsx';
import { AddProduct } from './components/AddProduct.jsx';
import { Login } from './components/Login.jsx';

function App() {
    const location = useLocation();
    const {color, setColor} = useContext(ColorContext);

    const UrlsForUsers = [
        '/',
        '/menu',
    ]

    const UrlsForAdmins = [
        '/adpn',
        '/adpn-products',
        '/adpn-categories',
        '/adpn-orders', 
        '/adpn-add',
    ]

    useLayoutEffect(() => {
        ColorService.setTheme(setColor, localStorage.getItem("color"));
    }, []);

    console.log()

    return (
        <>
            {UrlsForUsers.includes(location.pathname) && <Header/>}
            {UrlsForAdmins.includes(location.pathname) && <AdminHeader/>}
            <main>
            <div className='content'>
                <Routes>
                <Route path="/" element={<MenuMain/>}/>
                <Route path="/menu" element={<MenuMain/>}/>
                <Route path="/adpn" element={<ProductList/>}/>
                <Route path="/adpn-products" element={<ProductList/>}/>
                <Route path="/adpn-add" element={<AddProduct/>}/>
                <Route path="/adpn-login" element={<Login/>}/>
                </Routes>
            </div>
            </main>
            <Footer/>
        </>
    );
}

export default App;
