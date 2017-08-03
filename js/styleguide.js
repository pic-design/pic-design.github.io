
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
    var number = event.dataItem.number;
    var sender = event.sender;
    var display = sender.element.closest('.pic-form-element').find('.pic-input[readonly]');
    display.val(number);
  }
});

// Tab function
var tabsOpened = ['foo', 'foe', 'fat'];
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
