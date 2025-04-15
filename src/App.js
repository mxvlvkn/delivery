import {Route, Routes, useLocation} from 'react-router-dom'
import {MenuMain} from './pages/MenuMain.jsx'
import React from 'react'
import { Header } from './components/Header.jsx';
import { AdminHeader } from './components/AdminHeader.jsx';
import { Footer } from './components/Footer.jsx';
import { ProductList } from './pages/ProductList.jsx';
import { Categories } from './pages/Categories.jsx';
import { AddProduct } from './pages/AddProduct.jsx';
import { SetProduct } from './pages/SetProduct.jsx';
import { AddCategory } from './pages/AddCategory.jsx';
import { SetCategory } from './pages/SetCategory.jsx';
import { ProductPage } from './pages/ProductPage.jsx';
import { Login } from './pages/Login.jsx';
import { Cart } from './pages/Cart.jsx';

function App() {
    const location = useLocation();

    const UrlsForUsers = [
        '/menu',
        '/product',
        '/cart',
    ]

    const UrlsForAdmins = [
        '/adpn',
        '/adpn-products',
        '/adpn-categories',
        '/adpn-orders', 
        '/adpn-add',
        '/adpn-product-set',
        '/adpn-categories',
        '/adpn-categories-add',
        '/adpn-category-set',
    ]

    return (
        <>
            {UrlsForUsers.some(url => location.pathname.startsWith(url)) && <Header />}
            {location.pathname === '/' && <Header />}
            {UrlsForAdmins.some(url => location.pathname.startsWith(url)) && <AdminHeader />}
            <main>
                <Routes>
                    <Route path="/" element={<MenuMain/>}/>
                    <Route path="/menu" element={<MenuMain/>}/>
                    <Route path="/product/:id" element={<ProductPage/>}/>
                    <Route path="/cart" element={<Cart/>}/>

                    <Route path="/adpn" element={<ProductList/>}/>
                    <Route path="/adpn-products" element={<ProductList/>}/>
                    <Route path="/adpn-add" element={<AddProduct/>}/>
                    <Route path="/adpn-product-set/:id" element={<SetProduct/>}/>
                    <Route path="/adpn-login" element={<Login/>}/>
                    <Route path="/adpn-categories" element={<Categories/>}/>
                    <Route path="/adpn-categories-add" element={<AddCategory/>}/>
                    <Route path="/adpn-category-set/:id" element={<SetCategory/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    );
}

export default App;
