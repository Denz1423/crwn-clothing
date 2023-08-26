import React, {useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action"; 
import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.style";

export default function CartIcon() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const wrapperRef = useRef(null);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  function useOutsideAlerter(ref) {
    useEffect(() => {
  
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(setIsCartOpen(false));
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  return (
    <CartIconContainer onClick={toggleIsCartOpen} ref={wrapperRef}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}
