import { createContext , useReducer } from "react";

// creating a context that allow us to reache some date and move it to any place/component in the code by just importing the context and reuse its props

const CartContext = createContext({
    items :[],
    addItem:(item)=>{},
    removeItem:(id) => {},
    clearCart:()=>{}
});

function cartReducer(state,action){
    if(action.type === 'ADD_ITEM'){
        const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.item.id);
        //findIndex take each item in the array of the items and check if its id === action item id
        const updatedItems = [...state.items];
        if(existingCartItemIndex > -1){
            const existingItem =state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity : existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex]=updatedItem
        } else {
            updatedItems.push({...action.item , quantity : 1})
        }
        //if so that means that item is already existing in the state array so i will increase its quantity
        //if not i will add it and give it a new properity quantity so in the next clicl the if condition will be true so i can increse the quantity

        return {...state , items:updatedItems};
        //over write the array of items only
    }



    if(action.type === 'REMOVE_ITEM'){
        //using the same logic here for deldeting
        const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.id/*only the id not the all item*/);

        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];

        if(existingCartItem.quantity === 1 ){
            updatedItems.splice(existingCartItemIndex , 1);
        }else{
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity -1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {...state , items:updatedItems};

    }

    if(action.type === 'CLEAR_CART'){
       return {...state , items:[]}; 
    }







    return state;
}
//take a brevious state and according to the acction make a changes and updates

export function CartContextProvider({children}){
    const [cart , dispatchCartAction]= useReducer(cartReducer , {items:[]});



    function addItem(item){
        dispatchCartAction({type:'ADD_ITEM', item});
    }

    function removeItem(id){
        dispatchCartAction({type:'REMOVE_ITEM', id});
    }

    function clearCart(){
        dispatchCartAction({type:'CLEAR_CART'});
    }

    const cartContext ={
        items : cart.items,
        addItem,
        removeItem,
        clearCart
    };



    return ( 
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider> 
    );
}
// children is the all app compnents that i may reach any of them to use the context data


export default CartContext;