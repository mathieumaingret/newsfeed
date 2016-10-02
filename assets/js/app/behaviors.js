(function($) {
    'use strict';

    $.AppBehaviors = function()
    {
        this.elements = {
            body: $('body'),
            content: $('#mainContent'),
            accounts: $('.feed'),
            navigation: $('#nav-list'),
            navigationItems: $('#nav-list li'),
            navigationMainItems: $('#nav-list > li > a'),
            navigationSubItems: $('#nav-list > li > ul a'),
            search: $('#search')
        };

        this.settings = {
        };

    };

    $.AppBehaviors.prototype =
    {
        init: function()
        {
            this.navMain();
            this.filterHandlers();
        },

        navMain: function()
        {
            var self = this;
            
            this.elements.navigationMainItems.click(function(event) {
                event.preventDefault();
                self.elements.navigationItems.removeClass('is-active');
                $(this).parent().toggleClass('is-active');
            });
        },

        filterHandlers: function() {
            var self = this;

            this.elements.search.keyup(function() {
                self.filterAccounts('feed', $(this).val())
            });
            this.elements.navigationMainItems.click(function(event) {
                self.filterAccounts('type', $(this).data('type'));
            });
            this.elements.navigationSubItems.click(function(event) {
                event.preventDefault();
                self.filterAccounts('feed', $(this).data('feed'));
            });
        },

        filterAccounts: function(type, value) {

            if (value == '') {

                this.elements.accounts.addClass('is-visible');

            } else {

                this.elements.accounts
                    .removeClass('is-visible')
                    .filter('[data-'+type+'^="'+value+'"]')
                        .addClass('is-visible');
            }

            this.elements.body.scrollTop(0);
        }
    };
})(jQuery);