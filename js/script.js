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

  // A global variable on opend tabs
  var tabsOpened = ['aa', 'ab', 'ca'];
  var mdTabsOpend = ['aaa'];

  var tabSwitch = function(tabName, tabs){
    // console.log(tabName);
    // console.log(tabs.siblings('.pic-tab-contents'));
    // Set selected tab and tab-content to normal
    tabs.find('.pic-tab--selected').removeClass('pic-tab--selected');
    tabs.siblings('.pic-tab-contents').children('.pic-tab-content--selected').removeClass('pic-tab-content--selected');
    // Show selcted tab and tab-content
    tabs.find('[name='+ tabName +']').addClass('pic-tab--selected');
    tabs.siblings('.pic-tab-contents').children('[name='+ tabName +']').addClass('pic-tab-content--selected');
  };

  var newTab = function(tabName, fName){
    // add new value in tabsOpened array
    tabsOpened.push(tabName);
    var tabs = $('.pic-tabs').first();

    // set selcted tab to un-selected
    tabs.children('.pic-tab--selected').removeClass('pic-tab--selected');
    tabs.siblings('.pic-tab-contents').children('.pic-tab-content--selected').removeClass('pic-tab-content--selected');
    // add new tab
    tabs.append(
      '<div class="pic-tab pic-tab--selected" name="' + tabName + '">'
      + '<div class="pic-tab__inner">'
      + fName
      + '<span class="pic-icon-stack">'
      + '<i class="fa fa-circle"></i>'
      + '<i class="fa fa-remove"></i>'
      + '</span>'
      + '</div>'
      + '</div>'
    );
    tabs.siblings('.pic-tab-contents').append(
      '<div class="pic-tab-content pic-tab-content--selected" name="' + tabName + '">'
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
        tabSwitch(name);
      }
    }
  };


  $('.list-control').on('click', '.pic-button', function(event){
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
    var tabContents = tabs.siblings('.pic-tab-contents');
    var currentTarget = $(event.currentTarget);
    var target = $(event.target);
    var name = currentTarget.attr('name');
    // console.log(event);

    var tabsArray = '';
    if (currentTarget.parents('.pic-tab-content').length > 0) {
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
      $('.pic-tab-content[name=' + name + ']').remove();
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
        $('.pic-tab-content[name=' + newSelectedTabName + ']').addClass('pic-tab-content--selected');
      }

    } else if (!currentTarget.hasClass('pic-tab--selected')) {
      // If the clicked tab is not selected
      tabSwitch(name, tabs);

    }
  });

  var gridData = [
    {"group_id":"TST08","group_name":"維護無刪除","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"SR001","group_name":"理貨一般","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"TS004","group_name":"只有修改","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"RU","group_name":"執行編輯","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"MIS01","group_name":"管理者","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"SR002","group_name":"理貨管理","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"TS002","group_name":"只有新增","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"TS001","group_name":"只有查詢","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"TS003","group_name":"只有刪除","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"TS005","group_name":"只有列印","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"AC003","group_name":"驗收MIS1","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"TST08","group_name":"維護無刪除","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"SR001","group_name":"理貨一般","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"TS004","group_name":"只有修改","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"RU","group_name":"執行編輯","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"MIS01","group_name":"管理者","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"SR002","group_name":"理貨管理","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"TS002","group_name":"只有新增","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"TS001","group_name":"只有查詢","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"TS003","group_name":"只有刪除","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"TS005","group_name":"只有列印","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"},
    {"group_id":"AC003","group_name":"驗收MIS1","create_date":"2017-07-17","create_id":"AMIS","upd_date":"2017-07-17","upd_id":"AMIS","count":"100"}
  ];

  var mdData = [
    {"group_id":"123","group_name":"大富翁","number":"222","quantity":"1","price":"244","sale":"20"},
    {"group_id":"124","group_name":"蛋黃哥","number":"221","quantity":"2","price":"534","sale":"10"},
    {"group_id":"111","group_name":"玉山送大杯拿鐵","number":"224","quantity":"3","price":"12","sale":"10"},
    {"group_id":"543","group_name":"樂天送跑車","number":"225","quantity":"4","price":"8656","sale":"30"},
    {"group_id":"32","group_name":"天使帝國","number":"556","quantity":"5","price":"354","sale":"20"},
    {"group_id":"776","group_name":"樂天送房子","number":"667","quantity":"6","price":"674","sale":"0"},
    {"group_id":"887","group_name":"集點換大獎","number":"887","quantity":"7","price":"2354","sale":"20"},
    {"group_id":"443","group_name":"大天使之劍","number":"663","quantity":"8","price":"87","sale":"10"},
    {"group_id":"334","group_name":"鬥陣特攻","number":"889","quantity":"9","price":"34","sale":"10"},
    {"group_id":"665","group_name":"蜘蛛人電影","number":"995","quantity":"10","price":"134","sale":"10"},
    {"group_id":"666","group_name":"神鬼奇航","number":"332","quantity":"11","price":"758","sale":"15"}
  ]

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
        width:230,
        attributes: {
          "class": "align-center"
        }
      },
      {
        field: "group_name",
        title: "群組名稱",
        width: 230,
        attributes: {
          "class": "align-center"
        }
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
        width:170,
        attributes: {
          "class": "align-center"
        }
      },
      {
        field: "create_id",
        title: "建立人員",
        width:170,
        attributes: {
          "class": "align-center"
        }
      },
      {
        field: "upd_date",
        title: "異動日期",
        width:170,
        attributes: {
          "class": "align-center"
        }
      },
      {
        field: "upd_id",
        title: "異動人員",
        width:170,
        attributes: {
          "class": "align-center"
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

  query_mode();

  //查詢事件
  $("[client-id='btn_query']").on("click", function(event){
    // console.log("query");
    event.preventDefault();
    // var formEl = $(event.currentTarget).closest('.pic-tab-content').find('.pic-form');
    // var validate = isValidated(formEl);
    var disabled = isDisabled($(event.currentTarget));

    if (!disabled) {
      // console.log("pass");
      var pre_mode = $("[client-id='pageMode']").attr('data-value');
      if(pre_mode == 'Add') {
        $.when(open_confirm('是否放棄現有的新增?', '確認')).then(function (confirmed) {
          if (confirmed) {
            query_mode();
          }
        })
      }
      else if(pre_mode == 'Edit'){
        $.when(open_confirm('是否放棄儲存現在的資料?', '確認')).then(function (confirmed) {
          if (confirmed) {
            query_mode();
          }
        })
      } else {
        query_mode();
      }
    }
  });

  //新增事件
  $("[client-id='btn_add']").on("click", function(event){
    event.preventDefault();
    var disabled = isDisabled($(event.currentTarget));

    if (!disabled) {
		  var pre_mode = $("[client-id='pageMode']").attr('data-value');
		  if(pre_mode == 'Add')
		  {
				$.when(open_confirm('是否放棄現有的新增?', '確認')).then(function (confirmed) {
				if (confirmed) {
					add_mode();
				}
			})
		  }
		  else if(pre_mode == 'Edit'){
				$.when(open_confirm('是否放棄儲存現在的資料?', '確認')).then(function (confirmed) {
				if (confirmed) {
					 add_mode();
				}
			})
		  } else {
			  add_mode();
		  }
	  }
  });

  //刪除事件
  $("[client-id='btn_delete']").on("click", function(event){
    event.preventDefault();
    var disabled = isDisabled($(event.currentTarget));

    if (!disabled) {
      $.when(open_confirm('是否確定要刪除?', '確認')).then(function (confirmed) {
        if (confirmed) {
          open_message('刪除資料成功','提示');
        }
      })
    }
  });

  //確認事件
  $("[client-id='btn_confirm']").on("click", function(event){
    event.preventDefault();
    // console.log("confirm");
    var formEl = $(event.currentTarget).closest('.pic-tab-content').children('.pic-panel').children('.pic-form');
    var validate = isValidated(formEl);
    var disabled = isDisabled($(event.currentTarget));

    if (validate && !disabled) {
      // console.log("confirm pass");
  		var pageMode = $("[client-id='pageMode']").attr('data-value');
  		switch(pageMode) {
  			case "Add":
  				// $("#foo").val("");
  				// $("#foe").val("");
          console.log(formEl.find('.pic-form-control'));
          formEl.find('.pic-form-control').each(function(){
            $(this).val('');
          });
  				open_message('新增資料成功','提示');
  				result_mode();
  				break;
  			case "Edit":
  				// $("#foo").val("");
  				// $("#foe").val("");
          formEl.find('.pic-form-control').each(function(){
            $(this).val('');
          });
  				open_message('異動資料成功','提示');
  				result_mode();
  				break;
  			case "Query":
  				result_mode();
  				break;
	    }
    }
  });

  //取消事件
  $("[client-id='btn_cancel']").on("click", function(event){
    event.preventDefault();
		var pageMode = $("[client-id='pageMode']").attr('data-value');
		switch(pageMode) {
			case "Add":
				$.when(open_confirm('是否放棄現有的新增?', '確認')).then(function (confirmed) {
					if (confirmed) {
						switch($("[client-id='pageMode']").attr('pre-value')) {
							case "Query":
								query_mode();
								break;
							case "Result":
								result_mode();
								break;
						}
					}
				});
				break;
			case "Edit":
				$.when(open_confirm('是否放棄儲存現在的資料?', '確認')).then(function (confirmed) {
					if (confirmed) {
						$("#foo").val("");
						$("#foe").val("");
						result_mode();
					}
				});
				break;
		}
  });

  //報表事件
  $("[client-id='btn_print']").on("click", function(event){
    event.preventDefault();
    var disabled = isDisabled($(event.currentTarget));

    if (!disabled) {
  		kendo.ui.progress($(".pic-tab-contents"), true);
  		setTimeout(function(){
            kendo.ui.progress($(".pic-tab-contents"), false);
           window.open('/群組資訊.xlsx');
  		}, 2000);
    }
  });


	//查詢模式
	function query_mode() {
		//換至此模式時清空查詢結果區與所有查詢欄位
		$("#foo").val("");
		$("#foe").val("");
		$(".pic-grid").data("kendoGrid").dataSource.data([]);
		$("[client-id='pageMode']").attr('pre-value', $("[client-id='pageMode']").attr('data-value'));
		$("[client-id='pageMode']").attr('data-value', 'Query');
		$("[client-id='pageMode']").text('查詢');

		//控制項權限
		//查 確 新 編 取 刪 列
		//E  E  E  D  D  D  E
		$("[client-id='btn_query']").removeClass("pic-button--disabled");
		$("[client-id='btn_confirm']").removeClass("pic-button--disabled");
		$("[client-id='btn_add']").removeClass("pic-button--disabled");
		$("[client-id='btn_edit']").addClass("pic-button--disabled");
		$("[client-id='btn_cancel']").addClass("pic-button--disabled");
		$("[client-id='btn_delete']").addClass("pic-button--disabled");
		$("[client-id='btn_print']").removeClass("pic-button--disabled");
	}

	//查詢結果模式
	function result_mode() {
		//預設帶入第一筆資料
		$(".pic-grid").data("kendoGrid").dataSource.data(gridData);
		$("[client-id='pageMode']").attr('pre-value', $("[client-id='pageMode']").attr('data-value'));
		$("[client-id='pageMode']").attr('data-value', 'Result');
		$("[client-id='pageMode']").text('查詢結果');
		$("[client-id='btn_edit']").on("click", function(event) {
		    edit_mode(event.currentTarget);
    });

		//控制項權限
		//查 確 新 編 取 刪 列
		//E  D  E  E  D  E  D
		$("[client-id='btn_query']").removeClass("pic-button--disabled");
		$("[client-id='btn_confirm']").addClass("pic-button--disabled");
		$("[client-id='btn_add']").removeClass("pic-button--disabled");
		$("[client-id='btn_edit']").removeClass("pic-button--disabled");
		$("[client-id='btn_cancel']").addClass("pic-button--disabled");
		$("[client-id='btn_delete']").removeClass("pic-button--disabled");
		$("[client-id='btn_print']").addClass("pic-button--disabled");
	}

	//編輯模式
	function edit_mode(Target) {
		//換至此模式時清空查詢欄位資料
		$("[client-id='pageMode']").attr('pre-value', $("[client-id='pageMode']").attr('data-value'));
		$("[client-id='pageMode']").attr('data-value', 'Edit');
		$("[client-id='pageMode']").text('編輯');

		//控制項權限
		//查 確 新 編 取 刪 列
		//E  E  D  D  E  D  D
		$("[client-id='btn_query']").removeClass("pic-button--disabled");
		$("[client-id='btn_confirm']").removeClass("pic-button--disabled");
		$("[client-id='btn_add']").addClass("pic-button--disabled");
		$("[client-id='btn_edit']").addClass("pic-button--disabled");
		$("[client-id='btn_cancel']").removeClass("pic-button--disabled");
		$("[client-id='btn_delete']").addClass("pic-button--disabled");
		$("[client-id='btn_print']").addClass("pic-button--disabled");

		//查詢區帶入上方值
		var row = $(Target).closest("tr");
    var grid = row.closest(".pic-grid").data("kendoGrid");
    var dataItem = grid.dataItem(row);
		$("#foo").val(dataItem.group_id);
		$("#foe").val(dataItem.group_name);
	}

	//新增模式
	function add_mode() {
		//換至此模式時清空查詢欄位資料
		$("#foo").val("");
		$("#foe").val("");
		$("[client-id='pageMode']").attr('pre-value', $("[client-id='pageMode']").attr('data-value'));
		$("[client-id='pageMode']").attr('data-value', 'Add');
		$("[client-id='pageMode']").text('新增');

		//控制項權限
		//查 確 新 編 取 刪 列
		//E  E  E  D  E  D  D
		$("[client-id='btn_query']").removeClass("pic-button--disabled");
		$("[client-id='btn_confirm']").removeClass("pic-button--disabled");
		$("[client-id='btn_add']").removeClass("pic-button--disabled");
		$("[client-id='btn_edit']").addClass("pic-button--disabled");
		$("[client-id='btn_cancel']").removeClass("pic-button--disabled");
		$("[client-id='btn_delete']").addClass("pic-button--disabled");
		$("[client-id='btn_print']").addClass("pic-button--disabled");
	}

	//顯示確認的視窗
	function open_confirm(Message, Title) {
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
      open: function (e) {
          $('#Confirm').parent().find(".k-button-group").find(".k-button.k-primary").addClass("confirm-button");
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
  }

	//顯示訊息的視窗
	function open_message(Message, Title) {
		if (document.getElementById("ShowMessage") == null) {
		    $("<div id='ShowMessage'></div>").appendTo("body");
    } else {
        $("#ShowMessage").data("kendoDialog").close();
    }

  	$("#ShowMessage").kendoDialog({
  		title: Title,
  		content: Message,
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
	}

  $('#md-grid').kendoGrid({
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
        width: 70,
        attributes: {
          "class": "align-center"
        }
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
        attributes: {
        	"class": "align-center"
        }
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
        }
      },
      {
        field: "price",
        title: "金額",
        width: 80,
        attributes: {
        	"class": "align-right"
        }
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

  var editDetail = function(event){
    var currentTarget = $(event.currentTarget);
    var currentRow = currentTarget.closest('tr');
    var grid = currentRow.closest(".pic-grid");
    var dataGrid = grid.data("kendoGrid");
    var dataItem = dataGrid.dataItem(currentRow);

    var id = dataItem.group_id;
    var name = dataItem.group_name;
    console.log(id);

    var masterContents = grid.closest('.pic-tab-contents');
    var wrapper = masterContents.closest('.pic-tab-content');
    var masterTabs = wrapper.children('.pic-tabs');

    masterTabs.children('.pic-tab--selected').removeClass('pic-tab--selected');
    masterContents.children('.pic-tab-content--selected').removeClass('pic-tab-content--selected');

    if ($.inArray(id, mdTabsOpend) < 0) {
      // create a new detail tab
      mdTabsOpend.push(id);

      masterTabs.append(
        '<div class="pic-tab pic-tab--selected" name="' + id + '">'
        + '<div class="pic-tab__inner">'
        + name
        + '<span class="pic-icon-stack">'
        + '<i class="fa fa-circle"></i>'
        + '<i class="fa fa-remove"></i>'
        + '</span>'
        + '</div>'
        + '</div>'
      );
      $('.pic-template').children('.pic-tab-content').clone().appendTo(masterContents).addClass('pic-tab-content--selected').attr('name', id);
      var form = masterContents.children('.pic-tab-content--selected').find('.pic-form');
      form.find('[name=group_id]').val(id);
      form.find('[name=group_name]').val(name);
      form.find('[name=number]').val(dataItem.number);
      form.find('[name=quantity]').val(dataItem.quantity);
      form.find('[name=price]').val(dataItem.price);
      form.find('[name=sale]').val(dataItem.sale);
    } else {
      // switch to the tab
      tabSwitch(id, masterTabs);
    }

  };

  $(".pic-button.edit").on('click', editDetail);
});
