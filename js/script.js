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
      + fName
      + '<span class="pic-stack">'
      + '<i class="fa fa-circle"></i>'
      + '<i class="fa fa-remove"></i>'
      + '</span>'
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
    if (target.hasClass('pic-tab') && !target.hasClass('pic-tab--selected')) {
      // If the clicked tab is not selected
      tabSwitch(target.attr('name'));

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
        dataSource: {
            type: "odata",
            transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
            },
            pageSize: 20
        },
        height: 550,

        sortable: true,
        pageable: {
            //refresh: true,
            //pageSizes: true,
            //buttonCount: 5
        },
        columns: [{
            field: "ContactName",
            title: "Contact Name",
            width: 240
        }, {
            field: "ContactTitle",
            title: "Contact Title"
        }, {
            field: "CompanyName",
            title: "Company Name"
        }, {
            field: "Country",
            width: 150
        }]
    });

    $('#ham').on('click', function(){
      if ($('.pic-sidebar').hasClass('pic-sidebar--hidden')) {
        $('.pic-sidebar').removeClass('pic-sidebar--hidden');
      } else {
        $('.pic-sidebar').addClass('pic-sidebar--hidden');
      }
    });

});
