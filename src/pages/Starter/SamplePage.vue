<!--<style type="text/css">
body {
  color: #d3d3d3;
  font: 12pt arial;
  background-color: #222222;
}
#mynetwork {
          width: 300;
          height: 400px;
          border: 1px solid lightgray;
          background:#d1d1d1;
        }
#separator{
  height: 60px;
}
</style>
<script type="text/javascript" src="https://visjs.github.io/vis-network/standalone/umd/vis-network.min.js"></script>
-->
<template>
  <div>
    <img slot="image-bottom" class="card-img-bottom" src="img\video1.gif" alt="Card image cap">
    <hr>
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
                <i class="tim-icons icon-square-pin"></i>VIP SITES
              </span>
              <div>
                <h4>With its potential to transform higher education, VIP is being adopted at universities around the world. As of August 2019, 36 universities had joined the VIP Consortium, and programs are in development at additional universities.</h4>
                <img slot="image-bottom" class="card-img-bottom" src="img\locationsVIP.PNG" alt="Card image cap">
                <h4>VIP in Colombia is only in two universities</h4>
                <ul>
                  <li type="circle"> <a href="http://vip-consortium.org/teams-by-institution/1485">Universidad ICESI</a></li>
                  <li type="circle"> <a href="http://vip-consortium.org/teams-by-institution/1047" >Universidad del Norte – College of Engineering</a></li>
                </ul>
              </div>
            </tab-pane>

            <tab-pane>
              <span slot="label">
                <i class="tim-icons icon-bulb-63"></i>ALIEN
              </span>
              <h4>Algorithms Lab for Industrial Engineering Needs, a team from another world, is a project under construction as part of the framework of Icesi VIP from University Icesi, Cali Colombia, associated with VIP Gatech Program.</h4>
              <div>
                <img slot="image-bottom" class="card-img-bottom" src="https://raw.githubusercontent.com/icesivip/alienbackend/test/src/main/resources/static/img/Vipcierre.jpg" alt="Card image cap">
              </div>

            </tab-pane>

            <tab-pane>
              <span slot="label">
                <i class="tim-icons icon-spaceship"></i>GOALS
              </span>
              <ul>
              <li type="square">To develop a educational and integrated framework software that implement methods for decision making on bussiness.</li>
              <li type="square">To work on bussiness intelligence tools of intensive academic use.</li>
              <li type="square">To bring a completely practical laboratory to validate methods and algorithms used on industry.</li>
              <li type="square">To support teaching strategies by developing and using software tools.</li>
              </ul>
              <div>
                <img slot="image-bottom" class="card-img-bottom" src="https://www.icesi.edu.co/unicesi/images/unicesi/webVIP-reunion-2.jpg" alt="Card image cap">
              </div>

            </tab-pane>

            <tab-pane>
              <span slot="label">
                <i class="tim-icons icon-badge"></i>OUR GROUP
              </span>
              <div class="row">
              <div class="col-md-4"> <user-card :name="n4" :carrer="c4" :linkedin="lkd1"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n9" :carrer="c9"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n1" :carrer="c1"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n16" :carrer="c16"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n25" :carrer="c25"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n10" :carrer="c10"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n38" :carrer="c38"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n2" :carrer="c2"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n26" :carrer="c26"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n6" :carrer="c6"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n11" :carrer="c11"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n12" :carrer="c12"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n15" :carrer="c15"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n14" :carrer="c14"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n19" :carrer="c19"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n18" :carrer="c18"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n17" :carrer="c17"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n7" :carrer="c7"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n27" :carrer="c27"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n20" :carrer="c20"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n21" :carrer="c21"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n22" :carrer="c22"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n23" :carrer="c23"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n24" :carrer="c24"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n8" :carrer="c8"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n3" :carrer="c3"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n13" :carrer="c13"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n28" :carrer="c28"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n30" :carrer="c30"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n29" :carrer="c29"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n31" :carrer="c31"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n32" :carrer="c32"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n37" :carrer="c37"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n34" :carrer="c34"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n35" :carrer="c35"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n44" :carrer="c44"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n33" :carrer="c33"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n5" :carrer="c5"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n41" :carrer="c41"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n40" :carrer="c40"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n39" :carrer="c39"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n42" :carrer="c42"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n43" :carrer="c43"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n36" :carrer="c36"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n45" :carrer="c45"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n46" :carrer="c46"> </user-card></div>
              <div class="col-md-4"> <user-card :name="n47" :carrer="c47"> </user-card></div>
              </div>
            </tab-pane>
          </tabs>
        </card>
      </div>
      </div>

      <div class="row">
        <div class="col-6">
        <card
            type="pricing"
            class="card-info text-center card-white"
            footer-classes="text-center mb-3 mt-3">
            <h1 class="card-title"><p style="color:black">Issues Involved or Addressed</p></h1>
            <img class="card-img" src="https://demos.creative-tim.com/vue-black-dashboard-pro/img/card-primary.png" alt="Image" />
            <ul class="list-group">
            <li class="list-group-item"><p style="color:black">Algorithms and methods widely used for quantitative systems for business involving operations research and management science, all of them used mainly in higher education</p></li>

            </ul>

          </card>
        </div>
        <div class="col-6">

        <card
          type="pricing"
          class="card-success text-center card-white"
          footer-classes="text-center mb-3 mt-3">
          <h1 class="card-title"><p style="color:black">Methods and Technologies</p></h1>

          <img class="card-img" src="https://demos.creative-tim.com/vue-black-dashboard-pro/img/card-success.png" alt="Image" />
          <ul class="list-group">
            <li class="list-group-item"><p style="color:black">Rapid prototype development, Iterative and incremental development, Open source development technologies, Business intelligence.</p></li>
          </ul>

        </card>
        </div>
      </div>

      <card class="text-center">
        <div slot="header" class="card-header-success">
          <h1 class="text-center">OUR MODULES</h1>
        </div>
        <img slot="image-bottom" class="card-img-bottom" src="img\Modules.PNG" alt="Card image cap">
       <!--<div id="mynetwork"></div>-->
      </card>
      <card class="text-center">
        <div><wizard> </wizard></div>
      </card>

    </div>
  </div>
