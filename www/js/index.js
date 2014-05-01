/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 function permissionCallback (button) {
                if (button === 1)
                    gaPlugin.init(nativePluginResultHandler, nativePluginErrorHandler, "UA-35462480-6", 10);
            }

            function nativePluginResultHandler (result) {
                //alert('nativePluginResultHandler - '+result);
                console.log('nativePluginResultHandler: '+result);

            }
        
            function nativePluginErrorHandler (error) {
                //alert('nativePluginErrorHandler - '+error);
                console.log('nativePluginErrorHandler: '+error);
            }
            
            function TrackButtonClicked() {
                gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Button", "Click", "event only", 1);
            }
        
            function VariableButtonClicked() {
                // Set a dimension based on index and value. Make sure you have added a dimension in the GA dashboard to the
                // default property for the passed in index, and your desired scope. GA allows up to 20 dimensions for a free account
                gaPlugin.setVariable( nativePluginResultHandler, nativePluginErrorHandler, 1, "Purple");

                // dimensions are are passed to the next event sent to GA. go ahead and fire off an event with the label (key) of your choice
                // In this example, the label for custom dimension 1 will show up in the dashboard as "favoriteColor". This is much more efficent
                // than the old custom variable method introduced in V1, (plus you get 20 free dimensions vs 5 free custom variables)
                gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "event with variable", "set variable", "favoriteColor", 1);
            }
        
            function PageButtonClicked() {
                gaPlugin.trackPage( nativePluginResultHandler, nativePluginErrorHandler, "/login");
            }
            
            function goingAway() {
                gaPlugin.exit(nativePluginResultHandler, nativePluginErrorHandler);
            }

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        gaPlugin = window.plugins.gaPlugin;

        gaPlugin.init(nativePluginResultHandler, nativePluginErrorHandler, "UA-35462480-6", 10);

        gaPlugin.trackPage( nativePluginResultHandler, nativePluginErrorHandler, "/login");

        gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "event", "screen-viewed", "screen-viewed", 1);
    }
};
