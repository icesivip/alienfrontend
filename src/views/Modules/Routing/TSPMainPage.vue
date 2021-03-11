<template>
  <div>
       <div class="row">
            <div class="col-md-8 ml-auto mr-auto">
                <card class="card-subcategories card-plain">
                    <tabs type="primary" tabContentClasses="tab-subcategories" square centered class="row">
                        <tab-pane>
                            <span slot="label">
                                <i class="tim-icons icon-planet"></i>WHAT IS V.I.P?</span>
                            <h4>The Vertically Integrated Projects (VIP) Program unites undergraduate education and faculty research in a team-based context. Undergraduate VIP students earn academic credits, while faculty and graduate students benefit from the design/discovery efforts of their teams.</h4>
                            <h4>This program allows to:</h4>
                            <ul>
                                <li type="circle"> Create long-term research & development experiences.</li>
                                <li type="circle"> Cultivates leadership & mentoring.</li>
                                <li type="circle"> Benefits faculty research programs.</li>
                                </ul>
                            <!--<div>
                                <img slot="image-bottom" class="card-img-bottom" src="img\logoVIP.png" alt="Card image cap">
                            </div>-->
                        </tab-pane>
                        <tab-pane>
                            <span slot="label">
                                <i class="tim-icons icon-planet"></i>WHAT IS V.I.P?</span>
                            <h4>The Vertically Integrated Projects (VIP) Program unites undergraduate education and faculty research in a team-based context. Undergraduate VIP students earn academic credits, while faculty and graduate students benefit from the design/discovery efforts of their teams.</h4>
                            <h4>This program allows to:</h4>
                            <ul>
                                <li type="circle"> Create long-term research & development experiences.</li>
                                <li type="circle"> Cultivates leadership & mentoring.</li>
                                <li type="circle"> Benefits faculty research programs.</li>
                                </ul>
                            <!--<div>
                                <img slot="image-bottom" class="card-img-bottom" src="img\logoVIP.png" alt="Card image cap">
                            </div>-->
                        </tab-pane>
                    </tabs>
                </card>   
            </div>
        </div>
    </div>    
</template>

<script>
import { TabPane, Tabs } from 'src/components';

export default {
    components: {
        TabPane,
        Tabs,
  },
}
</script>

<style>

</style>