cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "id": "es6-promise-plugin.Promise",
        "file": "plugins/es6-promise-plugin/www/promise.js",
        "pluginId": "es6-promise-plugin",
        "runs": true
    },
    {
        "id": "cordova-plugin-x-socialsharing.SocialSharing",
        "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
        "pluginId": "cordova-plugin-x-socialsharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "id": "cordova-universal-clipboard.Clipboard",
        "file": "plugins/cordova-universal-clipboard/www/clipboard.js",
        "pluginId": "cordova-universal-clipboard",
        "clobbers": [
            "cordova.plugins.clipboard"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-network-information": "1.3.3",
    "cordova-plugin-whitelist": "1.3.2",
    "es6-promise-plugin": "4.1.0",
    "cordova-plugin-x-socialsharing": "5.1.8",
    "cordova-plugin-inappbrowser": "1.7.1",
    "cordova-universal-clipboard": "0.1.0"
};
// BOTTOM OF METADATA
});