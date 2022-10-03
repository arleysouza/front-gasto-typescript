import api from './api';
import { Error, UsuarioInputProps, LoginResProps, UsuarioResProps } from '../types';

class UsuarioService {
    async login(usuario: UsuarioInputProps): Promise<LoginResProps | Error> {
        try {
            const { data } = await api.post("/login", usuario);
            return data;
        }
        catch (e: any) {
            return { error: e.message };
        }
    }

    async create(usuario: UsuarioInputProps): Promise<UsuarioResProps | Error> {
        try {
            const { data } = await api.post("/usuario", usuario);
            return data;
        }
        catch (e: any) {
            return { error: e.message };
        }
    }

    async update(usuario: UsuarioInputProps): Promise<UsuarioResProps | Error> {
        try {
            const { data } = await api.put("/usuario", usuario);
            return data;
        }
        catch (e: any) {
            return { error: e.message };
        }
    }
}

export default new UsuarioService();