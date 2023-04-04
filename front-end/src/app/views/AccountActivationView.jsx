import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { activateAccount } from '../api/backend/account';

const AccountActivationView = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();


  useEffect(() => {
    activateAccount(token)
      .then(() => {
        setSuccess(true)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [token])
  

  return (
    <div>
      {!loading && success && <p>Votre compte a été activé.</p>}
      {!loading && error && <p>Une erreur est survenue lors de l'activation de votre compte: {error}</p>}
    </div>
  )
}

export default AccountActivationView