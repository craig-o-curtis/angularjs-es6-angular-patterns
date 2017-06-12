import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import AppComponent from './app.component';

// child modules
import ComponentsModule from './components/components.module';
import CommonModule from './common/common.module';

angular.module('app', [
  ComponentsModule.name, /** ng1 vs. ngx **/
  CommonModule.name
])
  .component('mainApp', AppComponent)
;
 