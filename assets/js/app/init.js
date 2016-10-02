(function($) {
    'use strict';

    $.AppInit = function()
    {
        this.elements = {
            body: $('body'),
            content: $('#mainContent'),
            progressBar: $('#progress'),
            overlayCurrentID: $('#overlay-currentID'),
            overlayCurrentName: $('#overlay-currentName'),
            overlayMax: $('#overlay-max'),
            navigation: $('#nav-list'),
            search: $('#search')
        };

        this.settings = {
            xmlDatas: null,
            feedNb: 0,
            feedTypes: [],
            loadingProgression: 0,
        };

    };

    $.AppInit.prototype =
    {
        init: function()
        {
            this.getDatas();
        },

        /**
        * URL du flux du site 
        */
        getDatas: function()
        {
            var self = this;

            $.ajax({
                type: "GET",
                url: "datas/datas.xml",

                success: function(xml) {
                    self.settings.xmlDatas = xml;
                    self.settings.feedNb = $(xml).find('channel > item').length;
                    self.elements.overlayMax.html(self.settings.feedNb);
                    self.getFeeds();
                }
            });
        },

        /**
        * URL du flux du site 
        */
        getFeeds: function()
        {
            for (var feedID = 0; feedID < this.settings.feedNb; feedID++) {
                this.getPostsFromFeed(feedID); 
            }
        },

        /**
        * URL du flux du site 
        */
        getPostsFromFeed(feedID)
        {
            var self = this;

            $.ajax( {
                type: "GET",
                url: "app/getFeedDatas.php",
                cache: false,
                data: { feedID : feedID },

                success: function(result) {

                    if (result) {

                        self.settings.loadingProgression++;

                        self.elements.content.append(result);

                        var feedTitle = $(result).find('h2 > a').eq(0).html();
                        var feedType = $(result).data('type');

                        self.addMenuItem(feedTitle, feedType);
                        self.updateOverlay(feedTitle);
                        self.updateProgressBar();

                        if (self.settings.loadingProgression == self.settings.feedNb) {
                            self.setApplicationAvailable();
                        }


                    }
                },
                error: function(result) {
                    console.log('Erreur pour le feed n ' + feedID);
                }
            });
        },

        addMenuItem: function(title, type) {

            var self = this;

            // Add type
            if (-1 == $.inArray(type, this.settings.feedTypes)) {

                var item = $('<li/>', {
                    'data-type': type,
                    'class': 'nav-item'
                });
                
                $('<a/>', {
                    'text': type,
                    'data-type': type,
                    'href': '#/type/'+type
                }).appendTo(item);

                $('<ul/>', {
                    'class': 'nav-sub'
                }).appendTo(item);

                item.appendTo(this.elements.navigation);

                this.settings.feedTypes.push(type);
            }

            this.addMenuSubItem(title, type);
        },

        addMenuSubItem: function(title, type)
        {
            var prettyTitle = title.replace(' ', '-').toLowerCase();
            var link = $('<a/>', {
                'text': title,
                'data-feed': title,
                'href': '#/feed/'+prettyTitle
            });
            var item = $('<li/>');
            link.appendTo(item);
            item.appendTo(this.elements.navigation.find('li[data-type="'+type+'"] > ul'));
        },

        updateOverlay: function(title)
        {
            this.elements.overlayCurrentID.html(this.settings.loadingProgression);
            this.elements.overlayCurrentName.append(
                $('<p/>', {
                    text: title
                })
            );
        },

        updateProgressBar: function()
        {
            var ratio = this.settings.loadingProgression / this.settings.feedNb * 100;
            this.elements.progressBar.css('width', ratio + '%');
        },

        /**
        * URL du flux du site 
        */
        setApplicationAvailable: function()
        {
            this.elements.body.addClass('is-available');

            var appBehaviors = new $.AppBehaviors();
            appBehaviors.init();
        },
    };
    
    /**
     * onReady
     */
    $(document).ready(function() {
        var appInit = new $.AppInit();
        appInit.init();
    });
})(jQuery);