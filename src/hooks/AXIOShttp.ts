import axios from 'axios';

const baseURL = 'https://localhost:7029'


interface LoginParams{
    username : string;
    password : string;
}

interface LoginResponse{
    success:boolean;
    message:string;
    data:{
        accessToken:string;
        refreshToken:string;
    }
    
}

export const login = async (params: LoginParams): Promise<LoginResponse> =>{
    try {
        const response = await axios.post<LoginResponse>(`${baseURL}/login`, params)
        return response.data;
    }catch(err){   
        throw err;
    }
}