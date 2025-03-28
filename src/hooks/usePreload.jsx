import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncPreloadProcess } from '../stores/isPreload/action';

const usePreload = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(asyncPreloadProcess(setLoading));
  }, [dispatch]);

  return { loading };
};

export default usePreload;