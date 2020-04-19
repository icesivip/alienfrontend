<template>
    <div>
        <card class="text-center">
            <h2 class="card-title">Select your file</h2>
            <div class="row justify-content-center">
                <label for="forecastFile" class="my-auto">Choose your file</label>
                <el-input type="file" class="col-md-5 my-1" outlined id="forecastFile"></el-input>
                <base-button class="col-sm-1 primary">Send</base-button>
            </div>
            <div class="row justify-content-center">
                <label class="my-1 col-lg-3">¿No tienes el formato? Descárgalo 
                    <a class="font-weight-bold" v-on:click="downloadFile">aquí</a>.</label>
            </div>
        </card>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>