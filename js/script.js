$(document).ready(function() {

  $('#ham').on('click', function(){
    if ($('.pic-sidebar').hasClass('pic-sidebar--hidden')) {
      $('.pic-sidebar').removeClass('pic-sidebar--hidden');
    } else {
      $('.pic-sidebar').addClass('pic-sidebar--hidden');
    }
  });

  $(".pic-nav").kendoTreeView({
    select: onSelect
  });

  $('.datepicker').kendoDatePicker();

  $('#person').kendoComboBox({
    dataTextField: "text",
    dataValueField: "number",
    dataSource: [
      {text: '孫小美', number: 1},
      {text: '阿土伯', number: 2},
      {text: '錢夫人', number: 3},
      {text: '李逍遙', number: 4},
      {text: '林月如', number: 5}
    ],
    select: function(event){
      //console.log(event);
      var number = event.dataItem.number;
      var sender = event.sender;
      var display = sender.element.closest('.pic-form-group').find('.combobox-display');
      display.val(number);
    }
  });

  $("#main-grid").kendoGrid({
    dataSource: [],
    height: 550,
    sortable: true,
    pageable: {
        //refresh: true,
        pageSize: 10,
        //buttonCount: 5
    },
    columns:[
      {
        selectable: true,
        width: 40
      },
      {
        template: "<button class='pic-button' client-id='btn_edit'>編輯</button>",
        width:70,
        attributes: {
          "class": "align-center"
        },
      },
      {
        field: "group_id",
        title: "群組代號",
        width:230
      },
      {
        field: "group_name",
        title: "群組名稱",
        width: 230
      },
      {
        field:"count",
        title:"使用數量",
        attributes: {
        	"class": "align-right"
        },
        width:80
      },
      {
        field: "create_date",
        title: "建立日期",
        width:170
      },
      {
        field: "create_id",
        title: "建立人員",
        width:170
      },
      {
        field: "upd_date",
        title: "異動日期",
        width:170
      },
      {
        field: "upd_id",
        title: "異動人員",
        width:170
      }
    ]
  });

  $('#master-grid').kendoGrid({
    dataSource: [],
    height: 550,
    sortable: true,
    pageable: {
      //refresh: true,
      pageSize: 20,
      //buttonCount: 5
    },
    columns: [
      {
        selectable: true,
        width: 40
      },
      {
        template: "<button class='pic-button edit' client-id='btn_edit'>編輯</button><button class='pic-button detail' style='margin-left:4px;' >明細</button>",
        width: 80,
      },
      {
        field: "group_id",
        title: "活動代號",
        width: 100,
        attributes: {
          "class": "align-right"
        }
      },
      {
        field: "group_name",
        title: "活動名稱",
        width: 230,
      },
      {
        field: "number",
        title: "作業簡號",
        width: 100,
        attributes: {
          "class": "align-right"
        }
      },
      {
        field: "quantity",
        title: "數量",
        width: 80,
        attributes: {
          "class": "align-right"
        },
        format: "{0:n}"
      },
      {
        field: "price",
        title: "金額",
        width: 80,
        attributes: {
          "class": "align-right"
        },
        format: "{0:n}"
      },
      {
        field: "sale",
        title: "廠商折扣",
        width: 80,
        attributes: {
          "class": "align-right"
        }
      }
    ]
  });

  $('#detail-grid').kendoGrid({
    dataSource: mdData,
    height: 550,
    sortable: true,
    pageable: {
      //refresh: true,
      pageSize: 20,
      //buttonCount: 5
    },
    columns: [
      {
        selectable: true,
        width: 40
      },
      {
        template: "<button class='pic-button edit' client-id='btn_edit'>編輯</button>",
        width: 60,
      },
      {
        field: "group_id",
        title: "活動代號",
        width: 100,
        attributes: {
          "class": "align-right"
        }
      },
      {
        field: "group_name",
        title: "活動名稱",
        width: 230,
      },
      {
        field: "number",
        title: "作業簡號",
        width: 100,
        attributes: {
          "class": "align-right"
        }
      },
      {
        field: "quantity",
        title: "數量",
        width: 80,
        attributes: {
          "class": "align-right"
        },
        format: "{0:n}"
      },
      {
        field: "price",
        title: "金額",
        width: 80,
        attributes: {
          "class": "align-right"
        },
        format: "{0:n}"
      },
      {
        field: "sale",
        title: "廠商折扣",
        width: 80,
        attributes: {
          "class": "align-right"
        }
      }
    ]
  });

  window.isDisabled = function(el){
     //console.log(el.hasClass('pic-button--disabled'));
     if(el.hasClass('pic-button--disabled')) {
       // button is disabled
       return true;
     } else {
       // button is not disabled
       return false;
     }
  };

  window.isValidated = function(el){
    var requires = el.find('.pic-form-control[required]');
    // console.log(requires);
    requires.each(function () {
      if (!$(this).val()) {
        $(this).addClass('not');
      }else{
        $(this).removeClass('not');
      }
    });

    var length = el.find('.not').length;
    if (length > 0) {
      return false;
    } else {
      return true;
    }
  };



  //查詢模式
  window.query_mode = function (content) {
    //換至此模式時清空查詢結果區與所有查詢欄位
    $("#foo").val("");
    $("#foe").val("");
	var grid = content.find('.pic-grid')[0].id;
	if(typeof $("#" + grid).data("kendoGrid") != 'undefined')
	{
		if(grid == 'master-grid' || grid == 'detail-grid')
		{
			$("#" + grid).data("kendoGrid").dataSource.data([]);
		}
		else
		{

			$("#" + grid).data("kendoGrid").dataSource.data([]);
		
		}
	}
    content.find("[client-id='pageMode']").attr('pre-value', $("[client-id='pageMode']").attr('data-value'));
    content.find("[client-id='pageMode']").attr('data-value', 'Query');
    content.find("[client-id='pageMode']").text('查詢');

    //控制項權限
    //查 確 新 編 取 刪 列
    //E  E  E  D  D  D  E
    content.find("[client-id='btn_query']").removeClass("pic-button--disabled");
    content.find("[client-id='btn_confirm']").removeClass("pic-button--disabled");
    content.find("[client-id='btn_add']").removeClass("pic-button--disabled");
    content.find("[client-id='btn_edit']").addClass("pic-button--disabled");
    content.find("[client-id='btn_cancel']").addClass("pic-button--disabled");
    content.find("[client-id='btn_delete']").addClass("pic-button--disabled");
    content.find("[client-id='btn_print']").removeClass("pic-button--disabled");
  }

  //查詢結果模式
  window.result_mode = function (content) {
    var grid = content.find('.pic-grid')[0].id;
	if(grid == 'master-grid' || grid == 'detail-grid')
	{
		$("#" + grid).data("kendoGrid").dataSource.data(mdData);
	}
	else
	{
		 $("#" + grid).data("kendoGrid").dataSource.data(gridData);
	}
   
    content.find("[client-id='pageMode']").attr('pre-value', $("[client-id='pageMode']").attr('data-value'));
    content.find("[client-id='pageMode']").attr('data-value', 'Result');
    content.find("[client-id='pageMode']").text('查詢結果');
    content.find("[client-id='btn_edit']").on("click", function(event) {
        edit_mode(event.currentTarget);
    });

    //控制項權限
    //查 確 新 編 取 刪 列
    //E  D  E  E  D  E  D
    content.find("[client-id='btn_query']").removeClass("pic-button--disabled");
    content.find("[client-id='btn_confirm']").addClass("pic-button--disabled");
    content.find("[client-id='btn_add']").removeClass("pic-button--disabled");
    content.find("[client-id='btn_edit']").removeClass("pic-button--disabled");
    content.find("[client-id='btn_cancel']").addClass("pic-button--disabled");
    content.find("[client-id='btn_delete']").removeClass("pic-button--disabled");
    content.find("[client-id='btn_print']").addClass("pic-button--disabled");
  }

  //編輯模式
  window.edit_mode = function (Target) {
    var row = $(Target).closest("tr");
    var grid = row.closest(".pic-grid").data("kendoGrid");  
	var content = row.closest(".pic-grid").parent();
    //換至此模式時清空查詢欄位資料
    content.find("[client-id='pageMode']").attr('pre-value', $("[client-id='pageMode']").attr('data-value'));
    content.find("[client-id='pageMode']").attr('data-value', 'Edit');
    content.find("[client-id='pageMode']").text('編輯');

    //查詢區帶入上方值
    var dataItem = grid.dataItem(row);
    $("#foo").val(dataItem.group_id);
    $("#foe").val(dataItem.group_name);
	
    //控制項權限
    //查 確 新 編 取 刪 列
    //E  E  D  D  E  D  D
    content.find("[client-id='btn_query']").removeClass("pic-button--disabled");
    content.find("[client-id='btn_confirm']").removeClass("pic-button--disabled");
    content.find("[client-id='btn_add']").addClass("pic-button--disabled");
    content.find("[client-id='btn_edit']").addClass("pic-button--disabled");
    content.find("[client-id='btn_cancel']").removeClass("pic-button--disabled");
    content.find("[client-id='btn_delete']").addClass("pic-button--disabled");
    content.find("[client-id='btn_print']").addClass("pic-button--disabled");
  }

  //新增模式
  window.add_mode = function (content) {
    //換至此模式時清空查詢欄位資料
    $("#foo").val("");
    $("#foe").val("");
    content.find("[client-id='pageMode']").attr('pre-value', $("[client-id='pageMode']").attr('data-value'));
    content.find("[client-id='pageMode']").attr('data-value', 'Add');
    content.find("[client-id='pageMode']").text('新增');
    
    //控制項權限
    //查 確 新 編 取 刪 列
    //E  E  E  D  E  D  D
    content.find("[client-id='btn_query']").removeClass("pic-button--disabled");
    content.find("[client-id='btn_confirm']").removeClass("pic-button--disabled");
    content.find("[client-id='btn_add']").removeClass("pic-button--disabled");
    content.find("[client-id='btn_edit']").addClass("pic-button--disabled");
    content.find("[client-id='btn_cancel']").removeClass("pic-button--disabled");
    content.find("[client-id='btn_delete']").addClass("pic-button--disabled");
    content.find("[client-id='btn_print']").addClass("pic-button--disabled");
  }

  //顯示確認的視窗
  window.open_confirm = function (Message, Title, type) {
    if (document.getElementById("Confirm") == null) {
    $("<div id='Confirm'></div>")
      .appendTo("body");
    }
    var dfd = jQuery.Deferred();
    var result = false;
    $("#Confirm").kendoDialog({
      title: Title,
      animation: false,
      content: Message,
      closable: false,
      buttonLayout: 'normal',
      open: function (e) {
        var dialog = $('#Confirm').parent('.k-dialog');
        var dialogType = '';
        var buttonType = '';

        if (type === 'delete') {
            type = 'dialog-danger';
            buttonType = 'pic-button--danger';
        } else if ( type === 'add' || type === 'edit') {
          type = 'dialog-warning';
          buttonType = 'pic-button--warning';
        }
        dialog.addClass(type);
        dialog.find(".k-button-group").find(".k-button.k-primary").addClass("confirm-button").removeClass('k-primary');
        dialog.find(".k-button-group").find(".k-button").first().addClass(buttonType);
      },
      actions: [{
        text: "確定",
        action: function (e) {
          result = true;
          dfd.resolve(result);
        },
        primary: false
      }, {
          text: "取消",
          primary: true
      }]
    }).data("kendoDialog").open();

    return dfd.promise();
  };

  //顯示訊息的視窗
  window.open_message = function (Message, Title, type) {
    if (document.getElementById("ShowMessage") == null) {
      $("<div id='ShowMessage'></div>").appendTo("body");
    } else {
      $("#ShowMessage").data("kendoDialog").close();
    }

    $("#ShowMessage").kendoDialog({
      title: Title,
      content: Message,
      closable: false,
      buttonLayout: 'normal',
      open: function (e){
        var dialog = $('#ShowMessage').parent('.k-dialog');
        var dialogType = '';
        var buttonType = '';

        if (type === 'delete') {
            type = 'dialog-danger';
            buttonType = 'pic-button--danger';
        } else if ( type === 'add' || type === 'edit') {
          type = 'dialog-warning';
          buttonType = 'pic-button--warning';
        } else if (type === 'success') {
          type = 'dialog-success';
          buttonType = 'pic-button--success';
        }
        dialog.addClass(type);
        dialog.find(".k-button-group").find(".k-button").first().addClass(buttonType);

      },
      actions: [{
        text: "確定",
        action: function (e) {
          // e.sender is a reference to the dialog widget object
          // OK action was clicked
          // Returning false will prevent the closing of the dialog
          $("#ShowMessage").data("kendoDialog").close();
            return true;
          },
      primary: true
    }]
  }).data("kendoDialog").open();
};

query_mode($("#main-grid").parent());
query_mode($("#master-grid").parent());
result_mode($('#detail-grid').parent());
});
