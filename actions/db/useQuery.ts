import { useState, useEffect } from "react";

export default function useQuery(
  query: () => Promise<any>,
  deps?: any[],
): { data: any; loading: any; error: any } {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const resp = await query();
        console.log(resp);
        setData(resp);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, deps || []);

  return {
    data,
    loading,
    error,
  };
}
