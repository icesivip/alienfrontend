import axios from 'axios';
import store from './../../../store';

class MaterialRequirementsPlanning{

    constructor(){
        this.basePath = store.state.backend;
    }

    createMRP(){
        
        //let headers = {'Authorization': store.state.token};
        //return axios.post(`${this.basePath}/paypal/subscription-registered`, subInfo,{headers: headers});
    
        //return axios.get(`${this.basePath}/coupon/${couponName}`,{headers: headers});
    }

}

export default new MaterialRequirementsPlanning();