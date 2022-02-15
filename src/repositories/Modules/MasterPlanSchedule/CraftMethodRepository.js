import axios from 'axios';
import store from './../../../store';

class CraftMethodRepository{

    constructor(){
        this.basePath = store.state.backend;
    }

    solveModel(requestBody){
        return axios.post(`${this.basePath}/craftMethodModule/craft`, requestBody);
    }

}

export default new CraftMethodRepository();