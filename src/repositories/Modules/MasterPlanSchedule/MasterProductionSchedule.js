import axios from 'axios';
import store from './../../../store';

class MasterProductionSchedule{

    constructor(){
        this.basePath = store.state.backend;
    }

    solveModelWithOneRule(MpsDTO){
        return axios.post(`${this.basePath}/mpsModule/solveWithOneRule`, MpsDTO);
    }

    solveModelWithEachRule(){

    }

    solveModelAndCompareResults(){

    }

}

export default new MasterProductionSchedule();