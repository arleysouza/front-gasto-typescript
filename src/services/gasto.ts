import api from './api';
import { Error, GastoInputProps, GastoProps } from '../types';

class GastoService {
    async create(gasto: GastoInputProps): Promise<GastoProps | Error> {
        try {
            const { data } = await api.post("/gasto", gasto);
            return data;
        }
        catch (e:any) {
            return { error: e.message };
        }
    }

    async update(gasto: GastoProps): Promise<GastoProps | Error> {
        try {
            const { data } = await api.put("/gasto", gasto);
            return data;
        }
        catch (e:any) {
            return { error: e.message };
        }
    }

    async delete(id:string): Promise<GastoProps | Error> {
        try {
            const { data } = await api.delete("/gasto", {
                data:{id}
            });
            return data;
        }
        catch (e:any) {
            return { error: e.message };
        }
    }

    async list(): Promise<GastoProps[] | Error> {
        try {
            const { data } = await api.get("/gasto");
            return data;
        }
        catch (e:any) {
            return { error: e.message };
        }
    }
}

export default new GastoService();