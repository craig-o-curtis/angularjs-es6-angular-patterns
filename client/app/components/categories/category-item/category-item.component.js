import template from './category-item.html';
import './category-item.styl';

const CategoryItemComponent = {
  bindings: {
    category: '<', // one-way data-binding
    selected: '&' // talk to parent
  },
  template,
  controllerAs: 'categoryItemCtrl' // even though no ctrl, use this to access bindings
};

export default CategoryItemComponent;