import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		addNew: function registerNewUser(){
			var user = this.store.createRecord('user',{
				name: this.controller.get('name')
			}); 

			var self = this;
			user.save().then( () => {
				console.log('Save successful');
				this.controller.set('message','A new user with the name <' + this.controller.get('name') + "> was added.");
				this.controller.set('name',null);
			},
			function onSaveFailed(e){
				console.log('Save FAILED!',e);
				self.controller.set('message',e.message);
			} );
		}
	}
});
