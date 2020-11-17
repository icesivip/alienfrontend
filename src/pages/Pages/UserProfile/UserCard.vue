<template>
  <card class="card-user">
    <p class="card-text"></p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="javascript:void(0)">
        <img class="avatar" src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-person_90382.png" alt="..." />
          <h5 class="title">{{name}}</h5>
      </a>
      <p class="description">{{carrer}}</p>
    </div>
    <!--<div slot="footer" class="button-container">
      <base-button class="btn-linkedin" icon round>
        <i class="fab fa-linkedin" ><a  href="https://www.linkedin.com/feed/"></a></i>
      </base-button>
    </div>-->
  </card>
</template>
<script>

export default {
  props: {
    name: String,
    carrer: String,
    img: String,
    link: String
  },
  
};
</script>
<style></style>
