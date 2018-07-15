ContactManager.Controller = Marionette.Controller.extend({
    initialize: function(options) {
        this._router = options.router;
        this._mainRegion = options.mainRegion;
        this._contacts = options.contacts;

        this._contacts.fetch();

        if (this._contacts.isEmpty()) {
            this._createSampleData();
        }
    },

    showContacts: function() {
        var contactsView = new ContactManager.Views.Contacts({
            collection: this._contacts
        });

        this.listenTo(contactsView, 'addContact:clicked', this.newContact);

        this.listenTo(contactsView, 'itemview:edit:clicked', function(contactView) {
            this.editContact(contactView.model.id);
        });

        this.listenTo(contactsView, 'itemview:favorite:clicked', function(contactView) {
            this.favorContact(contactView.model.id);
        });

        ContactManager.mainRegion.show(contactsView);

        this._router.navigate('contacts');
    },

    newContact: function() {
        var newContactForm = new ContactManager.Views.ContactForm({
            model: new ContactManager.Models.Contact()
        });

        this.listenTo(newContactForm, 'form:submitted', function(attrs) {
            attrs.avatar = _.random(1, 11) + '.png';
            this._contacts.create(attrs);
            this.showContacts();
        });

        this.listenTo(newContactForm, 'form:canceled', this.showContacts);

        ContactManager.mainRegion.show(newContactForm);

        this._router.navigate('contacts/new');
    },

    editContact: function(id) {
        var contact = this._contacts.get(id),
            editContactForm;

        if (contact) {
            editContactForm = new ContactManager.Views.ContactForm({
                model: contact
            });

            this.listenTo(editContactForm, 'form:submitted', function(attrs) {
                contact.save(attrs);
                this.showContacts();
            });

            this.listenTo(editContactForm, 'form:canceled', this.showContacts);

            ContactManager.mainRegion.show(editContactForm);

            this._router.navigate('contacts/edit/' + id);
        } else {
            this.showContacts();
        }
    },

    favorContact: function(id) {
        //Given the id implement the favorite toggling logic
        // Here activated by adding items to the sidebar favorites in the browser
        var contact = this._contacts.get(id);

        $('#Favorite').click(function() {
            if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Favorite
                window.sidebar.addPanel(document.title, window.location.href, '');
            } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
                window.external.AddFavorite(location.href, document.title);
            } else if (window.opera && window.print) { // Opera Hotlist
                this.title = document.title;
                return true;
            } else { // webkit - safari/chrome
                alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D to favorite this contact.');
            }
        });

    },

    deleteContact: function(id) {
        var contact = this._contacts.get(id);
        if (contact) {
            var deleteContact = new ContactManager.Views.ContactDelete({
                model: contact
            });

            this.listenTo(deleteContact, 'delete:affirmative', function(attrs) {
                //Added Deletion logic
                contact.delete(attrs);
            });

            this.listenTo(deleteContact, 'delete:negative', function(attrs) {
                this.showContacts();
            });

            ContactManager.mainRegion.show(deleteContact);
        } else {
            this.showContacts();
        }
    },

    detailContact: function(id) {
        var contact = this._contacts.get(id);
        if (contact) {
            var detailContact = new ContactManager.Views.ContactDetail({
                model: contact
            });
            ContactManager.mainRegion.show(detailContact);
        } else {
            this.showContacts();
        }
    },
    _createSampleData: function() {
        _.each([{
                id: 1,
                name: 'Yannick.',
                tel: '210-270-8888',
                email: 'yannick@geekali.rw',
                avatar: '1.png',
                position: 'Operations',
                address: 'KG 111 St',
                linkedin: ''

            },
            {
                id: 2,
                name: 'Leon',
                tel: '210-270-8881',
                email: 'leon@geekali.rw',
                avatar: '2.png',
                position: 'Operations',
                address: 'KG 222 St',
                linkedin: ''
            },
            {
                id: 3,
                name: 'Ange',
                tel: '210-270-8882',
                email: 'yannick@geekali.rw',
                avatar: '3.png',
                position: 'Operations',
                address: 'KG 333 St',
                linkedin: ''
            },
            {
                id: 9,
                name: 'Désiré',
                tel: '210-270-8880',
                email: 'yannick@geekali.rw',
                avatar: '9.png',
                position: 'Dev Operations',
                address: 'KG 000 St',
                linkedin: 'linkedin.com/in/ednzengou'
            }
        ], function(contact) {
            this._contacts.create(contact);
        }, this);
    }
});
