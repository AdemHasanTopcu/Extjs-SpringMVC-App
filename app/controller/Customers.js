Ext.define('ExtJsSpringApp.controller.Customers', {
    extend: 'Ext.app.Controller',
    init: function () {
        var row = this;
        row.control({
            'viewport': {
                render: row.onPanelRendered
            },
            'customerList': {
                itemdblclick: row.editCustomer
            },
            'customerEdit button[action=save]':{
                click: row.saveCustomer
            }
        });
    },
    onPanelRendered: function () {
        console.log('Panel render edildi')
    },

    editCustomer: function (grid, record) {
        console.log('Satıra iki kez tıklandı: '+ record.get('name'));
        var customerEditDialog = Ext.widget('customerEdit');
        customerEditDialog.down('form').loadRecord(record);
    },
    saveCustomer: function (button){
        console.log('kaydet');
        var window = button.up('window'),
            form = window.down('form'),
            record = form.getRecord(),
            values = form.getValues();
        record.set(values);
        window.close();
    }
});
