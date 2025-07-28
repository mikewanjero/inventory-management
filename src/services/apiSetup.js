import axios from 'axios';

const baseUrl = 'https://www.phamacoretraining.co.ke:81/';
const apiPath = 'api/TestProject';
const connectionParam = 'DEVTESTDB001';
const accessKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEb2N1bWVudENlbnRyYWwiL';

// Helper: inject baseURL + headers
const axiosInstance = axios.create({
  baseURL: `${baseUrl}${apiPath}`,
  headers: {
    accesskey: accessKey,
    'Content-Type': 'application/json',
  },
});

    export const createInventory = async (data) => {
        try {
            const response = await axiosInstance.post(
            `/CreateTESTInventory?connectiondb=${connectionParam}`,
            data
            );
            return response.data;
        } catch (error) {
            console.error('Error adding inventory:', error);
            throw error;
        }
    };

    export const getInventory = async () => {
        try {
            const response = await axiosInstance.get(
            `/GetTESTInventory?connectiondb=${connectionParam}`
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching inventory!', error);
            throw error;
        }
    };

    export const editInventory = async (data) => {
        try {
            const response = await axiosInstance.put(
            `/EditTESTInventory?connectiondb=${connectionParam}`,
            data
            );
            return response.data;
        } catch (error) {
            console.error('Error editing inventory!', error);
            throw error;
        }
    };

    export const deleteInventory = async (invCode) => {
        try {
            const response = await axiosInstance.delete(
            `/DeleteTESTInventory?connectiondb=${connectionParam}&inv_code=${invCode}`
            );
            return response.data;
        } catch (error) {
            console.error('Error deleting inventory!', error);
            throw error;
        }
    };
