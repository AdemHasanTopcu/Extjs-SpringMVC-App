Ext.define('ExtJsSpringApp.model.Customer', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'firstName', 'email'],
    validations: [{
        type: 'length',
        field: 'name',
        min: 3
    }, {
        type: 'length',
        field: 'email',
        min: 3
    }]

});
