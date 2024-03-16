import { useEffect, useRef } from "react";
import { createPortal } from "react-dom"
//creating a portal that connect between the dialog element and the element 'modal'
//the calling of the modal will be handeled later
export default function Modal({children , onClose , open , className = ''}){

    const dialog = useRef();
    //ref to control the opening and closing of the modal

    useEffect(() => {
        const modal =dialog.current;

        if(open){
            modal.showModal();
        }

        return ()=> modal.close();
    },[open])



    return createPortal(<dialog onClose={onClose} ref={dialog} className={`modal ${className}`}>{children}</dialog>,
     document.getElementById('modal'));
    
}