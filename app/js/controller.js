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
                name: 'Kristin S.',
                tel: '210-270-8888',
                email: 'KristinS@transifex.com',
                avatar: '1.png',
                position: 'Operations',
                address: 'Marinou Antipa 41-45, Neo Iraklio, Attiki, Greece',
                linkedin: ''

            },
            {
                id: 2,
                name: 'Mike G. Manning',
                tel: '210-270-8881',
                email: 'MikeManning@transifex.com',
                avatar: '2.png',
                position: 'Awesome Software Engineer 1',
                address: 'Marinou Antipa 41-45, Neo Iraklio, Attiki, Greece',
                linkedin: ''
            },
            {
                id: 3,
                name: 'Thanos K.',
                tel: '210-270-8882',
                email: 'ThanosK@transifex.com',
                avatar: '3.png',
                position: 'Awesome Software Engineering 2',
                address: 'Marinou Antipa 41-45, Neo Iraklio, Attiki, Greece',
                linkedin: ''
            },
            {
                id: 4,
                name: 'Konstantinos B.',
                tel: '210-270-8883',
                email: 'KonstantinosB@transifex.com',
                avatar: '4.png',
                position: 'Awesome Software Engineering 2',
                address: 'Marinou Antipa 41-45, Neo Iraklio, Attiki, Greece',
                linkedin: ''
            },
            {
                id: 5,
                name: 'Dimitris Glezos',
                tel: '210-270-8884',
                email: 'DimitrisGlezos@transifex.com',
                avatar: '5.png',
                position: 'CEO',
                address: 'Menlo Park, CA 94025.',
                linkedin: 'linkedin.com/in/glezos'
            },
            {
                id: 6,
                name: 'Anita Kutlesa',
                tel: '210-270-8885',
                email: 'AnitaKutlesa@transifex.com',
                avatar: '6.png',
                position: 'CFO',
                address: 'Marinou Antipa 41-45, Neo Iraklio, Attiki, Greece',
                linkedin: 'linkedin.com/in/anita-kutlesa-27a5382'
            },
            {
                id: 7,
                name: 'Antonios Garnelis',
                tel: '210-270-8886',
                email: 'AntoniosGarnelis@transifex.com',
                avatar: '7.png',
                position: 'VP Product',
                address: 'Marinou Antipa 41-45, Neo Iraklio, Attiki, Greece',
                linkedin: 'linkedin.com/in/antonios-garnelis-09778835'
            },
            {
                id: 8,
                name: 'Garrick Jang',
                tel: '210-270-8887',
                email: 'GarrickJang@transifex.com',
                avatar: '8.png',
                position: 'VP Sales',
                address: 'Marinou Antipa 41-45, Neo Iraklio, Attiki, Greece',
                linkedin: 'linkedin.com/in/garrick-jang-3949a838'
            },
            {
                id: 9,
                name: 'Désiré N.',
                tel: '210-270-8880',
                email: 'DesireN@transifex.com',
                avatar: '9.png',
                position: 'Candidate',
                address: '1050 Ixelles, Brussels, Belgium',
                linkedin: 'linkedin.com/in/ednzengou'
            },
            {
                id: 10,
                name: 'Nick K.',
                tel: '210-270-8889',
                email: 'NickK@transifex.com',
                avatar: '10.png',
                position: 'Sales',
                address: 'Marinou Antipa 41-45, Neo Iraklio, Attiki, Greece',
                linkedin: ''
            },
            {
                id: 11,
                name: 'Katerina M.',
                tel: '210-270-88810',
                email: 'KaterinaM@transifex.com',
                avatar: '11.png',
                position: 'Design',
                address: 'Marinou Antipa 41-45, Neo Iraklio, Attiki, Greece',
                linkedin: ''
            }
        ], function(contact) {
            this._contacts.create(contact);
        }, this);
    }
});