// global variables on opend tabs
var tabsOpened = ['aa', 'ab', 'ca'];
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
      tabSwitch(name);
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

$(document).ready(function(){

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
	if(!(currentTarget.attr('disabled') == 'disabled'))
	{
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

  $("#master-grid").on('click', '.detail', function(event){

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

    if (masterTabs.children('.hidden').length > 0) {
      masterTabs.children('.hidden').removeClass('hidden');
      masterContents.children('.hidden').removeClass('hidden');
    }

    var form = masterContents.children('.pic-workarea[name=detail]').find('.pic-form');
    form.find('[name=group_id]').val(id);
    form.find('[name=group_name]').val(name);
    form.find('[name=number]').val(dataItem.number);
    form.find('[name=quantity]').val(dataItem.quantity);
    form.find('[name=price]').val(dataItem.price);
    form.find('[name=sale]').val(dataItem.sale);


    tabSwitch('detail', masterTabs);
	result_mode($('#detail-grid').parent());
	$("li[name='detail']").attr('disabled', null);
  });

});
