const API_BASE_URL = 'http://localhost:5000';

export const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const res = await fetch(API_BASE_URL + url);
    const data = await res.json();
    return data as T;
  } catch (err) {
    console.error("Fetch error:", err);
    return [] as unknown as T;
  }
};
