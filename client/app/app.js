import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import AppComponent from './app.component';

// child modules
import ComponentsModule from './components/components.module';

angular.module('app', [
  ComponentsModule.name /** ng1 vs. ngx **/
])
  .component('mainApp', AppComponent)
;
 