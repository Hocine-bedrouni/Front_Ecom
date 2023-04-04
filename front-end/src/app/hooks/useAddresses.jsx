import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchAddresses } from '../api/backend/account';
import { selectUser } from '../redux-store/authenticationSlice';

function useAddresses() {
  const user = useSelector((state) => selectUser(state));
  const[deliveryAddress, setDeliveryAddress] = useState({})
  const[billingAddress, setBillingAddress] = useState({})

  const[loading, setLoading] = useState(true)
  const[inError, setInError] = useState(false)
  const[inSuccess, setInSuccess] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchAddresses(user?.id).then(res => {
      const addresses = res.data;
      setDeliveryAddress(addresses.find(address => address.type === 'DELIVERY' && address.active))
      setBillingAddress(addresses.find(address => address.type === 'BILLING' && address.active))
      setInSuccess(true)
    })
    .catch(() => {
      setInError(true)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return {loading, inError, inSuccess, deliveryAddress, billingAddress};
}

export default useAddresses;