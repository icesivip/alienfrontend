import axios from 'axios';
import store from './../../../store';

class SHPath{

    constructor(){
        this.basePath = store.state.backend;
    }

    solveDijkstra(GraphDTO){
        return axios.post(`${this.basePath}/networksModule/solveDijkstra`,GraphDTO);
    }
    getPath(GraphDTO){
        return axios.post(`${this.basePath}/networksModule/getShortestPath`,GraphDTO);
    }
    solveFlow(GraphDTO){
        return axios.post(`${this.basePath}/networksModule/solveFlow`,GraphDTO);
    }
    solveMST(GraphDTO){
        return axios.post(`${this.basePath}/networksModule/solveMST`,GraphDTO);
    }

}

export default new SHPath();