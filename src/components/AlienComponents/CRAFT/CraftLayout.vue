<template>
  <div>


    <svg>



      <rect v-for="element in dist_to_draw" :key="element.id" :x="element.j*100" :y="element.i*100" width=100  height=100 :style="{fill:element.color, stroke:'pink',strokeWidth:1,fillOpacity:0.8,strokeOpacity:1}">

      </rect>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayDistribution: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 2],
        [0, 1, 1, 1, 2]
      ],
      distributions: []
    };
  },
  methods: {},
  computed: {
    dist_to_draw() {
      var list = new Array();
      var valueSet=new Object();
      for (var i = 0; i < this.displayDistribution.length; i++) {
        for (var j = 0; j < this.displayDistribution[i].length; j++) {
          var value=this.displayDistribution[i][j]
          if (value in valueSet){
            var elem={ id: i + "-" + j, value: this.displayDistribution[i][j] , i:i , j:j , color:valueSet[value]  }
            list.push(elem);
          }else{
            var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
            valueSet[value] =hue;
            var elem={ id: i + "-" + j, value: this.displayDistribution[i][j] , i:i , j:j , color:hue }
            list.push(elem);
          }



        }
      }
      console.log(list);
      return list;
    }
  }
};
</script>

<style></style>
