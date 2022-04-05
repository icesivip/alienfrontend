import axios from 'axios';
import store from '../../../store';

class PartitioningRespository{

    constructor(){
        this.basePath = store.state.py_backend;
    }

    solve(requestBody){
        return axios.post(`${this.basePath}/upl `, requestBody, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        });
    }

}

export default new PartitioningRespository();