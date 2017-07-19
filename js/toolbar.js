$(document).ready(function(){
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
query_mode();

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
});
