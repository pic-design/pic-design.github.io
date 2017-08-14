window.PIC = (function () {
  // make the PIC object
  var PIC = {

    disableGrid: function(grid){
      grid.addClass('disabled');
    },
    // show alert dialog (one button)
    alert: function (content, option, title) {
      var config = {
        width: 300,
        modal: false,
        title: '訊息視窗',
        content: content,
        closable: false,
        buttonLayout: 'normal',
        actions: [{
          text: '確認',
          action: function(event){
            return true;
          }
        }]
      };
      if (title) {
        config.title = title;
      }

      var dialog = $('<div>').kendoDialog(config).data('kendoDialog');
      var wrapper = dialog.wrapper; // the whole dialog box
      var element = dialog.element; // content

      // add option-related class to wrapper
      // option: info, success, warning, danger
      if (option) {
        wrapper.addClass('pic-dialog--' + option);
      }else{
        wrapper.addClass('pic-dialog--info');
      }
      dialog.open();
      // console.log(config);
    },
    // show confirm dialog (two buttons)
    confirm: function (content, option, title) {
      var deferred = jQuery.Deferred();
      var result = false;
      var config = {
        width: 300,
        title: '訊息視窗',
        content: content,
        closable: false,
        buttonLayout: 'normal',
        actions: [{
          text: '是',
          action: function(e){
            result = true;
            deferred.resolve(result);
          }
        },{
          text: '否',
          action: function(e){
            deferred.resolve(result);
          },
          primary: true
        }]
      };

      if (title) {
        config.title = title;
      }

      var dialog = $('<div>').kendoDialog(config).data('kendoDialog');
      var wrapper = dialog.wrapper; // the whole dialog box
      var element = dialog.element; // content

      // add option-related class to wrapper
      // option: info, success, warning, danger
      if (option) {
        wrapper.addClass('pic-dialog--' + option);
      }else{
        wrapper.addClass('pic-dialog--info');
      }
      dialog.open();
      // returns a deferred object
      return deferred.promise();
    },
    // check if an element is disabled
    isDisabled: function (el) {
       if(el.hasClass('disabled') || el.attr('disabled')) {
         // element is disabled
         return true;
       } else {
         // element is not disabled
         return false;
       }
    },
    // check if form is validated
    isFormValidated: function (form) {
      var requires = form.find('.pic-input[required]');
      // console.log(requires);
      // 檢查每個必填欄位是不是已經有值，有的話移除 warning class
      requires.each(function () {
        if ($(this).val()) {
          $(this).removeClass('pic-input--warning');
          $(this).removeAttr('title');
          // destroy kendoTooltip object
          if($(this).data('kendoTooltip')) {
            // $(this).data('kendoTooltip').destroy();
            $(this).kendoTooltip('destroy');
          }
        } else {
          $(this).addClass('pic-input--warning');
          // tooltip 的內容就是元素的 title 值
          $(this).attr('title', '這個必填');
          // 使用 Kendo Tooltip 來產生提示訊息
          $(this).kendoTooltip({
            position: 'top'
          });
        }
      });
      // 檢查表單是不是還有 warning class 的欄位
      var length = form.find('.pic-input--warning').length;
      if (length === 0) {
        return true;
      } else {
        return false;
      }
    },
    queryMode: function (workarea) {
      // 清空查詢欄位
      workarea.find('.pic-form input').val('');

      // 清空查詢結果
      var grid = workarea.find('.pic-grid').data('kendoGrid');
      console.log(typeof grid);
      if (typeof grid !== 'undefined') {
        grid.dataSource.data([]);
      }

      // change page mode label to 'query mode'
      var label = workarea.find("[client-id='pageMode']");
      label.attr('pre-value', label.attr('data-value'));
      label.attr('data-value', 'query');
      label.text('查詢');

      // 控制項權限
      // 查 確 新 編 取 刪 列
      // E  E  E  D  D  D  E
      workarea.find("[client-id='query']").attr("disabled", false);
      workarea.find("[client-id='confirm']").attr("disabled", false);
      workarea.find("[client-id='add']").attr("disabled", false);
      workarea.find("[client-id='edit']").attr("disabled", true);
      workarea.find("[client-id='cancel']").attr("disabled", true);
      workarea.find("[client-id='delete']").attr("disabled", true);
      workarea.find("[client-id='print']").attr("disabled", false);

      // disable detail tab
      workarea.find(".pic-tab[name='detail']").addClass('disabled');
    },
    resultMode: function (workarea) {
      var grid = workarea.find('.pic-grid');
      var label = workarea.find("[client-id='pageMode']");
      // import data to grid
      if(grid.attr('id') === 'master-grid') {
        grid.data("kendoGrid").dataSource.data(masterData);
      } else if (grid.attr('id') === 'detail-grid') {
        grid.data("kendoGrid").dataSource.data(detailData);
      } else if (grid.attr('id') === 'main-grid') {
        grid.data("kendoGrid").dataSource.data(mainData);
      }

      // change label to 'result mode'
      label.attr('pre-value', label.attr('data-value'));
      label.attr('data-value', 'result');
      label.text('查詢結果');

      // Add event to edit buttons in grid
      grid.on('click', '[client-id="btn_edit"]', function(event) {
        PIC.editMode( $(event.currentTarget) );
      });


      // 控制項權限
      // 查 確 新 編 取 刪 列
      // E  D  E  E  D  E  D
      workarea.find("[client-id='query']").attr("disabled", false);
      workarea.find("[client-id='confirm']").attr("disabled", true);
      workarea.find("[client-id='add']").attr("disabled", false);
      workarea.find("[client-id='edit']").attr("disabled", false);
      workarea.find("[client-id='cancel']").attr("disabled", true);
      workarea.find("[client-id='delete']").attr("disabled", false);
      workarea.find("[client-id='print']").attr("disabled", true);
      workarea.find("[client-id='detail']").attr("disabled", false);

      // disable detail tab
      workarea.find(".pic-tab[name='detail']").addClass('disabled');
    },
    editMode: function (btn) {
      var row = btn.closest("tr");
      var grid = row.closest(".pic-grid");
      var dataGrid = grid.data('kendoGrid');
      var workarea = grid.parent('.pic-workarea');
      var label = workarea.find("[client-id='pageMode']");

      // change label to 'edit mode'
      label.attr('pre-value', label.attr('data-value'));
      label.attr('data-value', 'edit');
      label.text('編輯');

      // 查詢欄位顯示選擇列的值
      var dataItem = dataGrid.dataItem(row);
      // $("#foo").val(dataItem.group_id);
      // $("#foe").val(dataItem.group_name);

      // 控制項權限
      // 查 確 新 編 取 刪 列
      // E  E  D  D  E  D  D
      workarea.find("[client-id='query']").attr("disabled", false);
      workarea.find("[client-id='confirm']").attr("disabled", false);
      workarea.find("[client-id='add']").attr("disabled", true);
      workarea.find("[client-id='edit']").attr("disabled", true);
      workarea.find("[client-id='cancel']").attr("disabled", false);
      workarea.find("[client-id='delete']").attr("disabled", true);
      workarea.find("[client-id='print']").attr("disabled", true);
      workarea.find("[client-id='detail']").attr("disabled", true);

      // disable detail tab
      workarea.find(".pic-tab[name='detail']").addClass('disabled');
    },
    addMode: function (workarea) {
      // 清空查詢欄位
      workarea.find('.pic-form input').val('');

      // reset validate messages
      workarea.find('.pic-input--warning').removeClass('pic-input--warning');

      // change page mode label to 'add mode'
      var label = workarea.find("[client-id='pageMode']");
      label.attr('pre-value', label.attr('data-value'));
      label.attr('data-value', 'add');
      label.text('新增');

      // 控制項權限
      // 查 確 新 編 取 刪 列
      // E  E  E  D  E  D  D
      workarea.find("[client-id='query']").attr("disabled", false);
      workarea.find("[client-id='confirm']").attr("disabled", false);
      workarea.find("[client-id='add']").attr("disabled", false);
      workarea.find("[client-id='edit']").attr("disabled", true);
      workarea.find("[client-id='cancel']").attr("disabled", false);
      workarea.find("[client-id='delete']").attr("disabled", true);
      workarea.find("[client-id='print']").attr("disabled", true);
      workarea.find("[client-id='detail']").attr("disabled", true);
      // disable detail tab
      workarea.find(".pic-tab[name='detail']").addClass('disabled');
    }
  };

  // return the PIC object as a library
  return PIC;
})();
