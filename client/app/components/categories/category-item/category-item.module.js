import angular from 'angular';
import CategoryItemComponent from './category-item.component';

const CategoryItemModule = angular.module('categoryItem',[])
    .component('categoryItem', CategoryItemComponent);