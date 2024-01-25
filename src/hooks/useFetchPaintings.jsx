import { useEffect, useState } from "react";

export default function useFetchPaintings() {
  const [originals, setOriginals] = useState([]);
  const [prints, setPrints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPaintings() {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/riclae/paintings`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch paintings");
        }
        const data = await response.json();
        setOriginals(data.originals);
        setPrints(data.prints);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchPaintings();
  }, []);
  return [originals, prints, loading, error];
}
