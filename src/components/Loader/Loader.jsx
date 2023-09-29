/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react'
import { LoadingContext } from '@/context/LoadingContext';

export const Loader = () => {
  const { loading } = useContext(LoadingContext);
  return (
    <>
      {
        loading &&
        <div className="loader">
          <div className="loader__content">
            <img src={'./assets/icons/discord-logo.gif'} alt="logo" draggable="false" />
            <p></p>
          </div>
        </div>
      }
    </>
  )
}
