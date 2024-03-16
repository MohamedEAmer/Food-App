import { useState } from "react";
import { createContext } from "react";

const UserProgressContext = createContext({
    //defining the props of the context 

    progress :'',
    showCart : () => {},
    hideCart : () => {},
    showCheckout : () => {},
    hideCheckout : () => {},

});

export function UserProgressContextProvider({children}){

    const [userProgress , setUserProgress] = useState('');
    // handleing the props of the context

    function showCart(){
        setUserProgress('cart');
    }

    function hideCart(){
        setUserProgress('');
    }

    function showCheckout(){
        setUserProgress('checkout');
    }

    function hideCheckout(){
        setUserProgress('');
    }

    const UserProgressCtx = {
    
        progress :userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    
    };


    return(
        <UserProgressContext.Provider value={UserProgressCtx}>{children}</UserProgressContext.Provider>
    );
}









export default UserProgressContext;