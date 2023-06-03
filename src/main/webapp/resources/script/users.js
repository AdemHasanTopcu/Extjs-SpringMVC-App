Ext.onReady(function () {
  Ext.define('HasanProject.model.User', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'id', type: 'bigint'},
      {name: 'firstName',  type: 'string'},
      {name: 'lastName',  type: 'string'},
      {name: 'email',  type: 'string'}
    ]
  });
 
  Ext.define('HasanProject.store.Users', {
    extend  : 'Ext.data.Store',
    storeId	: 'userStore',
    model   : 'HasanProject.model.User',
    fields  : ['id', 'firstName', 'lastName', 'email'],
    proxy	: {
        type	: 'ajax',
        url		: '/user/getAllUser.ajax',
        reader	: {
            type	: 'json',
            root	: 'Users'
        }
    },
    autoLoad: true
  });
 
  Ext.define('HasanProject.view.UsersList', {
    extend	: 'Ext.grid.Panel',
    alias	: 'widget.userslist',
    title	: 'Kullanıcılar',
    store	: 'Users',
    initComponent: function () {
      this.tbar = [{
        text    : 'Kullanıcı Ekle',
        action  : 'add',
        icon : 'resources/images/add.png'
      }];
      this.columns = [
        { header: 'Id', dataIndex: 'id' },
        { header: 'Adı', dataIndex: 'firstName' },
        { header: 'Soyadı', dataIndex: 'lastName' },
        { header: 'E-Posta', dataIndex: 'email' },
        { header: 'Delete', width: 50,
          renderer: function (v, m, r) {
            var id = Ext.id();
            Ext.defer(function () {
              Ext.widget('image', {
                renderTo: id,
                name: 'delete',
                src : 'resources/images/delete.png',
                listeners : {
                  afterrender: function (me) { 
                    me.getEl().on('click', function() {
                      var grid = Ext.ComponentQuery.query('userslist')[0];
                      if (grid) {
                        var sm = grid.getSelectionModel();
                        var rs = sm.getSelection();
                        if (!rs.length) {
                          Ext.Msg.alert('Info', 'Kullanıcı Seçilmedi');
                          return;
                        }
                        Ext.Msg.confirm('Kullanıcı Silme',
                          'Kullanıcıyı silmek istiyor musunuz?',
                          function (button) {
                            if (button == 'yes') {
                              //grid.store.remove(rs[0]);
                            	var user = rs[0].getData();
                            	Ext.Ajax.request({
                            	    url		: '/user/deleteUser.ajax',
                            	    method  : 'POST',
                            	    jsonData: user,
                            	    success: function(response){
                            	    	var grid = Ext.ComponentQuery.query('userslist')[0];
                            	        grid.getStore().load();
                            	    }
                            	});
                            }
                        });
                      }
                    });
                  }
                }
              });
            }, 50);
            return Ext.String.format('<div id="{0}"></div>', id);
          }
        }
      ];
      this.callParent(arguments);
    }
  });

    Ext.define('HasanProject.view.UsersForm', {
      extend  : 'Ext.window.Window',
      alias   : 'widget.usersform',
      title   : 'Kullanıcı Ekle',
      width   : 350,
      layout  : 'fit',
      resizable: false,
      closeAction: 'hide',
      modal   : true,
      config  : {
        recordIndex : 0,
        action : ''
      },
      items   : [{
        xtype : 'form',
        layout: 'anchor',
        bodyStyle: {
          background: 'none',
          padding: '10px',
          border: '0'
        },
        defaults: {
          xtype : 'textfield',
          anchor: '100%'
        },
        items : [{
          name  : 'id',
          fieldLabel: 'ID'
        },{
          name  : 'firstName',
          fieldLabel: 'Adı'
        },{
          name: 'lastName',
          fieldLabel: 'Soyadı'
        },{
          name: 'email',
          fieldLabel: 'E-Posta'
        }]
      }],
      buttons: [{
        text: 'OK',
        action: 'add'
      },{
        text    : 'Temizle',
        handler : function () { 
          this.up('window').down('form').getForm().reset(); 
        }
      },{
        text   : 'İptal',
        handler: function () { 
          this.up('window').close();
        }
      }]
    });
 
  Ext.define('HasanProject.controller.Users', {
    extend  : 'Ext.app.Controller',
    stores  : ['Users'],
    views   : ['UsersList', 'UsersForm'],
    refs    : [{
      ref   : 'formWindow',
      xtype : 'usersform',
      selector: 'usersform',
      autoCreate: true
    }],
    init: function () {
      this.control({
        'userslist > toolbar > button[action=add]': {
          click: this.showAddForm
        },
        'userslist': {
          itemdblclick: this.onRowdblclick
        },
        'usersform button[action=add]': {
          click: this.doAddUser
        }
      });
    },
    onRowdblclick: function(me, record, item, index) {
      var win = this.getFormWindow();
      win.setTitle('Kullanıcı Düzenle');
      win.setAction('edit');
      win.setRecordIndex(index);
      win.down('form').getForm().setValues(record.getData());
      win.show();
    },
    showAddForm: function () {
      var win = this.getFormWindow();
      win.setTitle('Kullanıcı Ekle');
      win.setAction('add');
      win.down('form').getForm().reset();
      win.show();
    },
    doAddUser: function () {
      var win = this.getFormWindow();
      var store = this.getUsersStore();
      var values = win.down('form').getValues();
      
      var action = win.getAction();
   //   var user = Ext.create('HasanProject.model.User', values);
      var url = '';
      if(action == 'edit') {
    	  url = '/user/updateUser.ajax';
      }
      else {
    	  url = '/user/createUser.ajax';
      }
      Ext.Ajax.request({
  		url		: url,
    	method  : 'POST',
    	jsonData: values,	
    	success: function(response){
    	    	store.load();
    		}
    	});
      win.close();
    }
  });
 
  Ext.application({
    name  : 'HasanProject',
    controllers: ['Users'],
      launch: function () {
        Ext.widget('userslist', {
          width : 1500,
          height: 600,
          renderTo: 'output'
        });
      }
    }
  );
});