import { useContext } from "react";
import CartContext from "../store/CartContaxt.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input.jsx";
import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig ={
    method : 'POST',
    headers:{
        'Content-Type':'application/json'
    }

};
// outside the component because if it is inside it will be keep fetching , sending requests
export default function Checkout(){

    const {data , isLoading: isSending , error , sendRequest , clearData } =useHttp('http://localhost:3000/orders',requestConfig);

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal =cartCtx.items.reduce((totalPrice,item)=>
    totalPrice + item.quantity * item.price
    ,0);


    function handleClose(){
        userProgressCtx.hideCheckout();
    }



    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    async function handleSubmit(event){
        event.preventDefault();
        //prevent the normal sending in the front end to send to back end
        const fd =new FormData(event.target); // collecting the data
        const customerData = Object.fromEntries(fd.entries());//save it in the opject
        
        sendRequest(JSON.stringify({
            order:{
                items: cartCtx.items,
                customer: customerData
            }
        }));


        // await fetch('http://localhost:3000/orders', {
        //     method: 'POST',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body: JSON.stringify({
        //         order:{
        //             items: cartCtx.items,
        //             customer: customerData
        //         }
        //     })
            
        //     //sending a post request according to the validations of the back end
        // });
    }


    let actions = (
    <>
        <Button onClick={handleClose} type="button" textOnly>Close</Button>
        <Button>Submit Order</Button>
    </>

    );

    if(isSending){
        actions = <span>Sending order data......</span>
    }

    if(data && !error){
        return(
            <Modal open={userProgressCtx.progress === 'checkout'}
            onClose = {handleFinish} >
                <h2>Success!</h2>
                <p>Your order was submitted successfully</p>
                <p>We will get back to you with more details via email within the next 
                    few minutes.
                </p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }


    return(
        <Modal onClose={handleClose} open={userProgressCtx.progress === 'checkout'}>
            <form onSubmit={handleSubmit}>
                <h2></h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full name" type="text" id="name"/>
                <Input label="E-Mail Address" type="email" id="email"/>
                <Input label="Street" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>

                {error && <Error title = "Failed to submit order" message={error}/>}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}