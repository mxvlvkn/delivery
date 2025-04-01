import { createContext, useState } from "react";

export const ColorContext = createContext('');

const ColorProvider = ({children}) => {
    const [color, setColor] = useState({
        color: 'E44DB4',
        textColor: '000000'
    })

    return (
        <ColorContext.Provider value={{color, setColor}}>
            {children}
        </ColorContext.Provider>
    )
}

export default ColorProvider