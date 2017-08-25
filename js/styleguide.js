
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

// data grid
var gridData = [
  {"group_id":"TST08","group_name":"維護無刪除","create_date":"2017-07-17","create_id":"AMIS","count":"100"},
  {"group_id":"SR001","group_name":"理貨一般","create_date":"2017-07-17","create_id":"AMIS","count":"220"},
  {"group_id":"TS004","group_name":"只有修改","create_date":"2017-07-17","create_id":"AMIS","count":"1123"},
  {"group_id":"RU","group_name":"執行編輯","create_date":"2017-07-17","create_id":"AMIS","count":"197723"},
  {"group_id":"MIS01","group_name":"管理者","create_date":"2017-07-17","create_id":"AMIS","count":"6446"},
  {"group_id":"SR002","group_name":"理貨管理","create_date":"2017-07-17","create_id":"AMIS","count":"732"},
  {"group_id":"TS002","group_name":"只有新增","create_date":"2017-07-17","create_id":"AMIS","count":"886333"},
  {"group_id":"TS001","group_name":"只有查詢","create_date":"2017-07-17","create_id":"AMIS","count":"124435"},
  {"group_id":"TS003","group_name":"只有刪除","create_date":"2017-07-17","create_id":"AMIS","count":"89567457"},
  {"group_id":"TS005","group_name":"只有列印","create_date":"2017-07-17","create_id":"AMIS","count":"4356"},
  {"group_id":"AC003","group_name":"驗收MIS1","create_date":"2017-07-17","create_id":"AMIS","count":"34235"},
  {"group_id":"TST08","group_name":"維護無刪除","create_date":"2017-07-17","create_id":"AMIS","count":"3525"},
  {"group_id":"SR001","group_name":"理貨一般","create_date":"2017-07-17","create_id":"AMIS","count":"532"},
  {"group_id":"TS004","group_name":"只有修改","create_date":"2017-07-17","create_id":"AMIS","count":"8865"},
  {"group_id":"RU","group_name":"執行編輯","create_date":"2017-07-17","create_id":"AMIS","count":"423"},
  {"group_id":"MIS01","group_name":"管理者","create_date":"2017-07-17","create_id":"AMIS","count":"100"},
  {"group_id":"SR002","group_name":"理貨管理","create_date":"2017-07-17","create_id":"AMIS","count":"100"},
  {"group_id":"TS002","group_name":"只有新增","create_date":"2017-07-17","create_id":"AMIS","count":"100"},
  {"group_id":"TS001","group_name":"只有查詢","create_date":"2017-07-17","create_id":"AMIS","count":"100"},
  {"group_id":"TS003","group_name":"只有刪除","create_date":"2017-07-17","create_id":"AMIS","count":"100"},
  {"group_id":"TS005","group_name":"只有列印","create_date":"2017-07-17","create_id":"AMIS","count":"100"},
  {"group_id":"AC003","group_name":"驗收MIS1","create_date":"2017-07-17","create_id":"AMIS","count":"100"}
];

$(".pic-grid").kendoGrid({
  dataSource: gridData,
  height: 501,
  //sortable: true,
  pageable: {
    pageSize: 10,
  },
  columns:[
    {
      selectable: true,
      width: 40
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
      field:"count",
      title:"使用數量",
      attributes: {
        "class": "pic-txt--right"
      }
    },
    {
      field: "create_date",
      title: "建立日期"
    },
    {
      field: "create_id",
      title: "建立人員"
    }
  ]
});
