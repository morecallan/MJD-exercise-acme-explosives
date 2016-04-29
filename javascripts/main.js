"use strict";
var body = $("body");
var output = $("#output");
var categoryDropdownOutput= $("#categoryDropdownOutput");
var typesDropdownOutput= $("#typesDropdownOutput");

//First load first XHR
var firstXHR = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "json/categories.json"
    }).done(function(data) {
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

//Then load XHR based on selection
var secondXHR = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "json/types.json"
    }).done(function(data) {
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

var thirdXHR = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "json/products.json"
    }).done(function(data) {
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};


var populateMainDropdownCategories = function(data) {
  var buildstring = `<div class="dropdown" id="categoriesDropdown">`;
  buildstring += `<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    Select Category
    <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" id="categories" aria-labelledby="dropdownMenu1">
    <li id="${data.categories[0].id}">${data.categories[0].name}</li>
    <li id="${data.categories[1].id}">${data.categories[1].name}</li>
    </ul>
  </div>`;
  categoryDropdownOutput.html(buildstring);
};

var decideWhichDataToLoadforTypes = function(data) {
  categoryDropdownOutput.click(function(e){
    var categoryClicked = null;
    if (e.target.id == 0) {
      categoryClicked = e.target.id;
      populateSecondaryDropDownTypes(data, categoryClicked);
    } else if (e.target.id == 1) {
      categoryClicked = e.target.id;
      populateSecondaryDropDownTypes(data, categoryClicked);
    }
  });
};

var populateSecondaryDropDownTypes = function(data, categoryClicked) {
  var buildstring = `<div class="dropdown" id="typesDropdown">`;
  buildstring += `<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">`;
  buildstring += `Select Type`;
  buildstring += `<span class="caret"></span>`;
  buildstring += `</button>`;
  buildstring += `<ul class="dropdown-menu" id="types"aria-labelledby="dropdownMenu1">`;
  for (var i = 0; i < data.types.length; i++) {
    if (data.types[i].category == categoryClicked) {
      buildstring += `<li id="${data.types[i].id}">${data.types[i].name}</li>`;
    }
  }
  buildstring +=  `</ul> </div>`;
  typesDropdownOutput.html(buildstring);
};

var decideWhichDataToLoadforProducts = function(data) {
  typesDropdownOutput.click(function(e){
    var typeClicked = null;
    if (e.target.id == 0) {
      typeClicked = e.target.id;
      populateProductsOnDOM(data, typeClicked);
    } else if (e.target.id == 1) {
      typeClicked = e.target.id;
      populateProductsOnDOM(data, typeClicked);
    } else if (e.target.id == 2) {
      typeClicked = e.target.id;
      populateProductsOnDOM(data, typeClicked);
    } else if (e.target.id == 3) {
      typeClicked = e.target.id;
      populateProductsOnDOM(data, typeClicked);
    } else if (e.target.id == 4) {
      typeClicked = e.target.id;
      populateProductsOnDOM(data, typeClicked);
    } else if (e.target.id == 5) {
      typeClicked = e.target.id;
      populateProductsOnDOM(data,typeClicked);
    }
  });
};

var populateProductsOnDOM = function(data, typeClicked) {
  var buildstring = "";
  for (var i = 0; i < data.products.length; i++) {
    if (data.products[i].type == typeClicked) {
      buildstring += `<div class="col-md-4 card">`;
      buildstring += `<h4 class="productHeader">${data.products[i].name}</h4>`;
      buildstring += `<h4 class="productDescription">${data.products[i].description}</h4>`;
      buildstring += `</div>`
    };
  }
    output.html("<div class=row>" + buildstring + "</div>");
};


firstXHR().then(populateMainDropdownCategories);
secondXHR().then(decideWhichDataToLoadforTypes);
thirdXHR().then(decideWhichDataToLoadforProducts);