import { useEffect, useState } from 'react';
import axios from 'axios';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const useCascaderOptions = (isEditMode: boolean) => {
  const [options, setOptions] = useState<Option[]>([]);
  const defaultValue: (string | number)[][] = [['zhejiang', 'shanhai']];

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const endpoint = isEditMode ? '/api/edit-options' : '/api/options';
        const response = await axios.get<Option[]>(endpoint);
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [isEditMode]);

  return {
    options,
    defaultValue,
  };
};

export default useCascaderOptions;
