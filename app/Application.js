Ext.define('ExtJsSpringApp.Application', {
    name: 'ExtJsSpringApp',

    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
        'customer.List',
        'customer.CustomerEdit'
    ],

    controllers: [
        // TODO: add controllers here
        'Customers'
    ],

    stores: [
        // TODO: add stores here
        'Customers'
    ]
});
