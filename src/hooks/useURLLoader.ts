import { useState, useEffect } from 'react';
import axios from 'axios';

interface DataProps<T> {
  data: T;
  code?: number;
  message?: string;
}

export const useUrlLoader = <T>(url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(url).then((result: DataProps<T>) => {
      setData(result.data as any);
      setLoading(false);
    });
  }, []);
  return [data, loading];
};
