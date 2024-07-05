import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../components/Config";

const useLectures = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLectures = useCallback(async () => {
    try {
      const response = await Axios.get(`${API_URL}api/lecture/list`, {
        withCredentials: true,
      });

      if (Array.isArray(response.data.lecturelist)) {
        setLectures(response.data.lecturelist);
      } else {
        setLectures([]);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLectures();
  }, [fetchLectures]);

  return { lectures, loading, error, fetchLectures };
};

export default useLectures;
