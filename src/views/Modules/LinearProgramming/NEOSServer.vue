<template>
  <div>
    <div>
      <h2 class="text-center">AMPL Editor</h2>
    </div>
    <card>
      <h4 class="card-title">How to use?</h4>
      <p>
        This editor will allow you to specify and solve linear programs
        expressed in AMPL sintax. You should provide instruction to the model,
        data (if necessary) and a command file that specifies how you want to
        solve your model. Your model will be sent to NEOS Server to be solved,
        and the generated output will be presented to you. Remember, this editor
        does not include sintax validation, so be sure to check your input
        before you submit.
      </p>
    </card>

    <card>
      <h4 class="card-title">Model</h4>
      <codemirror v-model="model" :options="cmOptions" />
      <!-- <prism-editor
        v-model="model"
        :lineNumbers="true"
        language="js"
        class="editor"
      /> -->
    </card>

    <card>
      <h4 class="card-title">Data</h4>
            <codemirror v-model="data" :options="cmOptions" />
      <!-- <prism-editor
        v-model="data"
        :lineNumbers="true"
        language="js"
        class="editor"
      /> -->
    </card>

    <card>
      <h4 class="card-title">Commands</h4>
            <codemirror v-model="commands" :options="cmOptions" />
      <!-- <prism-editor
        v-model="commands"
        :lineNumbers="true"
        language="js"
        class="editor"
      /> -->
    </card>

    <base-button type="primary" block @click="solve">
      Solve
    </base-button>
  </div>
</template>

<script>
// import "prismjs";
// import "prismjs/themes/prism-tomorrow.css";
// //vue-prism-editor dependency
// import "vue-prism-editor/dist/VuePrismEditor.css";
// import PrismEditor from "vue-prism-editor";
import { codemirror } from "vue-codemirror";

// import base style
import "codemirror/lib/codemirror.css";
// import "codemirror/theme/base16-dark.css";
// import "codemirror/theme/cobalt.css";
import "codemirror/theme/monokai.css";
import 'codemirror/mode/javascript/javascript.js'
export default {
  data() {
    return {
      data: "## Put your sets and data definition here",
      model: "## Define your LP model here",
      commands: "## Specify how you want to solve your model",
      cmOptions: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "monokai",
        lineNumbers: true,
        line: true
        // more CodeMirror options...
      }
    };
  },

  components: {
    codemirror
  },
  methods: {
    solve() {
      console.log({
        data: this.data,
        model: this.model,
        commands: this.commands
      });
    },
    change() {}
  }
};
</script>

<style>
.editor {
  max-height: 300px;
}
</style>
