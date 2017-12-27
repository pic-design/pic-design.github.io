$(document).ready(function() {

  // disable key events when pic-widget is disabled
  /* $('body').on('keyup', '.pic-widget.disabled', function(event){
    console.log('this is a disabled widget');
    // send user to next focus element
    var currentTarget = $(event.currentTarget);
    console.log(currentTarget);
    var focus = '';
    function foo (el){
      if (el.hasClass('k-widget') || el.hasClass('k-input')) {
        el.focus();
        return true;
      }else{
        console.log('missing focus element');
        return false;
      }
    }

    if(event.key = 'Tab'){
      if(event.shiftKey === false){
        focus = currentTarget.next();
        if (focus.length === 1) {
          
        }
        console.log(focus);
      }else if (event.shiftKey === true){

      }
    }

  }); */

  // global variables on opend tabs
  var tabsOpened = ['home', 'aa', 'ab', 'ca'];
  var mdTabsOpend = ['master', 'detail'];

  var tabSwitch = function(tabName, tabs){
    // console.log(tabName);
    // console.log(tabs.siblings('.pic-workareas'));
    // Set selected tab and tab-content to normal
    tabs.find('.pic-tab--selected').removeClass('pic-tab--selected');
    tabs.siblings('.pic-workareas').children('.pic-workarea--selected').removeClass('pic-workarea--selected');

    // Show selcted tab and tab-content
    tabs.find('[name='+ tabName +']').addClass('pic-tab--selected');
    tabs.siblings('.pic-workareas').children('[name='+ tabName +']').addClass('pic-workarea--selected');
  };

  var newTab = function(tabName, fName){
    // add new value in tabsOpened array
    tabsOpened.push(tabName);
    var tabs = $('.pic-tabs').first();

    // set selcted tab to un-selected
    tabs.children('.pic-tab--selected').removeClass('pic-tab--selected');
    tabs.siblings('.pic-workareas').children('.pic-workarea--selected').removeClass('pic-workarea--selected');
    // add new tab
    tabs.append(
      '<div class="pic-tab pic-tab--selected" name="' + tabName + '">'
      + '<div class="pic-tab__inner">'
      + fName
      + '<span class="pic-stack">'
      + '<i class="pic-stack__big fa fa-circle"></i>'
      + '<i class="pic-stack__normal fa fa-remove"></i>'
      + '</span>'
      + '</div>'
      + '</div>'
    );
    tabs.siblings('.pic-workareas').append(
      '<div class="pic-workarea pic-workarea--selected" name="' + tabName + '">'
      + fName
      + '</div>'
    );
  };

  var onSelect = function(event){
    var el = $(event.node);
    var name = el.attr('name');
    // console.log(el);
    // Check if the selected function is opened
    // console.log($.inArray(name, tabsOpened));
    if(name){
      if ($.inArray(name, tabsOpened) < 0) {
        // function is not opened
        // Create a new tab
        newTab(name, el.find('.pic-function-name').text());
      } else {
        // function is opened
        // switch to the function tab
        tabSwitch(name, $('.pic-tabs').first());
      }
    }
  };

  var detailTab = function(event){

    var currentTarget = $(event.currentTarget);
    var currentRow = currentTarget.closest('tr');
    var grid = currentRow.closest(".pic-grid");
    var dataGrid = grid.data("kendoGrid");
    var dataItem = dataGrid.dataItem(currentRow);

    var id = dataItem.group_id;
    var name = dataItem.group_name;

    var masterContents = grid.closest('.pic-workareas');
    var wrapper = masterContents.closest('.pic-workarea');
    var masterTabs = wrapper.children('.pic-tabs');

    masterTabs.children('.pic-tab--selected').removeClass('pic-tab--selected');
    masterContents.children('.pic-workarea--selected').removeClass('pic-workarea--selected');

    var form = masterContents.children('.pic-workarea[name=detail]').find('.pic-form');
    form.find('[name=group_id]').val(id);
    form.find('[name=group_name]').val(name);
    form.find('[name=number]').val(dataItem.number);
    form.find('[name=quantity]').val(dataItem.quantity);
    form.find('[name=price]').val(dataItem.price);
    form.find('[name=sale]').val(dataItem.sale);

    tabSwitch(id, masterTabs);
  };

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

  $('.datepicker').kendoDatePicker({
    format: 'yyyy/MM/dd'
  });

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
            },
            headerAttributes: {
              'class': 'pic-txt--center'
            }    
          },
          {
            field: 'qs_name',
            title: '門市名稱',
            attributes: {
              "class": "qs-name"
            },
            headerAttributes: {
              'class': 'pic-txt--center'
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
    {'qs_num':'004', 'qs_name':'南美洲分部'},
    {'qs_num':'005', 'qs_name':'歐洲分部'},
    {'qs_num':'006', 'qs_name':'大洋洲分部'},
    {'qs_num':'007', 'qs_name':'南極洲分部'},
    {'qs_num':'008', 'qs_name':'綠洲分部'}
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
    sortable: false,
    pageable: {
        pageSize: 10
    },
    columns:[
      {
        selectable: true,
        width: 31
      },
      {
        template: "<button class='pic-btn edit' client-id='btn_edit'>編輯</button>",
        width: 70,
        attributes: {
          'class': 'pic-txt--center'
        }
      },
      {
        field: 'group_id',
        title: '群組代號群組代號群組代號群組代號',
        // width: 230,
        headerAttributes: {
          'class': 'pic-txt--center'
        }
      },
      {
        field: 'group_name',
        title: '群組名稱',
        // width: 230,
        headerAttributes: {
          'class': 'pic-txt--center'
        }
      },
      {
        field:"count",
        title:"使用數量",
        attributes: {
        	'class': 'pic-txt--right'
        },
        width: 80,
        headerAttributes: {
          'class': 'pic-txt--center'
        }
      },
      {
        field: "create_date",
        title: "建立日期",
        // width: 170,
        headerAttributes: {
          'class': 'pic-txt--center'
        }
      },
      {
        field: "create_id",
        title: "建立人員",
        // width: 170,
        headerAttributes: {
          'class': 'pic-txt--center'
        }
      },
      {
        field: "upd_date",
        title: "異動日期",
        // width: 170
        headerAttributes: {
          'class': 'pic-txt--center'
        }
      },
      {
        field: "upd_id",
        title: "異動人員",
        // width: 170
        headerAttributes: {
          'class': 'pic-txt--center'
        }
      }
    ]
  });

  $('#master-grid').kendoGrid({
    dataSource: [],
    height: 550,
    sortable: false,
    pageable: {
      pageSize: 10
    },
    columns: [
      {
        selectable: true,
        width: 31
      },
      {
        template: "<button class='pic-btn edit' client-id='btn_edit'>編輯</button><button class='pic-btn detail' style='margin-left:4px;' client-id='btn_detail'>明細</button>",
        width: 80,
        attributes: {
          "class": "pic-txt--center"
        }
      },
      {
        field: "contract_id",
        title: "合約代號",
        width: 100,
        attributes: {
          "class": "pic-txt--right"
        },
        headerAttributes: {
          'class': 'pic-txt--center'
        }
      },
      {
        field: "contract_name",
        title: "合約名稱",
        width: 230,
        headerAttributes: {
          'class': 'pic-txt--center'
        }
      },
      {
        field: "number",
        title: "作業簡號",
        width: 100,
        attributes: {
          "class": "pic-txt--right"
        },
        headerAttributes: {
          'class': 'pic-txt--center'
        }
      },
      {
        field: "quantity",
        title: "數量",
        width: 80,
        attributes: {
          "class": "pic-txt--right"
        },
        headerAttributes: {
          'class': 'pic-txt--center'
        },
        format: "{0:n}"
      },
      {
        field: "price",
        title: "金額",
        width: 80,
        attributes: {
          "class": "pic-txt--right"
        },
        headerAttributes: {
          'class': 'pic-txt--center'
        },
        format: "{0:n}"
      },
      {
        field: "sale",
        title: "廠商折扣",
        width: 80,
        attributes: {
          "class": "pic-txt--right"
        },
        headerAttributes: {
          'class': 'pic-txt--center'
        }
      }
    ]
  });

  $('#detail-grid').kendoGrid({
    dataSource: [],
    height: 550,
    sortable: false,
    pageable: {
      pageSize: 10
    },
    columns: [
      {
        selectable: true,
        width: 31
      },
      {
        template: "<button class='pic-btn edit' client-id='btn_edit'>編輯</button>",
        width: 60,
        attributes: {
          "class": "pic-txt--center"
        }
      },
      {
        field: "group_id",
        title: "門市代號",
        // width: 100,
        attributes: {
          "class": "pic-txt--right"
        },
        headerAttributes: {
          'class': 'pic-txt--center'
        }
      },
      {
        field: "group_name",
        title: "門市名稱",
        // width: 230,
        headerAttributes: {
          'class': 'pic-txt--center'
        }
      },
      {
        field: "quantity",
        title: "銷售數量",
        // width: 80,
        attributes: {
          "class": "pic-txt--right"
        },
        headerAttributes: {
          'class': 'pic-txt--center'
        },
        format: "{0:n}"
      },
      {
        field: "total",
        title: "總金額",
        // width: 80,
        attributes: {
          "class": "pic-txt--right"
        },
        headerAttributes: {
          'class': 'pic-txt--center'
        },
        format: "{0:n}"
      }
    ]
  });

  $('#home-grid').kendoGrid({
	dataSource: homeData,
    columns: [
      {
        field: 'date',
        title: '發佈日期',
        attributes: {
          'class': 'pic-txt--right'
        },
        headerAttributes: {
          'class': 'pic-txt--center'
        },
        width: 200
      },
      {        
        field: 'content',
        title: '訊息內容',
        headerAttributes: {
          'class': 'pic-txt--center'
        }
      }
  ]
  });

  // Open a new tab when clicked on a treeview node
  $('.list-control').on('click', '.pic-btn', function(event){
    var currentTarget = $(event.currentTarget);
    if (currentTarget.hasClass('open')) {
      $(".pic-nav").data("kendoTreeView").expand(".k-item");
    } else if (currentTarget.hasClass('fold')) {
      $(".pic-nav").data("kendoTreeView").collapse(".k-item");
    }
  });

  // Tab function
  $(".pic-tabs").on("click", '.pic-tab', function(event){
    var tabs = $(event.delegateTarget);
    var tabContents = tabs.siblings('.pic-workareas');
    var currentTarget = $(event.currentTarget);
    var target = $(event.target);
    var name = currentTarget.attr('name');
	  if(!(currentTarget.attr('disabled') == 'disabled')){
      var tabsArray = '';
      if (currentTarget.parents('.pic-workarea').length > 0) {
        // master-detail tab
        tabsArray = mdTabsOpend;
      } else {
        tabsArray = tabsOpened;
      }

      if (target.hasClass('fa-remove')) {
        // close tab
        // Get the tab's index number
        var index = tabsArray.indexOf(name);
        // Remove tab and tab-content
        $('.pic-workarea[name=' + name + ']').remove();
        currentTarget.remove();

        // Remove tab name from array
        tabsArray.splice(index, 1);
        // console.log(tabsArray);
        // if no tab is selected, select the tab in front of the closed one
        var tabSelected = tabs.children('.pic-tab--selected');
        if(tabSelected.length === 0) {
          var newSelectedTabIndex = index - 1;
          if (newSelectedTabIndex < 0) {
          newSelectedTabIndex = 0;
          }
          var newSelectedTabName = tabsArray[newSelectedTabIndex];
          $('.pic-tab[name=' + newSelectedTabName + ']').addClass('pic-tab--selected');
          $('.pic-workarea[name=' + newSelectedTabName + ']').addClass('pic-workarea--selected');
        }
      } else if (!currentTarget.hasClass('pic-tab--selected')) {
        // If the clicked tab is not selected
        tabSwitch(name, tabs);
      }
    }
  });

  // 開啟明細頁
  $("#master-grid").on('click', function(event){
    
    var target = $(event.target);
    var currentRow = target.closest('tr');
    var grid = currentRow.closest(".pic-grid");
    var dataGrid = grid.data("kendoGrid");
    var dataItem = dataGrid.dataItem(currentRow);

    var id = dataItem.contract_id;
    var name = dataItem.contract_name;

    var mdWorkareas = grid.closest('.pic-workareas');
    var wrapper = mdWorkareas.closest('.pic-workarea');
    var mdTabs = wrapper.children('.pic-tabs');

    if(target.hasClass('detail')){
      // remove 'selected' classes
      mdTabs.children('.pic-tab--selected').removeClass('pic-tab--selected');
      mdWorkareas.children('.pic-workarea--selected').removeClass('pic-workarea--selected');
      
      // 移除 detail tab 的 disabled 狀態
      if (mdTabs.children('.disabled').length > 0) {
        mdTabs.children('.disabled').removeClass('disabled');
      }
  
      // put values of selected data into the form on detail tab
      var readonlyDetailForm = mdWorkareas.children('.pic-workarea[name=detail]').find('.pic-form--readonly');
      readonlyDetailForm.find('[name=contract_id]').val(id);
      readonlyDetailForm.find('[name=contract_name]').val(name);
      
      // switch to detail tab
      tabSwitch('detail', mdTabs);
      PIC.resultMode($('#detail-grid').parent('.pic-workarea'));
      
    } else if (target.hasClass('edit')) {
      var masterForm = mdWorkareas.children('.pic-workarea[name=master]').find('.pic-form');
      masterForm.find('[name=contract_id]').val(id);
      masterForm.find('[name=contract_name]').val(name);
    }
  });


  $('#detail-grid').on('click', '.edit', function(event){
    var currentTarget = $(event.currentTarget);
    var currentRow = currentTarget.closest('tr');
    var grid = currentRow.closest(".pic-grid");
    var dataGrid = grid.data("kendoGrid");
    var dataItem = dataGrid.dataItem(currentRow);
    var workarea = grid.closest('.pic-workareas');
    
    var id = dataItem.group_id;
    var name = dataItem.group_name;
    var quantity = dataItem.quantity;
    var total = dataItem.total;

    var form = workarea.find('.pic-form:not(".pic-form--readonly")');
    form.find('[name=group_id]').val(id);
    form.find('[name=group_name]').val(name);
    form.find('[name=quantity]').val(quantity);
    form.find('[name=total]').val(total);
  });

});
