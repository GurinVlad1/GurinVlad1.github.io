window.addEventListener("DOMContentLoaded", function () {
  var radios = document.getElementsByName("services");
  var count = document.getElementById("counts");
  var form = document.getElementById("main_form");
  form.onsubmit = function () {
    return false;
  }
  for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function () {
      if (this !== null) {
        changes(this);
        service = this;
        var calcOption = document.getElementById("calcOption");
        var Stoim = 0;
        calcOption.addEventListener("change", function () {
          Stoim = checkServices(service.value);
        })
        count.value = "";
        var cnt;
        count.addEventListener("change", function () {
          cnt = this.value;
        })
        document.addEventListener("change", function () {
          if (typeof(cnt) !== "undefined") {
            if (!isNaN(Number(cnt)) && cnt !== "") {
              showTotalPrice(service, Stoim, Number(cnt));
            } else {
              document.getElementById("totalPrice").innerHTML = "";
            }
          }
        })
      }
    });
  }
});

var servicesInfo = {
  fullWashandClin : {
    mainPrice : 30000
  },
  NewMachine : {
    mainPrice : 500000,
    options : {
      Bmw : {
        addPrice : 1000000,
        title : "Покупка BMW"
      },
      Lada : {
        addPrice : 500000,
        title : "Покупка LADA"
      },
      Mazda : {
        addPrice : 750000,
        title : "Покупка MAZDA"
      }
    }
  },
  sto : {
    mainPrice : 10000,
    features : {
      shodrazval : {
        addPrice : 15000,
        title : "Сход развал"
      },
      dvig : {
        addPrice : 30000,
        title : "Осмотр двигателя"
      },
      Shinamontage : {
        addPrice : 14000,
        title : "Шиномонтаж"
      }
    }
  }
}

function changes(radio) {
  var calcOption = document.getElementById("calcOption");
  calcOption.innerHTML = "";
  var service = servicesInfo[radio.value];
  if (Object.keys(service).length === 2) {
    if ("options" === Object.keys(service)[1]) {
      var options = document.createElement("select");
      options.classList.add("text");
      options.name = "options";
      options.id = "select";
      var option = document.createElement("option");
      option.value = " ";
      option.innerHTML = "Опции";
      options.appendChild(option);
      for (var value in service.options) {
        var option = document.createElement("option");
        option.value = value;
        option.innerHTML = service.options[value].title;
        options.appendChild(option);
      }
      var p = document.createElement("p");
      var label = document.createElement("label");
      label.classList.add("text");
      label.htmlFor = "select";
      label.innerHTML += "Опция";
      p.appendChild(label);
      p.appendChild(options);
      calcOption.appendChild(p);
    } else if ("features" === Object.keys(service)[1]) {
      var label = document.createElement("label");
      label.classList.add("text");
      label.innerHTML = "Свойства";
      calcOption.appendChild(label);
      for (var value in service.features) {
        var feature = document.createElement("input");
        feature.type = "checkbox";
        feature.value = value;
        feature.name = "features";
        var label = document.createElement("label");
        label.classList.add("text");
        label.classList.add("features");
        label.appendChild(feature);
        calcOption.appendChild(label);
        label.innerHTML += service.features[value].title;
      }
    }
  }
}

function checkServices(serviceValue) {
  var optionalPrice = 0;
  var features = document.getElementsByClassName("features");
  var options = document.getElementById("select");
  if (features.length !== 0) {
    for (var feature of features) {
      var featuresList = servicesInfo[serviceValue].features;
      var featureValue = feature.children[0].value;
      if (feature.children[0].checked) {
        optionalPrice += featuresList[featureValue].addPrice;
      }
    }
  } else if (options.length !== 0) {
    var optionsList = servicesInfo[serviceValue].options;
    var optionValue = options.value;
    if (optionValue != " ") {
      optionalPrice += optionsList[optionValue].addPrice;
    }
  }
  return optionalPrice;
}

function showTotalPrice(service, Stoim, cnt) {
  var serviceInfo = servicesInfo[service.value];
  var servicePrice = serviceInfo.mainPrice + Stoim;
  var totalPrice = servicePrice*cnt;
  var totalMessage = totalPrice + " Rub";
  document.getElementById("totalPrice").innerHTML = totalMessage;
}
