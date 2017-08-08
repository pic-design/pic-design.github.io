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
      var display = sender.element.closest('.pic-form-element').find('.pic-input[readonly]');
      display.val(number);
    }
  });

  var myWindow = $('#window');

  myWindow.kendoWindow({
    title: '員工資料查詢',
    width: '300px',
    content: 'quick-search.html',
    visible: false,
    open: function(){
      $('#qs-grid').kendoGrid({
        dataSource: [],
        height: 165,
        columns: [
          {
            field: 'qs_num',
            title: '門市代號',
            attributes: {
              "class": "qs-num"
            }
          },
          {
            field: 'qs_name',
            title: '門市名稱',
            attributes: {
              "class": "qs-name"
            }
          }
        ]
      })
    }
  });

  var qsData = [
    {'qs_num':'001', 'qs_name':'亞洲分部'},
    {'qs_num':'002', 'qs_name':'非洲分部'},
    {'qs_num':'003', 'qs_name':'北美洲分部'},
    {'qs_num':'004', 'qs_name':'南洲分部'},
    {'qs_num':'005', 'qs_name':'歐洲分部'}
  ];
  myWindow.on('click', '.pic-btn', function () {
    $('#qs-grid').data('kendoGrid').dataSource.data(qsData);
  });

  myWindow.on('click', 'tr', function(event){
    var currentTarget = $(event.currentTarget);

    $('.pic-quick-search').find('.pic-input[name="num"]').val(currentTarget.find('.qs-num').text());
    $('.pic-quick-search').find('.pic-input[name="name"]').val(currentTarget.find('.qs-name').text());
    myWindow.data('kendoWindow').close();
  });

  $('.pic-quick-search').on('click', '.pic-btn', function(){
    myWindow.data('kendoWindow').center().open();
  })

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
        template: "<button class='pic-btn' client-id='btn_edit'>編輯</button>",
        width:70,
        attributes: {
          "class": "pic-align-center"
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
        	"class": "pic-align-right"
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
        template: "<button class='pic-btn edit' client-id='btn_edit'>編輯</button><button class='pic-btn detail' style='margin-left:4px;'   client-id='btn_detail'>明細</button>",
        width: 80,
        attributes: {
          "class": "pic-align-center"
        }
      },
      {
        field: "group_id",
        title: "活動代號",
        width: 100,
        attributes: {
          "class": "pic-align-right"
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
          "class": "pic-align-right"
        }
      },
      {
        field: "quantity",
        title: "數量",
        width: 80,
        attributes: {
          "class": "pic-align-right"
        },
        format: "{0:n}"
      },
      {
        field: "price",
        title: "金額",
        width: 80,
        attributes: {
          "class": "pic-align-right"
        },
        format: "{0:n}"
      },
      {
        field: "sale",
        title: "廠商折扣",
        width: 80,
        attributes: {
          "class": "pic-align-right"
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
        template: "<button class='pic-btn edit' client-id='btn_edit'>編輯</button>",
        width: 60,
        attributes: {
          "class": "pic-align-center"
        }
      },
      {
        field: "group_id",
        title: "活動代號",
        width: 100,
        attributes: {
          "class": "pic-align-right"
        }
      },
      {
        field: "group_name",
        title: "活動名稱",
        width: 230
      },
      {
        field: "number",
        title: "作業簡號",
        width: 100,
        attributes: {
          "class": "pic-align-right"
        }
      },
      {
        field: "quantity",
        title: "數量",
        width: 80,
        attributes: {
          "class": "pic-align-right"
        },
        format: "{0:n}"
      },
      {
        field: "price",
        title: "金額",
        width: 80,
        attributes: {
          "class": "pic-align-right"
        },
        format: "{0:n}"
      },
      {
        field: "sale",
        title: "廠商折扣",
        width: 80,
        attributes: {
          "class": "pic-align-right"
        }
      }
    ]
  });

});
