/**
 * Created by wesley on 6/2/15.
 */


orion.dictionary.addDefinition('title', 'navbar', {
    type: String,
    label: 'Nav Bar Title'
});

if (Meteor.isClient) {

    Session.setDefault('pagesLeft', '[]');
    Session.set('pagesLeft', '[]');

    Session.setDefault('pagesRight', '[]');
    Session.set('pagesRight', '[]');

    Navbar = {

        add: function(item) {


            if (item.menuOrientation === 'left') {

                var leftItems = JSON.parse(Session.get('pagesLeft'));

                leftItems.push(item);

                Session.set('pagesLeft', JSON.stringify(leftItems));
            } else {
                var rightItems = JSON.parse(Session.get('pagesRight'));

                rightItems.push(item);

                Session.set('pagesRight', JSON.stringify(rightItems));
            }
        }

    };

    Template.navbar.helpers({
       pagesLeft: function() {
           return JSON.parse(Session.get('pagesLeft'));
       },
        pagesRight: function() {
            return JSON.parse(Session.get('pagesRight'));
        },
        isActive: function(url) {

            var routeName = null;

            if (Router.current()) {
                routeName = Router.current().url;
            }
            if (!routeName) {
                return '';
            }

            if (routeName.indexOf(url) !== -1) {
                return 'active';
            } else {
                return '';
            }
        },

        isOnAdmin: function() {

            //return true;

            var routeName = null;
            if (Router.current()) {
                routeName = Router.current().url;
            }
            if (!routeName) {
                return false;
            }

            if (routeName.indexOf('admin') !== -1) {
                $('body').removeClass('navbar-fixed-spacer');
                return true;
            } else {
                $('body').addClass('navbar-fixed-spacer');
                return false;
            }

        },

        menuIsToggled: function() {
            if (Session.get('menuToggled')) {
                return 'toggled';
            } else {
                return '';
            }
        }
    });

    Session.setDefault('menuToggled', true);

    Template.navbar.events({
        'click #log-out': function() {
            Meteor.logout();

            Router.go('/');
        },
        'click .fa-bars': function() {
            Session.set('menuToggled', !Session.get('menuToggled'));
        }
    });

}