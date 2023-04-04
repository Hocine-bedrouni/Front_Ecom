import React from 'react'
import { useSelector } from 'react-redux'

export const CartFourthStep = () => {
  const {deliveryMode} = useSelector(state => state.delivery)

  return (
    <div>CartFourthStep: {deliveryMode.name}</div>
  )
}
