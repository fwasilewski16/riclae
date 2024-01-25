import { useEffect, useState } from "react";

export default function useFetchSinglePainting(type, id) {
  const [painting, setPainting] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPainting(type, id) {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/riclae/${type}/${id}`,
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setPainting(data.painting);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }

    fetchPainting(type, id);
  }, []);
  return [painting, loading, error];
}
