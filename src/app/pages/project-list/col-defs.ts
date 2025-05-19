export class ProjectListColumnDefinition {

    constructor() { }

    gridOptions: any = {

        allowDragFromColumnsToolPanel: true,
        alwaysShowHorizontalScroll: true,
        defaultColGroupDef: { marryChildren: true, children: [] },
        defaultColDef: {
            editable: false,
            flex: 1,
            minWidth: 100,
            sortable: true,
            filter: "agSetColumnFilter",
            resizable: true,
        },
        columnDefs: [
            {
                headerName: "Project", field: "projectName",
                 width: 350, sort: 'asc',
            },
            { headerName: "Features", field: "featureCount", },

            { headerName: "Templates", field: "templateCount", },
            { headerName: "Active Tests", field: "testCount", },
           

            { headerName: "Status", field: "status", enableRowGroup: true, },
            {
                headerName: "Status Date", field: "statusDate",hide: true ,
                valueFormatter: (params: any) => { return new Date(params.value).toLocaleDateString() }
            },


        ],
    };

    getContextMenuItems(params: any) {
        var result: any = [
            'copy', 'export'
        ];
        return result;
    }

    currencyFormatter(params: any) {
        const value = params.value;
        // Handle cases where value might be null or undefined
        if (value === null || value === undefined) {
            return "";
        }
        return '$' + value.toFixed(2); // Format as USD with two decimal places
    }



}

/*

{
 
""
 
OfficeId
: 
166
OfficeName
: 
"The Laura Hotel"
OfficeNumber
: 
"102"
 
: 
"Active"
StatusDate
: 
"2024-09-11T09:46:00"
UserGroup
: 
"None"
UserId
: 
139
UserLevel
: 
"User"
UserName
: 
"dhairgrove"
WorkPhone
: 
"409-457-2122"

*/