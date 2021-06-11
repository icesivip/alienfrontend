<template>
  <div>
       <div class="row">
            <div class="col-md-8 ml-auto mr-auto">
                <card class="card-subcategories card-plain">
                    
                    
                    <tabs type="primary" tabContentClasses="tab-subcategories" square centered class="row d-flex">
                        
                        <tab-pane>
                            <span slot="label" @click="showClarkAndWright">
                                <i class="tim-icons icon-planet"></i>Clark and Wright
                            </span>
                            <!-- //TODO -->
                        </tab-pane>

                        <tab-pane>
                            <span slot="label" @click="showNearestNeighbour">
                                <i class="tim-icons icon-planet"></i>Nearest Neighbour
                            </span>
                            <!-- //TODO -->
                        </tab-pane>

                        <tab-pane>
                            <span slot="label" @click="showSweep">
                                <i class="tim-icons icon-planet"></i>Sweep
                            </span>
                            <!-- //TODO -->
                        </tab-pane>

                        <tab-pane>
                            <span slot="label" @click="showOpt3Move">
                                <i class="tim-icons icon-planet"></i>Opt-3-Move
                            </span>
                                <!-- //TODO -->
                        </tab-pane>
                    </tabs>
                </card>   
            </div>
        </div>

        <ClarkeAndWright v-show="CKStatus"></ClarkeAndWright>
        <Sweep v-show="SStatus"></Sweep>
        <NearestNeighbour v-show="NNStatus"></NearestNeighbour>
        <Opt3Move v-show="O3MStatus"></Opt3Move>
        
    </div>    
</template>

<script>
import { TabPane, Tabs } from 'src/components';
import ClarkeAndWright from './ClarkeAndWright';
import Sweep from './Sweep';
import NearestNeighbour from './NearestNeighbor';
import Opt3Move from './Opt3Move';

export default {
    data() {
        return {
            CKStatus: true,
            NNStatus: false,
            SStatus: false,
            O3MStatus: false,
        }
    },
    components: {
        TabPane,
        Tabs,
        ClarkeAndWright,
        NearestNeighbour,
        Sweep,
        Opt3Move
    },
    methods: {
        showClarkAndWright(){
            this.CKStatus = true;
            this.NNStatus = false;
            this.SStatus = false;
            this.O3MStatus = false;
        },
        showNearestNeighbour(){
            this.CKStatus = false;
            this.NNStatus = true;
            this.SStatus = false;
            this.O3MStatus = false;
        },
        showSweep(){
            this.CKStatus = false;
            this.NNStatus = false;
            this.SStatus = true;
            this.O3MStatus = false;
        },
        showOpt3Move(){
            this.CKStatus = false;
            this.NNStatus = false;
            this.SStatus = false;
            this.O3MStatus = true;
        }
    }
    
}
</script>

<style>

</style>