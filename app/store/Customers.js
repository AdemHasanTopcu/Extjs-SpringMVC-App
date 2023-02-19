Ext.define('ExtJsSpringApp.store.Customers', {
    extend: 'Ext.data.Store',
    model: 'ExtJsSpringApp.model.Customer',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'customer/getAllCustomer.json',
            create: 'customer/createCustomer.json',
            update: 'customer/update/',
            destroy: 'customer/delete/'
        }

    }

});
