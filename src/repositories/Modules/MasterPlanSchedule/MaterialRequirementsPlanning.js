import axios from 'axios';
import store from './../../../store';

class MaterialRequirementsPlanning{

    constructor(){
        this.basePath = store.state.backend;
    }

    createMRP(MrpDTO){
        return axios.post(`${this.basePath}/mrpModule/solveMRP`, MrpDTO);
    }

}

export default new MaterialRequirementsPlanning();