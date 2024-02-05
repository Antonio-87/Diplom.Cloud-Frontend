import { useEffect, useRef, useState } from "react";

const useJsonFetch = (url: string, options = {}) => {
  const [data, setData] = useState<string>();
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const timestampRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const timestamp = Date.now();
      timestampRef.current = timestamp;
      setLoading(true);
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (timestampRef.current === timestamp) setData(JSON.stringify(result));
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useJsonFetch;
