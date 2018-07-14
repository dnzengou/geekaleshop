ContactManager.Views.ContactDelete = Marionette.ItemView.extend({
    template: '#tpl-delete-contact',
    triggers: {
        'click .js-delete-yes': 'delete:affirmative',
        'click .js-delete-no': 'delete:negative',
    }
});