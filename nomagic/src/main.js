require('../node_modules/bootstrap/dist/css/bootstrap.min.css')
import Vue from "vue"
new Vue({
    el: "#app",
    template: `<div class="text-center p-3">
                   <h1 class="bg-secondary text-white p-3">
                       Vue: Button Not Pressed
                   </h1>
                   <button class="btn btn-secondary">
                  Press Me
            </button>
            </div>`
          });