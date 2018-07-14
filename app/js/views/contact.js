ContactManager.Views.Contact = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'media',
  template: '#tpl-contact',
  triggers: {
    'click .toggle-favorite-contact': 'favorite:clicked'
  }
});
