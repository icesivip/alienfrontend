<template>
    <div>
        <card>
            <h2>Select your file</h2>
            <div class="container">
                <div class="large-12 medium-12 small-12 cell">
                    <label>File
                    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                    </label>
                    <button v-on:click="submitFile()">Submit</button>
                </div>
            </div>
        </card>
    </div>

</template>

<script>
export default {

    name: "Km",

    data(){

        return{
            file: ''
        }

    },

    methods: {
        handleFileUpload(){
            this.file.$refs.file.files[0];
        },

    
        async submitFile(){

            let formData = new FormData();

            formData.append('file', this.file);

            axios.post( '/single-file',
                formData,
                {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(function(){
                console.log('SUCCESS!!');
            })
            .catch(function(){
                console.log('FAILURE!!');
            });
        }
    }
  }

</script>

<style>

</style>