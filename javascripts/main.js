"use strict";
var body = $("body")
var output = $("#output")

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


var populateMainDropdown = function(data) {
  var buildstring = `<div class="dropdown">`
  buildstring += `<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    Select Category
    <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" id="categories" aria-labelledby="dropdownMenu1">
    <li id=${data.categories[0].name}>${data.categories[0].name}</li>
    <li id=${data.categories[0].name}>${data.categories[1].name}</li>
    </ul>
  </div>`
  output.append(buildstring);
}


var populateSecondaryDropDown = function(data) {
  var buildstring = `<div class="dropdown">`
  buildstring += `<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    Select Category
    <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" id="types"aria-labelledby="dropdownMenu1">
    <li>${data.types[0].name}</li>
    <li>${data.types[1].name}</li>
    <li>${data.types[2].name}</li>
    </ul>
  </div>`
  output.append(buildstring);
}



var populateDOM = function(data) {
  var buildstring = "";
  for (var i = 0; i < data.products.length; i++) {
    buildstring += `<div class="col-md-4"><div class="card">`
    buildstring += `<h4 class="productHeader">${data.products[i].name}</h4>`
    buildstring += `<h4 class="productDescription">${data.products[i].description}</h4>`
    buildstring += `</div></div>`
  }
    output.append("<div class=row>" + buildstring + "</div>");
}

var decideWhichDataToLoad = function() {
  body.click(function(e){
    console.log("e", e);





  });
}


firstXHR().then(populateMainDropdown).then(secondXHR).then(populateSecondaryDropDown).then(decideWhichDataToLoad).then(thirdXHR).then(populateDOM);