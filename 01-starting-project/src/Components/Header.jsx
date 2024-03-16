import { useContext } from 'react';
import logoImg  from  '../assets/logo.jpg'
import CartContext from '../store/CartContaxt.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import Button from './UI/Button.jsx';


export default function Header(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);


    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item)=>{
        return totalNumberOfItems + item.quantity;
    },0);

    //using the context path to show the cart modal
    function handleShowCart(){
        userProgressCtx.showCart();        
    }

    return(
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A Restaurant" />
                <h1>React Food</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}