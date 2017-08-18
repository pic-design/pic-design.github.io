$(document).ready(function(){

// 啟動功能就進入查詢模式
PIC.queryMode($("#main-grid").parent('.pic-workarea'));
PIC.queryMode($("#master-grid").parent('.pic-workarea'));



$('.pic-toolbar').on('click', '.pic-btn', function (event) {
  event.preventDefault();
  var wrapper = $(event.currentTarget).closest('.pic-workarea');
  // check if the clicked button is disabled
  var disabled = PIC.isDisabled($(event.currentTarget));

  // if button is active
  if (disabled === false) {
    var id = $(event.currentTarget).attr('client-id');
    // console.log('current mode: '+id);
    // if button is not disabled, change page mode
    var previousMode = wrapper.children('.pic-toolbar').find("[client-id=pageMode]").attr('data-value');
    // console.log('previousMode: '+previousMode);

    var deferred = '';

    if (id === 'query') {
      // 查詢模式
      if(previousMode === 'add') {
        deferred = PIC.confirm('是否放棄現有的新增?', 'warning');
        deferred.then(function (confirmed) {
          // console.log(confirmed);
          if (confirmed) {
            PIC.queryMode(wrapper);
          }
        })
      } else if (previousMode === 'edit') {
        deferred = PIC.confirm('是否放棄儲存現在的資料?', 'warning');
        deferred.then(function (confirmed) {
          if (confirmed) {
            PIC.queryMode(wrapper);
          }
        })
      } else {
        PIC.queryMode(wrapper);
      }
    } else if (id === 'add') {
      // 新增模式
      if(previousMode === 'add') {
        deferred = PIC.confirm('是否放棄現有的新增?', 'warning');
        deferred.then(function (confirmed) {
          if (confirmed) {
            PIC.addMode(wrapper);
          }
        })
      } else if (previousMode === 'edit') {
        deferred = PIC.confirm('是否放棄儲存現在的資料?', 'warning');
        deferred.then(function (confirmed) {
          if (confirmed) {
             PIC.addMode(wrapper);
          }
        })
      } else {
        PIC.addMode(wrapper);
      }
    } else if (id === 'delete') {
      // 刪除模式
      // console.log('delete mode');
      deferred = PIC.confirm('是否確定要刪除?', 'danger');
      deferred.then(function (confirmed) {
        if (confirmed) {
          PIC.alert('資料已刪除', 'success');
        }
      })
    } else if (id === 'confirm') {
      // 確認
      // var grid = wrapper.find('.pic-grid')[0].id;
      var formEl = wrapper.find('.pic-form');
      var validate = PIC.isFormValidated(formEl);

      if (validate) {
        switch(previousMode) {
          case "add":
            console.log('confirm:add');
            // clear form values
            formEl.find('.pic-input').val('');
            PIC.alert('資料已新增','success');
            PIC.resultMode(wrapper);
            break;
          case "edit":
            console.log('confirm:edit');
            // clear form values
            formEl.find('.pic-input').val('');
            PIC.alert('資料已更新','success');
            // restore disabled grid
            wrapper.find('.pic-grid.disabled').removeClass('disabled');
            PIC.resultMode(wrapper);
            break;
          case "query":
            console.log('confirm:query');
            PIC.resultMode(wrapper);
            break;
        }
      }

    } else if (id === 'cancel') {
      // console.log('按了取消');
      // 取消
      var formEl = wrapper.children('.pic-form');
      switch(previousMode) {
        case "add":
          deferred = PIC.confirm('是否放棄現有的新增?', 'warning');
          deferred.then(function (result) {
            if (result === true) {
              switch(wrapper.children('.pic-toolbar').find("[client-id=pageMode]").attr('pre-value')) {
                case "query":
                  PIC.queryMode(wrapper);
                  break;
                case "result":
                  PIC.resultMode(wrapper);
                  break;
              }
            }
          });
          break;
        case "edit":
          deferred = PIC.confirm('是否放棄儲存現在的資料?', 'warning');
          deferred.then(function (result) {
            if (result === true) {
              // if user selected 'yes'
              // result is true
              formEl.find('.pic-input').val('');
              // restore disabled grid
              wrapper.find('.pic-grid.disabled').removeClass('disabled');          
              PIC.resultMode(wrapper);
            }
          });
          break;
      }
    } else if (id === 'print') {
      // 列印報表
      kendo.ui.progress(wrapper.parent('.pic-workareas'), true);
      setTimeout(function(){
        kendo.ui.progress(wrapper.parent(".pic-workareas"), false);
        window.open('/群組資訊.xlsx');
      }, 2000);
    }

  }
});

});
