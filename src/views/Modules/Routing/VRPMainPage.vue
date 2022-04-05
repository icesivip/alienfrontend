<template>
  <div>
       <h1 class = "text-center m-auto">Vehicle Routing Problem</h1>
       <div class="row">
            <div class="col-md-8 ml-auto mr-auto mb-0">
                <card class="card-subcategories card-plain">
                    
                    
                    <tabs type="primary" tabContentClasses="tab-subcategories" square centered class="row d-flex">
                        
                        <tab-pane>
                            <span slot="label" @click="showCapacitive">
                                <i class="tim-icons icon-planet"></i>Capacitive 1
                            </span>
                            <!-- //TODO -->
                        </tab-pane>                        
                    </tabs>
                </card>   
            </div>
        </div>

        
        <Capacitive v-show = "CStatus"> </Capacitive>
        
    </div>    
</template>

<script>
import { TabPane, Tabs } from 'src/components';
import ClarkeAndWright from './ClarkeAndWright';
import Sweep from './Sweep';
import NearestNeighbour from './NearestNeighbor';
import Opt3Move from './Opt3Move';
import Capacitive from './VRPCapacitive.vue';

export default {
    data() {
        return {
           
            CStatus: true,
        }
    },
    components: {
        TabPane,
        Tabs,
        ClarkeAndWright,
        NearestNeighbour,
        Sweep,
        Opt3Move,
        Capacitive
    },
    methods: {
        
        showCapacitive(){
            this.CStatus = true;
            
        }
    }
    
}
</script>

<style>

</style>