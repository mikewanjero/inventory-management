import axios from "axios";

const baseUrl = 'https://www.phamacoretraining.co.ke:81/';
const apiUrl = 'api/TestProject';

export const createInventory = async (data) => {
    try {
        axios.defaults.baseURL = baseUrl + apiUrl;
        const response = await axios.post(`/CreateTestIncentory`, data);
        return response.data;
    } catch (error) {
        console.error("Error adding inventory:", error);
        throw error;
    }
}

export const getInventory = async () => {
    try{
        axios.defaults.baseURL = baseUrl + apiUrl;
        const response = await axios.get(`/GetTESTInventory`);
        return response.data;
    } catch (error) {
        console.error("Error fetching inventory!", error);
        throw error;
    }
}

export const editInventory = async (id, data) => {
    try {
        axios.defaults.baseURL = baseUrl + apiUrl;
        const response = await axios.put(`/EditTESTInventory/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error editing inventory!", error);
        throw error;
    }
}

export const deleteInventory = async (id) => {
    try {
        axios.defaults.baseURL = baseUrl + apiUrl;
        const response = await axios.delete(`/DeleteTESTInventory/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting inventory!", error);
        throw error;
    }
}