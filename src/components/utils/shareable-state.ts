import { useState } from "react";

export const useShareableState = () => {
    const [open, setOpen] = useState(false);
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] =  useState(false);
    const [registerModalOpen, setRegisterModalOpen] =  useState(false);
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);
    return {
        open,
        setOpen,
        cartDrawerOpen,
        setCartDrawerOpen,
        loginModalOpen, 
        setLoginModalOpen,
        registerModalOpen, 
        setRegisterModalOpen,
        orderModalOpen,
        setOrderModalOpen,
        numberOfItemsInCart,
        setNumberOfItemsInCart
    }
}