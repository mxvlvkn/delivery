import { createContext, useState } from "react";

export const CartCounterContext = createContext(0);

const CartCounterProvider = ({children}) => {
    const [cartCount, setCartCount] = useState(0);

    return (
        <CartCounterContext.Provider value={{cartCount, setCartCount}}>
            {children}
        </CartCounterContext.Provider>
    )
}

export default CartCounterProvider