</template>
<script>

import { TabPane, Tabs, Collapse, CollapseItem, } from 'src/components';
import UserCard from 'src/pages/Pages/UserProfile/UserCard.vue';
import Wizard from 'src/pages/Forms/Wizard.vue';

import { DataSet, DataView, Network } from "vis";
export default {
  components: {
    TabPane,
    Tabs,
    Collapse,
    CollapseItem,
    UserCard,
    Wizard
  },
  data() {
    return {
      activeName: 'first',
      n1: "CLAUDIA JOHANA AGUDELO ARANGO",
      c1: "Ingeniería Industrial",
      lkd1: "https://www.linkedin.com/in/claudia-agudelo-arango/",

      n2: "ALEJANDRO BRAVO LOPEZ ",
      c2: "Ingeniería Industrial",

      n3: "SANTIAGO BUESAQUILLO MERA",
      c3: "Ingeniería Industrial",

      n4: "JUAN DAVID CARVAJAL HERNANDEZ ",
      c4: "Ingeniería Industrial e Ingeniería de Sistemas",

      n5: "JOAN DAVID COLINA ECHEVERRY ",
      c5: "Ingeniería Industrial",

      n6: "MANUEL ALEJANDRO  CORAL LOZANO ",
      c6: "Ingeniería Telemática",

      n7: "MARIA FERNANDA GAVIRIA CORDON ",
      c7: "Ingeniería Industrial",

      n8: "JUAN DAVID MARIN CERON ",
      c8: "Ingeniería de Sistemas",

      n9: "JEISON DAVID MEJIA TRUJILLO ",
      c9: "Ingeniería de Sistemas",

      n10: "ANDREA MENDOZA CRUZ ",
      c10: "Ingeniería Industrial",

      n11: "LUIS FERNANDO MUÑOZ MORALES",
      c11: "Ingeniería de Sistemas",

      n12: "SARA ORTIZ DRADA ",
      c12: "Ingeniería Industrial e Ingeniería de Sistemas",

      n13: "NATALY TAPASCO PANESSO",
      c13: "Ingeniería Industrial",

      n14: "JULIAN ANDRES BRITO ESCOBAR ",
      c14: "Ingeniería Industrial",

      n15: "JUAN CAMILO CASTILLO QUIÑONEZ  ",
      c15: "Ingeniería Industrial",

      n16: "CHRISTIAN DAVID FLOR ASTUDILLO ",
      c16: "Ingeniería de Sistemas e Ingeniería Telemática",

      n17: "JUAN ESTEBAN GALLO PLAZA ",
      c17: "Ingeniería de Sistemas",

      n18: "BRAYAN STARLIN GARCES PORTILLO ",
      c18: "Ingeniería Industrial",

      n19: "DANIELA LLANO LOZANO  ",
      c19: "Ingeniería de Sistemas",

      n20: "VICTOR ESTEBAN MORA ARCE ",
      c20: "Ingeniería Industrial",

      n21: "MARIA CAMILA OSPINA CHAVARRO ",
      c21: "Ingeniería Industrial",

      n22: "SANTIAGO ZUÑIGA GARCIA  ",
      c22: "Ingeniería Telemática",

      n23: "CESAR LEONARDO CANALES RIVERA ",
      c23: "Ingeniería de Sistemas e Ingeniería Telemática",

      n24: "ANA MARIA RESTREPO GIRALDO  ",
      c24: "Ingeniería Industrial",

      n25: "CARLOS ANDRES RESTREPO MARIN ",
      c25: "Ingeniería  de Sistemas",

      n26: "LAURA ANDREA AGUIRRE HERNANDEZ ",
      c26: "Ingeniería Industrial",

      n27: "JUAN CAMILO IDARRAGA RAMIREZ ",
      c27: "Ingeniería Industrial",

      n28: "JUAN FERNANDO MARTINEZ DOMINGUEZ  ",
      c28: "Ingeniería de Sistemas",

      n29: "VALENTINA OSORIO GIRALDO ",
      c29: "Ingeniería Industrial",

      n30: "KEVVIN OSORIO HENAO ",
      c30: "Ingeniería Industrial",

      n31: "CHRISTIAN GALLO PELAEZ  ",
      c31: "Ingeniería de Sistemas e Ingeniería Industrial",

      n32: "JUAN JOSE BOHORQUEZ JARAMILLO ",
      c32: "Ingeniería de Sistemas",

      n33: "CAMILO CAMPAZ JIMENEZ  ",
      c33: "Ingeniería de Sistemas",

      n34: "JUAN ANDRES DOMINGUEZ RODRIGUEZ ",
      c34: "Ingeniería Industrial",

      n35: "CAMILO ANDRES ESCOBAR ARTEAGA ",
      c35: "Ingeniería de Sistemas",

      n36: "ALEJANDRO FONSECA FORERO",
      c36: "Ingeniería Industrial",

      n37: "VIVIAN ANDREA GALLEGO GARCIA ",
      c37: "Ingeniería Industrial",

      n38: "SEBASTIAN GARCIA ACOSTA",
      c38: "Ingeniería  de Sistemas",

      n39: "CAMILO GONZALEZ VELASCO  ",
      c39: "Ingeniería Telemática",

      n40: "SANTIAGO HURTADO SOLIS ",
      c40: "Ingeniería Industrial",

      n41: "DIANA CAROLINA JARAMILLO JARAMILLO ",
      c41: "Ingeniería Industrial",

      n42: "JUAN DIEGO LORA LARA ",
      c42: "Ingeniería Industrial",

      n43: "JUAN SEBASTIAN MORALES VILLA ",
      c43: "Ingeniería de Sistemas",

      n44: "JESSICA DANIELA OTERO FERNANDEZ ",
      c44: "Ingeniería de Sistemas",

      n45: "JOHAN STIVEN RICARDO SIBAJA ",
      c45: "Ingeniería de Sistemas",

      n46: "MARCO FIDEL VASQUEZ RIVERA ",
      c46: "Ingeniería Industrial",

      n47: "ESTEBAN YUSUNGUAIRA LOPEZ  ",
      c47: "Ingeniería de Sistemas e Ingeniería Telemática",


      /*
      node: [
        { id: 0, label: "0", group: 0 },
        { id: 1, label: "1", group: 0 },
        { id: 2, label: "2", group: 0 },
        { id: 3, label: "3", group: 1 },
        { id: 4, label: "4", group: 1 },
        { id: 5, label: "5", group: 1 },
        { id: 6, label: "6", group: 2 },
        { id: 7, label: "7", group: 2 },
        { id: 8, label: "8", group: 2 },
        { id: 9, label: "9", group: 3 },
        { id: 10, label: "10", group: 3 }
      ],
      edges:[
        { from: 1, to: 0 },
        { from: 2, to: 0 },
        { from: 4, to: 3 },
        { from: 5, to: 4 },
        { from: 4, to: 0 },
        { from: 7, to: 6 },
        { from: 8, to: 7 },
        { from: 7, to: 0 },
        { from: 10, to: 9 }
      ],

      options: {
        nodes: {
        shape: "dot",
        size: 30,
        font: {
          size: 32,
          color: "#ffffff",
        },
        borderWidth: 2,
      },
      edges: {
        width: 2,
      },
    },
   methods: {
     solve() {
      network = new Network(document.getElementById('mynetwork'), this.network, this.network.options);
     }
   }
   */

  }
  }
};
</script>
