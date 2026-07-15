import axios_instance from "../lib/axios"

// @ts-ignore
export const contactApi = async (formData) => {
    const res = await axios_instance.post('/form/contact', formData);
    return res.data;
}
