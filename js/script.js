$(document).ready(function() {
  $(".pic-nav").kendoTreeView();

  // Tab function
  $(".pic-tabs").on("click", function(event){
    var tabs = $('.pic-tabs');
    var tabContents = $('.pic-tab-contents');
    var target = $(event.target);
    // console.log(event);
    if (!target.hasClass('pic-tab--selected')) {
      // If the clicked tab is not selected
      // Set selected tab and tab-content to normal
      $('.pic-tab--selected').removeClass('pic-tab--selected');
      $('.pic-tab-content--show').removeClass('pic-tab-content--show');
      // Show sected tab and tab-content
      target.addClass('pic-tab--selected');
      var tabContent = '.pic-tab-content[name='+ target.attr('name') +']';
      $(tabContent).addClass('pic-tab-content--show');
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

});
