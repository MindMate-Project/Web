import baseUrl from "../API/baseURL";

const useUpdateDataWithImage = async (url, parmas) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    const res = await baseUrl.put(url, parmas, config);
    console.log(res.status);
    return res;
};

const useUpdateData = async (url, parmas) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await baseUrl.put(url, parmas, config);
    return res;
};
const useUpdatePassword = async (url, parmas) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await baseUrl.post(url, parmas, config);
    return res;
};

export { useUpdateDataWithImage, useUpdateData, useUpdatePassword };
