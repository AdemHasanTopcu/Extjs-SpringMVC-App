Ext.define('ExtJsSpringApp.view.customer.CustomerEdit', {
    extend: 'Ext.window.Window',
    xtype: 'customerEdit',
    title: 'Kullanıcı Düzenle',
    layout: 'fit',
    autoShow: true,

    items: {
        xtype: 'form',
        items: [
            {xtype: 'textfield', name: 'firstName', fieldLabel: 'İsim'},
            {xtype: 'textfield', name: 'email', fieldLabel: 'Mail'}
        ]
    },
    buttons: [
        {text: 'Kaydet', action: 'save'}
    ]

});
