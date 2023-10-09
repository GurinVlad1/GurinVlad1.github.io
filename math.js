function click1() {
    let f1 = document.getElementsByName("field1");
    let r = Number(document.getElementById("result"));
    r.innerHTML = f1[0].value;
    let s = document.getElementsByName("select1");
    console.log(s[0].value);
    let price;
    switch(s[0].value)
    {
        case "BMW":
            price = 100000;
            break;
        case "Lada":
            price = 0.5;
            break;
        case "Mazda":
            price = 1236236;
            break;
    }
    r.innerHTML = f1[0].value;
    return false;
  }
  function onClick(event) {
    event.preventDefault();
    alert("click");
  }
  window.addEventListener('DOMContentLoaded', function (event) {
    console.log("DOM fully loaded and parsed");
    let b = document.getElementById("button1");
    b.addEventListener("click", onClick);
  });
  let str = '123';
let m = str.match(/^\d+$/);
console.log(m);
if (m !== null)
  console.log("Подходит!")