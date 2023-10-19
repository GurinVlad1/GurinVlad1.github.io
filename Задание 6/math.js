var window = window;
var document = document;

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
        changeForm(this);
        service = this;
        var optionAndFeatures = document.getElementById("optionAndFeatures");
        var addPrice = 0;
        optionAndFeatures.addEventListener("change", function () {
          addPrice = checkAddServices(service.value);
        })
        count.value = "";
        var cnt;
        count.addEventListener("input", function () {
          cnt = this.value;
        })
        document.addEventListener("change", function () {
          if (typeof(cnt) !== "undefined") {
            if (!count.value.match(/[^0-9]/) && !count.value.match(/^\s*$/)) {
              findTotalPrice(service, addPrice, cnt);
            } else {
              clearTotalPrice();
            }
          }
        })
      }
    });
  }
});

var servicesInfo = {
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
  fullWashandClin : {
    mainPrice : 30000
  }
}

function changeForm(radio) {
  var optionAndFeatures = document.getElementById("optionAndFeatures");
  optionAndFeatures.innerHTML = "";
  var service = servicesInfo[radio.value];
  if (Object.keys(service).length === 2) {
    if ("options" === Object.keys(service)[1]) {
      var optionsSelect = document.createElement("select");
      optionsSelect.classList.add("text");
      optionsSelect.name = "options";
      optionsSelect.id = "option_select";
      optionsSelect.style.marginLeft = "10px";
      var option = document.createElement("option");
      option.value = " ";
      option.innerHTML = "Список опций";
      optionsSelect.appendChild(option);
      for (var key in service.options) {
        var option = document.createElement("option");
        option.value = key;
        option.innerHTML = service.options[key].title;
        optionsSelect.appendChild(option);
      }
      var p = document.createElement("p");
      var label = document.createElement("label");
      label.classList.add("text");
      label.htmlFor = "option_select";
      label.innerHTML += "Выберите опцию к услуге";
      p.appendChild(label);
      p.appendChild(optionsSelect);
      optionAndFeatures.appendChild(p);
    } else if ("features" === Object.keys(service)[1]) {
      var fieldset = document.createElement("fieldset");
      var legend = document.createElement("legend");
      legend.classList.add("text");
      legend.innerHTML = "Выберите свойство/свойства услуги";
      fieldset.appendChild(legend);
      optionAndFeatures.appendChild(fieldset);
      for (var key in service.features) {
        var feature = document.createElement("input");
        feature.type = "checkbox";
        feature.value = key;
        feature.name = "features";
        feature.checked;
        var legend = document.createElement("legend");
        legend.classList.add("text");
        legend.classList.add("features");
        legend.appendChild(feature);
        fieldset.appendChild(legend);
        legend.innerHTML += service.features[key].title;
      }
    }
  }
}

function checkAddServices(serviceValue) {
  var optionalServicesPrice = 0;
  var features = document.getElementsByClassName("features");
  var options = document.getElementById("option_select");
  if (features.length !== 0) {
    for (var feature of features) {
      var featuresList = servicesInfo[serviceValue].features;
      var featureValue = feature.children[0].value;
      if (feature.children[0].checked) {
        optionalServicesPrice += featuresList[featureValue].addPrice;
      }
    }
  } else if (options.length !== 0) {
    var optionsList = servicesInfo[serviceValue].options;
    var optionValue = options.value;
    if (optionValue != " ") {
      optionalServicesPrice += optionsList[optionValue].addPrice;
    }
  }
  return optionalServicesPrice;
}

function findTotalPrice(service, addPrice, count) {
  var serviceInfo = servicesInfo[service.value];
  var servicePrice = serviceInfo.mainPrice + addPrice;
  var totalPrice = servicePrice*count;
  totalPrice = String(totalPrice).replace(/(\d)(?=(\d{3})+$)/mg, '$1 ');
  var totalMessage = totalPrice + " Rub";
  document.getElementsByClassName("final_price")[0].innerHTML = totalMessage;
}

function clearTotalPrice() {
  document.getElementsByClassName("final_price")[0].innerHTML = "";
}