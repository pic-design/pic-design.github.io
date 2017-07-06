$(document).ready(function() {
  $(".pic-nav").kendoTreeView();

  // Tab function
  // $(".pic-tabs").on("click", function(event){
  //   var target = $(event.target);
  //   console.log(event);
  //   if (!target.hasClass('pic-tab--selected')) {
  //     target.addClass('pic-tab--selected');
  //   }
  // });

  $(".pic-grid").kendoGrid({
        dataSource: {
            type: "odata",
            transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
            },
            pageSize: 20
        },
        height: 550,
        groupable: true,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
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
