var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');

Ext.define('ExtJsSpringApp.view.customer.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.customerList',
    title: 'Tüm Kullanıcılar',
    store: 'Customers',
    columns: [
        {header: 'İsim', dataIndex: 'firstName', flex: 1},
        {header: 'Mail', dataIndex: 'email', flex: 3}
    ],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Ekle',
            iconCls: 'icon-add',
            handler: function() {
                // empty record
                store.insert(0, new Customer());
                rowEditing.startEdit(0, 0);
            }
        }, '-', {
            text: 'Sil',
            iconCls: 'icon-del',
            handler: function() {
                var selection = grid.getView().getSelectionModel().getSelection()[0];
                if (selection) {
                    store.remove(selection);
                }
            }
        }]
    }]

});
