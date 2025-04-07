import {Route, Routes, useLocation} from 'react-router-dom'
import {MenuMain} from './pages/MenuMain.jsx'
import React from 'react'
import { Header } from './components/Header.jsx';
import { AdminHeader } from './components/AdminHeader.jsx';
import { Footer } from './components/Footer.jsx';
import { ProductList } from './pages/ProductList.jsx';
import { AddProduct } from './pages/AddProduct.jsx';
import { SetProduct } from './pages/SetProduct.jsx';
import { Login } from './pages/Login.jsx';

function App() {
    const location = useLocation();

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
        '/adpn-set',
    ]

    return (
        <>
            {UrlsForUsers.includes(location.pathname) && <Header/>}
            {UrlsForAdmins.some(url => location.pathname.startsWith(url)) && <AdminHeader />}
            <main>
            <div className='content'>
                <Routes>
                <Route path="/" element={<MenuMain/>}/>
                <Route path="/menu" element={<MenuMain/>}/>
                <Route path="/adpn" element={<ProductList/>}/>
                <Route path="/adpn-products" element={<ProductList/>}/>
                <Route path="/adpn-add" element={<AddProduct/>}/>
                <Route path="/adpn-set/:id" element={<SetProduct/>}/>
                <Route path="/adpn-login" element={<Login/>}/>
                </Routes>
            </div>
            </main>
            <Footer/>
        </>
    );
}

export default App;
