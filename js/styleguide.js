
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
