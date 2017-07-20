$(document).ready(function(){

//查詢事件
$("[client-id='btn_query']").on("click", function(event){
  event.preventDefault();
  var content = $(event.currentTarget).closest('.pic-tab-content');
  // var formEl = $(event.currentTarget).closest('.pic-tab-content').find('.pic-form');
  // var validate = isValidated(formEl);
  var disabled = isDisabled($(event.currentTarget));

  if (disabled === false) {
    // console.log("pass");
    var pre_mode = content.children('.pic-toolbar').find("[client-id=pageMode]").attr('data-value');
    //console.log(pre_mode);
    if(pre_mode == 'Add') {
      $.when(open_confirm('是否放棄現有的新增?', '確認', 'add')).then(function (confirmed) {
        if (confirmed) {
          query_mode();
        }
      })
    }
    else if(pre_mode == 'Edit'){
      $.when(open_confirm('是否放棄儲存現在的資料?', '確認', 'edit')).then(function (confirmed) {
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
  var content = $(event.currentTarget).closest('.pic-tab-content');
  var disabled = isDisabled($(event.currentTarget));

  if (disabled === false) {
    var pre_mode = content.children('.pic-toolbar').find("[client-id=pageMode]").attr('data-value');
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

  if (disabled === false) {
    $.when(open_confirm('是否確定要刪除?', '確認', 'delete')).then(function (confirmed) {
      if (confirmed) {
        console.log();
        open_message('刪除資料成功', '提示', 'success');
      }
    })
  }
});

//確認事件
$("[client-id='btn_confirm']").on("click", function(event){
  event.preventDefault();
  var content = $(event.currentTarget).closest('.pic-tab-content');

  var formEl = content.children('.pic-panel').children('.pic-form');
  var validate = isValidated(formEl);
  var disabled = isDisabled($(event.currentTarget));

  if (validate && disabled === false) {
    // console.log("confirm pass");
    var pageMode = content.children('.pic-toolbar').find("[client-id=pageMode]").attr('data-value');
    switch(pageMode) {
      case "Add":
        //console.log(formEl.find('.pic-form-control'));
        formEl.find('.pic-form-control').each(function(){
          $(this).val('');
        });
        open_message('新增資料成功','提示', 'add');
        result_mode();
        break;
      case "Edit":
        formEl.find('.pic-form-control').each(function(){
          $(this).val('');
        });
        open_message('異動資料成功','提示', 'edit');
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
  var content = $(event.currentTarget).closest('.pic-tab-content');
  var formEl = content.children('.pic-panel').children('.pic-form');
  var pageMode = content.children('.pic-toolbar').find("[client-id=pageMode]").attr('data-value');
  switch(pageMode) {
    case "Add":
      $.when(open_confirm('是否放棄現有的新增?', '確認', 'add')).then(function (confirmed) {
        if (confirmed) {
          switch(content.children('.pic-toolbar').find("[client-id=pageMode]").attr('pre-value')) {
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
      $.when(open_confirm('是否放棄儲存現在的資料?', '確認', 'edit')).then(function (confirmed) {
        if (confirmed) {
          formEl.find('.pic-form-control').each(function(){
            $(this).val('');
          });
          result_mode();
        }
      });
      break;
  }
});

//報表事件
$("[client-id='btn_print']").on("click", function(event){
  event.preventDefault();
  var content = $(event.currentTarget).closest('.pic-tab-content');
  var disabled = isDisabled($(event.currentTarget));

  if (disabled === false) {
    kendo.ui.progress(content.parent(".pic-tab-contents"), true);
    setTimeout(function(){
          kendo.ui.progress(content.parent(".pic-tab-contents"), false);
         window.open('/群組資訊.xlsx');
    }, 2000);
  }
});



});
