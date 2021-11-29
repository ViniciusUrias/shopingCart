import axios from 'axios';

class PlansService {
    public async get(plan: string){
        const req = await axios.get(`https://my-json-server.typicode.com/ViniciusUrias/demo/${plan}`);
        return req?.data;
    }
}

const plansService = new PlansService();
export default plansService;