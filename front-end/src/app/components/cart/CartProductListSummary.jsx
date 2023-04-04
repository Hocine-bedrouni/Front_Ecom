import React from 'react'
import { useSelector } from 'react-redux';


const CartProductListSummary = () => {
  const { cartItems } = useSelector(state => state.cart);

  return (
    <div className="flex flex-col gap-10">
      {cartItems?.map(product =>
        <div key={product.idProduct} className="flex flex-row gap-2">
          <div className="w-1/3 rounded">
            <img src={product.pictures[0]?.url}/>
          </div>
          <div className="flex flex-col w-2/3 items-start">
            <p className="text-base">{product.name}</p>
            <div className="font-bold text-base">
              Prix unitaire: {new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(product.priceTTC)}
            </div>
            <p className="text-base">Quantité: {product.cartQuantity}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartProductListSummary