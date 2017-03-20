/*global $*/
/*global BASE_URL*/
function ArticlesView(){
  this.url = BASE_URL + '/articles';
};

ArticlesView.prototype.tableHeader = function() {
  // use only javascript vanilla
  // use only javascript vanilla
  // use only javascript vanilla
  var articlesView = this;
  var constants = {
    id: 'article-id',
    title: 'article-title',
    content: 'article-content',
  };
  var tableData = articlesView.getTableData();
  var tableDataClone = tableData;
  var searchInput = tableData.table[0].parentNode.previousElementSibling;
  var header = tableData.headerData;

  header[constants.id].elem.addEventListener('click', function(){
    var cName = header[constants.id].name;
    var cNumber = header[constants.id].number;
    var sortResult = articlesView.tableSort(cNumber, cName, tableData.contentData);
    articlesView.rearrangeData(tableData, sortResult.sortedData);
  });

  header[constants.title].elem.addEventListener('click', function(){
    var cName = header[constants.title].name;
    var cNumber = header[constants.title].number;
    var sortResult = articlesView.tableSort(cNumber, cName, tableData.contentData);
    articlesView.rearrangeData(tableData, sortResult.sortedData);
  });

  header[constants.content].elem.addEventListener('click', function(){
    var cName = header[constants.content].name;
    var cNumber = header[constants.content].number;
    var sortResult = articlesView.tableSort(cNumber, cName, tableData.contentData);
    articlesView.rearrangeData(tableData, sortResult.sortedData);
  });
  
  searchInput.addEventListener('keypress', function(e){
    e.preventDefault;
    tableData = tableDataClone;
    var cNumber = header[constants.title].number;
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

  var table = document.getElementsByClassName('articles-view-table');
  var tableHeader = table[0].getElementsByTagName('thead');
  var tableHeaderRow = tableHeader[0].firstElementChild;

  // build object as { name: elem }
  for (var i = 1; i < tableHeaderRow.children.length; i++) {

    var fieldName = tableHeaderRow.children[i].getAttribute('name');
    tableHeaderData[fieldName] = {
      name: fieldName,
      number: i,
      elem: tableHeaderRow.children[i]
    };
  }
  
  var tableContent = table[0].getElementsByTagName('tbody');
  var tableContentRows = tableContent[0].children;
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
    table: table,
    tableHeader: tableHeader,
    tableContent: tableContent,
    headerData: tableHeaderData,
    contentData: tableData
  };
};

ArticlesView.prototype.tableSort = function(cNumber, cName, data) {
  var indexRef = cNumber - 1;
  var sortedData = data;
  var isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  var firstRowData = data[0][indexRef];

  // check what type of data is inside column
  // assume that the data type from first column applies to all rows
  if ( isNumeric(firstRowData) ) {
    sortedData.sort(function(a, b) {
      return a[indexRef] - b[indexRef];
    });
  }
  else {
    sortedData.sort(function(a, b) {
      if(a[indexRef] < b[indexRef]) return -1;
      if(a[indexRef] > b[indexRef]) return 1;
      return 0;
    })
  }

  return {
    cNumber: cNumber,
    cName: cName,
    sortedData: sortedData
  }
};

ArticlesView.prototype.rearrangeData = function(tableData, newData) {
  var tableContentRows = tableData.tableContent[0].children;
  for (var i = 0; i < tableContentRows.length; i++) {
    var rowsChildren = tableContentRows[i].children;
    for (var j = 1; j < rowsChildren.length; j++) {
      rowsChildren[j].textContent = newData[i][j-1];
    }
  }
};

ArticlesView.prototype.selectData = function(cNumber, tableData, newData) {
  var tableContent = tableData.tableContent[0];
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

