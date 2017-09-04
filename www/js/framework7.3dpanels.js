Framework7.prototype.plugins.panels3d = function (app, params) {
    'use strict';
    params = params || {enabled: false};
    var $ = window.Dom7;

    app.panels3d = {
        enable: function () {
            $('body').addClass('panels-3d');
            params.enabled = true;
        },
        disable: function () {
            $('body').removeClass('panels-3d');
            params.enabled = false;
        },
    };
    if (params.enabled) $('body').addClass('panels-3d');
    
    var leftPanelWidth, rightPanelWidth, leftPanel, rightPanel, views;

    function leftPanelOpen() {
        if (!params.enabled) return;
        views.css({
            '-webkit-transform-origin': '100% center',
            'transform-origin': '100% center',
        });
    }

    function rightPanelOpen() {
        if (!params.enabled) return;
        views.css({
            '-webkit-transform-origin': '0% center',
            'transform-origin': '0% center',
        });
    }


    function appInit() {
        views = $('.views');
        leftPanel = $('.panel-left.panel-reveal');
        rightPanel = $('.panel-right.panel-reveal');

        leftPanel.on('open', leftPanelOpen);
        rightPanel.on('open', rightPanelOpen);
    }

    function setPanelTransform(viewsContainer, panel, perc) {
        if (!params.enabled) return;
        panel = $(panel);
        if (!panel.hasClass('panel-reveal')) return;

    }
    return {
        hooks : {
            appInit: appInit,
            swipePanelSetTransform: setPanelTransform,
        }
    };
};