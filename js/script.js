$(document).ready(function() {

  $('.datepicker').kendoDatePicker();
  $(".fabric").kendoComboBox({
      dataTextField: "text",
      dataValueField: "value",
      dataSource: [
          { text: "Cotton", value: "1" },
          { text: "Polyester", value: "2" },
          { text: "Cotton/Polyester", value: "3" },
          { text: "Rib Knit", value: "4" }
      ],
      filter: "contains",
      suggest: true,
      index: 3
  });
  // A global variable on opend tabs
  var tabsOpened = ['aa', 'ac', 'ca'];

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

  $(".pic-grid").kendoGrid({
        dataSource:[
          {"group_id":"TST08","group_name":"維護無刪除","create_date":"2017-07-17T13:46:54.787","create_id":"AMIS","upd_date":"2017-07-17T13:46:54.787","upd_id":"AMIS"},
          {"group_id":"SR001","group_name":"理貨一般","create_date":"2017-07-17T13:46:55.293","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.293","upd_id":"AMIS"},
          {"group_id":"TS004","group_name":"只有修改","create_date":"2017-07-17T13:46:55.33","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.33","upd_id":"AMIS"},
          {"group_id":"RU","group_name":"執行編輯","create_date":"2017-07-17T13:46:55.367","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.367","upd_id":"AMIS"},
          {"group_id":"MIS01","group_name":"管理者","create_date":"2017-07-17T13:46:55.397","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.397","upd_id":"AMIS"},
          {"group_id":"SR002","group_name":"理貨管理","create_date":"2017-07-17T13:46:55.43","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.43","upd_id":"AMIS"},
          {"group_id":"TS002","group_name":"只有新增","create_date":"2017-07-17T13:46:55.577","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.577","upd_id":"AMIS"},
          {"group_id":"TS001","group_name":"只有查詢","create_date":"2017-07-17T13:46:55.69","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.69","upd_id":"AMIS"},
          {"group_id":"TS003","group_name":"只有刪除","create_date":"2017-07-17T13:46:55.733","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.733","upd_id":"AMIS"},
          {"group_id":"TS005","group_name":"只有列印","create_date":"2017-07-17T13:46:55.8","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.8","upd_id":"AMIS"},
          {"group_id":"AC003","group_name":"驗收MIS1","create_date":"2017-07-17T13:46:55.86","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.86","upd_id":"AMIS"},
          {"group_id":"TST08","group_name":"維護無刪除","create_date":"2017-07-17T13:46:54.787","create_id":"AMIS","upd_date":"2017-07-17T13:46:54.787","upd_id":"AMIS"},
          {"group_id":"SR001","group_name":"理貨一般","create_date":"2017-07-17T13:46:55.293","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.293","upd_id":"AMIS"},
          {"group_id":"TS004","group_name":"只有修改","create_date":"2017-07-17T13:46:55.33","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.33","upd_id":"AMIS"},
          {"group_id":"RU","group_name":"執行編輯","create_date":"2017-07-17T13:46:55.367","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.367","upd_id":"AMIS"},
          {"group_id":"MIS01","group_name":"管理者","create_date":"2017-07-17T13:46:55.397","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.397","upd_id":"AMIS"},
          {"group_id":"SR002","group_name":"理貨管理","create_date":"2017-07-17T13:46:55.43","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.43","upd_id":"AMIS"},
          {"group_id":"TS002","group_name":"只有新增","create_date":"2017-07-17T13:46:55.577","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.577","upd_id":"AMIS"},
          {"group_id":"TS001","group_name":"只有查詢","create_date":"2017-07-17T13:46:55.69","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.69","upd_id":"AMIS"},
          {"group_id":"TS003","group_name":"只有刪除","create_date":"2017-07-17T13:46:55.733","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.733","upd_id":"AMIS"},
          {"group_id":"TS005","group_name":"只有列印","create_date":"2017-07-17T13:46:55.8","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.8","upd_id":"AMIS"},
          {"group_id":"AC003","group_name":"驗收MIS1","create_date":"2017-07-17T13:46:55.86","create_id":"AMIS","upd_date":"2017-07-17T13:46:55.86","upd_id":"AMIS"}
        ],
        height: 550,
        sortable: true,
        pageable: {
            //refresh: true,
            pageSize: 20,
            //buttonCount: 5
        },
        columns: [
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

    $('body').on('click', '.pic-button--disabled', function(event) {
      event.preventDefault();
      console.log("prevent default");
    })
});
