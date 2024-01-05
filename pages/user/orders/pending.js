import React from 'react'
import OrdersPage from './index'
import Error403 from '@/pages/403';
import useUser from '@/hooks/useUser';

export default function Pending() {
  const { user } = useUser()
  if (!user) return <Error403 />
  return <OrdersPage status="pending" />
}