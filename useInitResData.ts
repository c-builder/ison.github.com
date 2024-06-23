import { useEffect, useState } from 'react';
import axios from 'axios';

interface InitResData {
  // 根据实际数据结构定义类型
}

const useInitResData = () => {
  const [initResData, setInitResData] = useState<InitResData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitResData = async () => {
      try {
        const response = await axios.get<InitResData>('/api/init-res-data'); // 替换成实际的接口地址
        setInitResData(response.data);
      } catch (error) {
        setError('Error fetching initial response data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitResData();
  }, []);

  return { initResData, loading, error };
};

export default useInitResData;
