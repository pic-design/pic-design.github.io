$(document).ready(function() {

  // A global variable on opend tabs
  var tabsOpened = ['aa', 'ab', 'ca'];

  var tabSwitch = function(tabName){
    // Set selected tab and tab-content to normal
    $('.pic-tab--selected').removeClass('pic-tab--selected');
    $('.pic-tab-content--selected').removeClass('pic-tab-content--selected');
    // Show selcted tab and tab-content
    $('.pic-tabs').find('[name='+ tabName +']').addClass('pic-tab--selected');
    $('.pic-tab-contents').find('[name='+ tabName +']').addClass('pic-tab-content--selected');
  };

  var newTab = function(tabName, fName){
    // add new value in tabsOpened array
    tabsOpened.push(tabName);
    // set selcted tab to un-selected
    $('.pic-tab--selected').removeClass('pic-tab--selected');
    $('.pic-tab-content--selected').removeClass('pic-tab-content--selected');
    // add new tab
    $('.pic-tabs').append(
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
    $('.pic-tab-contents').append(
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


  $(".pic-nav").kendoTreeView({
    select: onSelect
  });


  // Tab function
  $(".pic-tabs").on("click", function(event){
    var tabs = $('.pic-tabs');
    var tabContents = $('.pic-tab-contents');
    var target = $(event.target);
    // console.log(event);
    if (target.parent('.pic-tab').length > 0 && target.parent('.pic-tab--selected').length === 0) {
      // If the clicked tab is not selected
      tabSwitch(target.parent('.pic-tab').attr('name'));

    } else if (target.hasClass('fa-remove')) {
      // close tab
      var targetTab = target.closest('.pic-tab');
      var targetName = targetTab.attr('name');
      // Get the tab's index number
      var index = tabsOpened.indexOf(targetName);
      // Remove tab and tab-content
      $('.pic-tab-content[name=' + targetName + ']').remove();
      targetTab.remove();
      // Remove tab name from array
      tabsOpened.splice(index, 1);
      // console.log(tabsOpened);
      // if no tab is selected, select the tab in front of the closed one
      var tabSelected = tabs.find('.pic-tab--selected');
      if(tabSelected.length === 0) {
        var newSelectedTabIndex = index - 1;
        if (newSelectedTabIndex < 0) {
          newSelectedTabIndex = 0;
        }
        var newSelectedTabName = tabsOpened[newSelectedTabIndex];
        $('.pic-tab[name=' + newSelectedTabName + ']').addClass('pic-tab--selected');
        $('.pic-tab-content[name=' + newSelectedTabName + ']').addClass('pic-tab-content--selected');
      }

    }
  });

  var gridData = [
    {"group_id":"TST08","group_name":"維護無刪除","create_date":"2017-07-17 T13:46:54.787","create_id":"AMIS","upd_date":"2017-07-17 T13:46:54.787","upd_id":"AMIS"},
    {"group_id":"SR001","group_name":"理貨一般","create_date":"2017-07-17 T13:46:55.293","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.293","upd_id":"AMIS"},
    {"group_id":"TS004","group_name":"只有修改","create_date":"2017-07-17 T13:46:55.33","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.33","upd_id":"AMIS"},
    {"group_id":"RU","group_name":"執行編輯","create_date":"2017-07-17 T13:46:55.367","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.367","upd_id":"AMIS"},
    {"group_id":"MIS01","group_name":"管理者","create_date":"2017-07-17 T13:46:55.397","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.397","upd_id":"AMIS"},
    {"group_id":"SR002","group_name":"理貨管理","create_date":"2017-07-17 T13:46:55.43","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.43","upd_id":"AMIS"},
    {"group_id":"TS002","group_name":"只有新增","create_date":"2017-07-17 T13:46:55.577","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.577","upd_id":"AMIS"},
    {"group_id":"TS001","group_name":"只有查詢","create_date":"2017-07-17 T13:46:55.69","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.69","upd_id":"AMIS"},
    {"group_id":"TS003","group_name":"只有刪除","create_date":"2017-07-17 T13:46:55.733","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.733","upd_id":"AMIS"},
    {"group_id":"TS005","group_name":"只有列印","create_date":"2017-07-17 T13:46:55.8","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.8","upd_id":"AMIS"},
    {"group_id":"AC003","group_name":"驗收MIS1","create_date":"2017-07-17 T13:46:55.86","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.86","upd_id":"AMIS"},
    {"group_id":"TST08","group_name":"維護無刪除","create_date":"2017-07-17 T13:46:54.787","create_id":"AMIS","upd_date":"2017-07-17 T13:46:54.787","upd_id":"AMIS"},
    {"group_id":"SR001","group_name":"理貨一般","create_date":"2017-07-17 T13:46:55.293","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.293","upd_id":"AMIS"},
    {"group_id":"TS004","group_name":"只有修改","create_date":"2017-07-17 T13:46:55.33","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.33","upd_id":"AMIS"},
    {"group_id":"RU","group_name":"執行編輯","create_date":"2017-07-17 T13:46:55.367","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.367","upd_id":"AMIS"},
    {"group_id":"MIS01","group_name":"管理者","create_date":"2017-07-17 T13:46:55.397","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.397","upd_id":"AMIS"},
    {"group_id":"SR002","group_name":"理貨管理","create_date":"2017-07-17 T13:46:55.43","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.43","upd_id":"AMIS"},
    {"group_id":"TS002","group_name":"只有新增","create_date":"2017-07-17 T13:46:55.577","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.577","upd_id":"AMIS"},
    {"group_id":"TS001","group_name":"只有查詢","create_date":"2017-07-17 T13:46:55.69","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.69","upd_id":"AMIS"},
    {"group_id":"TS003","group_name":"只有刪除","create_date":"2017-07-17 T13:46:55.733","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.733","upd_id":"AMIS"},
    {"group_id":"TS005","group_name":"只有列印","create_date":"2017-07-17 T13:46:55.8","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.8","upd_id":"AMIS"},
    {"group_id":"AC003","group_name":"驗收MIS1","create_date":"2017-07-17 T13:46:55.86","create_id":"AMIS","upd_date":"2017-07-17 T13:46:55.86","upd_id":"AMIS"}
  ];

  $(".pic-grid").kendoGrid({
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
            template: "<input id='' class='k-checkbox' type='checkbox'><label class='k-checkbox-label' for=''></label>"
          },
          {
            template: "<button class='pic-button' client-id='btn_edit'>編輯</button>"
          },
          {
            field: "group_id",
            title: "群組代號"
          },
          {
            field: "group_name",
            title: "群組名稱"
          },
          {
            field: "create_date",
            title: "建立日期"
          },
          {
            field: "create_id",
            title: "建立人員"
          },
          {
            field: "upd_date",
            title: "異動日期"
          },
          {
            field: "upd_id",
            title: "異動人員"
          }
        ]
    });

    $('#ham').on('click', function(){
      if ($('.pic-sidebar').hasClass('pic-sidebar--hidden')) {
        $('.pic-sidebar').removeClass('pic-sidebar--hidden');
      } else {
        $('.pic-sidebar').addClass('pic-sidebar--hidden');
      }
    });

    // $('body').on('click', '.pic-button--disabled', function(event) {
    //   event.preventDefault();
    //   console.log("prevent default");
    // })

    var isDisabled = function(el){
      //console.log(el.hasClass('pic-button--disabled'));
      if(el.hasClass('pic-button--disabled')) {
        return true;
      } else {
        return false;
      }
    };

    //查詢事件
  	  $("[client-id='btn_query']").on("click", function(event){
        event.preventDefault();
  		  var pre_mode = $("[client-id='pageMode']").attr('data-value');
  		  if(pre_mode == 'Add')
  		  {
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
  		  }
  		  else
  		  {
  			  query_mode();
  		  }


  	  });

  	  //新增事件
  	  $("[client-id='btn_add']").on("click", function(event){
        event.preventDefault();
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
  		  }
  		  else
  		  {
  			  add_mode();
  		  }
  	  });

  	  //刪除事件
  	  $("[client-id='btn_delete']").on("click", function(event){
        event.preventDefault();
        //console.log("delete");
        if( isDisabled($(event.currentTarget)) === false) {
          $.when(open_confirm('是否確定要刪除?', '確認') ).then( function (confirmed) {
            if (confirmed) {
              open_message('刪除資料成功','提示');
            }
          })
    		}
  	  });

  	  //確認事件
  	  $("[client-id='btn_confirm']").on("click", function(event){
        event.preventDefault();
  		var pageMode = $("[client-id='pageMode']").attr('data-value');
  		switch(pageMode)
  		{
  			case "Add":
  				$("#foo").val("");
  				$("#foe").val("");
  				open_message('新增資料成功','提示');
  				result_mode();
  				break;
  			case "Edit":
  				$("#foo").val("");
  				$("#foe").val("");
  				open_message('異動資料成功','提示');
  				result_mode();
  				break;
  			case "Query":
  				result_mode();
  				break;
  		}
  	  });

  	  //取消事件
  	  $("[client-id='btn_cancel']").on("click", function(event){
        event.preventDefault();
  		var pageMode = $("[client-id='pageMode']").attr('data-value');
  		switch(pageMode)
  		{
  			case "Add":
  				$.when(open_confirm('是否放棄現有的新增?', '確認')).then(function (confirmed) {
  					if (confirmed) {
  						switch($("[client-id='pageMode']").attr('pre-value'))
  						{
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

  	//查詢模式
  	function query_mode()
  	{
  		//換至此模式時清空查詢結果區與所有查詢欄位
  		$("#foo").val("");
  		$("#foe").val("");
  		$(".pic-grid").data("kendoGrid").dataSource.data([]);
  		$("[client-id='pageMode']").attr('pre-value', $("[client-id='pageMode']").attr('data-value'));
  		$("[client-id='pageMode']").attr('data-value', 'Query');
  		$("[client-id='pageMode']").text('查詢');

  		//控制項權限
  		//查 確 新 編 取 刪 列
  		//E  E  E  D  D  D  D
  		$("[client-id='btn_query']").prop("disabled", false);
  		$("[client-id='btn_confirm']").prop("disabled", false);
  		$("[client-id='btn_add']").prop("disabled", false);
  		$("[client-id='btn_edit']").prop("disabled", true);
  		$("[client-id='btn_cancel']").prop("disabled", true);
  		$("[client-id='btn_delete']").prop("disabled", true);
  		$("[client-id='btn_print']").prop("disabled", true);
  	}

  	//查詢結果模式
  	function result_mode()
  	{
  		//預設帶入第一筆資料
  		$(".pic-grid").data("kendoGrid").dataSource.data(gridData);
  		$("[client-id='pageMode']").attr('pre-value', $("[client-id='pageMode']").attr('data-value'));
  		$("[client-id='pageMode']").attr('data-value', 'Result');
  		$("[client-id='pageMode']").text('查詢結果');
  		$("[client-id='btn_edit']").on("click", function(event){
  		edit_mode(event.currentTarget);
  	    });

  		//控制項權限
  		//查 確 新 編 取 刪 列
  		//E  D  E  E  D  E  E
  		$("[client-id='btn_query']").prop("disabled", false);
  		$("[client-id='btn_confirm']").prop("disabled", true);
  		$("[client-id='btn_add']").prop("disabled", false);
  		$("[client-id='btn_edit']").prop("disabled", false);
  		$("[client-id='btn_cancel']").prop("disabled", true);
  		$("[client-id='btn_delete']").prop("disabled", false);
  		$("[client-id='btn_print']").prop("disabled", false);
  	}

  	//編輯模式
  	function edit_mode(Target)
  	{
  		//換至此模式時清空查詢欄位資料
  		$("[client-id='pageMode']").attr('pre-value', $("[client-id='pageMode']").attr('data-value'));
  		$("[client-id='pageMode']").attr('data-value', 'Edit');
  		$("[client-id='pageMode']").text('編輯');

  		//控制項權限
  		//查 確 新 編 取 刪 列
  		//E  E  D  D  E  D  D
  		$("[client-id='btn_query']").prop("disabled", false);
  		$("[client-id='btn_confirm']").prop("disabled", false);
  		$("[client-id='btn_add']").prop("disabled", true);
  		$("[client-id='btn_edit']").prop("disabled", true);
  		$("[client-id='btn_cancel']").prop("disabled", false);
  		$("[client-id='btn_delete']").prop("disabled", true);
  		$("[client-id='btn_print']").prop("disabled", true);

  		//查詢區帶入上方值
  		var row = $(Target).closest("tr");
          var grid = $(".pic-grid").data("kendoGrid");
          var dataItem = grid.dataItem(row);
  		$("#foo").val(dataItem.group_id);
  		$("#foe").val(dataItem.group_name);
  	}

  	//新增模式
  	function add_mode()
  	{
  		//換至此模式時清空查詢欄位資料
  		$("#foo").val("");
  		$("#foe").val("");
  		$("[client-id='pageMode']").attr('pre-value', $("[client-id='pageMode']").attr('data-value'));
  		$("[client-id='pageMode']").attr('data-value', 'Add');
  		$("[client-id='pageMode']").text('新增');

  		//控制項權限
  		//查 確 新 編 取 刪 列
  		//E  E  E  D  D  E  D
  		$("[client-id='btn_query']").prop("disabled", false);
  		$("[client-id='btn_confirm']").prop("disabled", false);
  		$("[client-id='btn_add']").prop("disabled", false);
  		$("[client-id='btn_edit']").prop("disabled", true);
  		$("[client-id='btn_cancel']").prop("disabled", true);
  		$("[client-id='btn_delete']").prop("disabled", false);
  		$("[client-id='btn_print']").prop("disabled", true);
  	}

  	//顯示確認的視窗
  	function open_confirm(Message, Title)
  	{
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
});
