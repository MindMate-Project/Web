import baseUrl from "../API/baseURL";

const useInsertDataWithImage = async (url, parmas) => {
  try {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const res = await baseUrl.post(url, parmas, config);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const useInsertData = async (url, parmas) => {
  const res = await baseUrl.post(url, parmas);
  return res;
};

export { useInsertData, useInsertDataWithImage };
