import axios from "axios";

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchData = async <T>(
  url: string,
  onSuccess: (data: T) => void,
  onError: (error: Error | any) => void
) => {
  try {
    const response = await Api.get(url);
    onSuccess(response.data);
  } catch (err) {
    console.error("FetchData Error:", err);
    onError(err);
  }
};

export const postData = async <T>(
  url: string,
  body: T,
  onSuccess?: (data: T) => void,
  onError?: (error: Error | any) => void
) => {
  try {
    const response = await Api.post(url, body);
    onSuccess?.(response.data);
    return response.data;
  } catch (err) {
    onError?.(err);
  }
};

export const updateData = async <T>(
  url: string,
  body: T,
  isPartialUpdate: boolean = false,
  onSuccess?: (data: T) => void,
  onError?: (error: Error | any) => void
) => {
  try {
    const response = isPartialUpdate ? await Api.patch(url, body) : await Api.put(url, body);
    onSuccess?.(response.data);
    return response.data;
  } catch (err) {
    onError?.(err);
  }
};

export const deleteData = async (
  url: string,
  onSuccess?: () => void,
  onError?: (error: Error | any) => void
) => {
  try {
    await Api.delete(url);
    onSuccess?.();
  } catch (err) {
    onError?.(err);
  }
};

export default Api;
