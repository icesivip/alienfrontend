<template>
    <div>
        <card>
            <h2>Select your file</h2>
            <div>
                <label for="clusteringFile" class="my-auto">Choose your file</label>
                <el-input type="file" outlined id="clusteringFile"></el-input>
                <base-button>Send</base-button> 
            </div>
        </card>
    </div>
</template>

<script>
export default {
    name:"km",
    data(){

        return{

        }
    },

    methods: {

    }
}
</script>

<style>

</style>