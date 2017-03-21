/*global $*/
/*global BASE_URL*/
/*global isNumeric*/
/*global numericSortAoA*/
function ArticlesView(){
  this.url = BASE_URL + '/articles';
};

ArticlesView.prototype.tableHeader = function() {
  // use only javascript vanilla
  var articlesView = this;
  var constants = {
    id: 'article-id',
    title: 'article-title',
    content: 'article-content',
  };
  var headerTypes = Object.keys(constants);
  
  // get references to table data
  var tableData = articlesView.getTableData();
  var tableHeader = tableData.headerData;
  var tableDataClone = tableData;
  
  // get reference to search input by traversing DOM
  var searchInput = tableData.tableRef[0].parentNode.previousElementSibling;

  // set event listers for table headers for sorting table data asc/desc
  headerTypes.forEach(function(type, i) {
    var cValue = constants[type];
    var elemRef = tableHeader[cValue].elem;
    elemRef.addEventListener('click', function(){
      // mark it as clicked
      var sortType = 'asc';
      var state = elemRef.getAttribute('data-sort');
      if ( !state || state == 1 ) {
        elemRef.setAttribute('data-sort', 0);
        sortType = 'desc';
      }
      else {
        elemRef.setAttribute('data-sort', 1);
      }

      var cName = tableHeader[cValue].name;
      var cNumber = tableHeader[cValue].number;
      var sortResult = articlesView.tableSort(cNumber, cName, tableData.contentData, sortType);
      articlesView.rearrangeData(tableData, sortResult.sortedData);
    });
  });
  
  searchInput.addEventListener('keypress', function(e){
    tableData = tableDataClone;
    var cNumber = tableHeader[constants.title].number;
    var inputValue = searchInput.value + e.key;
    if ( inputValue ) {
      var searchResult = articlesView.searchInput(inputValue, cNumber, tableData.contentData);
      articlesView.selectData(cNumber, tableData, searchResult.newData);
    }
  });
};

ArticlesView.prototype.getTableData = function() {
  // use only javascript vanilla
  var tableHeaderData = {};
  var tableData = [];

  var tableRef = document.getElementsByClassName('articles-view-table');
  var tableHeaderRef = tableRef[0].getElementsByTagName('thead');
  var tableHeaderRow = tableHeaderRef[0].firstElementChild;

  // build object as { name: elem }
  for (var i = 1; i < tableHeaderRow.children.length; i++) {

    var fieldName = tableHeaderRow.children[i].getAttribute('name');
    tableHeaderData[fieldName] = {
      name: fieldName,
      number: i,
      elem: tableHeaderRow.children[i]
    };
  }
  
  var tableContentRef = tableRef[0].getElementsByTagName('tbody');
  var tableContentRows = tableContentRef[0].children;
  // build AoA with each row data
  for (var i = 0; i < tableContentRows.length; i++) {
    var fieldsData = [];
    var rowsChildren = tableContentRows[i].children;

    for (var j = 1; j < rowsChildren.length; j++) {

      fieldsData.push(rowsChildren[j].innerHTML);
    }
    
    tableData.push(fieldsData);
  }

  return {
    tableRef: tableRef,
    tableHeaderRef: tableHeaderRef,
    tableContentRef: tableContentRef,
    headerData: tableHeaderData,
    contentData: tableData
  };
};

ArticlesView.prototype.tableSort = function(cNumber, cName, data, type) {
  var indexRef = cNumber - 1; // ignore first column
  var sortedData = data;
  var firstRowData = data[0][indexRef];

  // check what type of data is inside column
  // assume that the data type from first column applies to all rows
  if ( isNumeric(firstRowData) ) {
    numericSortAoA(sortedData, indexRef, type);
  }
  else {
    sortedData.sort();
    if ( type === 'desc' ) sortedData.reverse();
  }

  return {
    cNumber: cNumber,
    cName: cName,
    sortedData: sortedData
  };
};

ArticlesView.prototype.rearrangeData = function(tableData, newData) {
  var tableContentRows = tableData.tableContentRef[0].children;
  for (var i = 0; i < tableContentRows.length; i++) {
    var rowsChildren = tableContentRows[i].children;
    // ignore first column
    for (var j = 1; j < rowsChildren.length; j++) {
      rowsChildren[j].textContent = newData[i][j-1];
    }
  }
};

ArticlesView.prototype.selectData = function(cNumber, tableData, newData) {
  var tableContent = tableData.tableContentRef[0];
  var tableContentRows = tableContent.children;
  for (var i = 0; i < tableContentRows.length; i++) {
    var row = tableContentRows[i];
    var rowField = row.children[cNumber];
    var found = false;

    for (var k = 0; k < newData.length; k++) {
      if ( newData[k][cNumber - 1] === rowField.textContent ) {
        found = true; 
      }
    }
    
    if ( !found ) {
      row.classList.add('hide');
    }
  }
};

ArticlesView.prototype.searchInput = function(inputValue, cNumber, data) {
  // default search after title
  var newData = [];
  var indexRef = cNumber - 1;
  var regex = new RegExp(".+"+inputValue+".+");

  for (var i = 0; i < data.length; i++) {
    var dataValue = data[i][indexRef];
    if ( regex.exec(dataValue) ) {
      newData.push(data[i]);
    }
  }
  
  return {
    newData: newData
  };
}

