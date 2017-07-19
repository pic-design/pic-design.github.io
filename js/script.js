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
        template: "<button class='pic-button edit' >編輯</button><button class='pic-button detail' style='margin-left:4px;' >明細</button>",
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
        template: "<button class='pic-button edit' >編輯</button>",
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

  var isDisabled = function(el){
     //console.log(el.hasClass('pic-button--disabled'));
     if(el.hasClass('pic-button--disabled')) {
       // button is disabled
       return true;
     } else {
       // button is not disabled
       return false;
     }
  };

  var isValidated = function(el){
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

});
