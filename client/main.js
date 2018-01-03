require('bootstrap/dist/css/bootstrap.min.css');

import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(VueResource);
Vue.use(VueRouter);

new Vue({
	el: '#app',
	created: function () {
		window.Vue = this
	},
	render: h => h(App)
});