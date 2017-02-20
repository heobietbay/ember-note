import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.onerror = function(error) {
	console.dir(error);
    /*Ember.$.ajax('/error-notification', {
        type: 'POST',
        data: {
            stack: error.stack,
            otherInformation: 'exception message'
        }
    });*/
}

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
