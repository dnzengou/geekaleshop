ContactManager.Models.Contact = Backbone.Model.extend({
    defaults: {
        name: null,
        tel: null,
        email: null,
        avatar: null,
        favorite: false,
        position: null,
        address: null,
        linkedin: null,
    }
});