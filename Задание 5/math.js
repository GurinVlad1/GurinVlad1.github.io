function func() {
    var result;
    var num1 = Number(document.getElementById("num1").value);
    let s = document.getElementsByName("select1");
    console.log(s[0].value);
    let price;
    switch(s[0].value)
    {
        case "BMW":
            price = 10000000;
            break;
        case "Lada":
            price = 1235313;
            break;
        case "Mazda":
            price = 1236236;
            break;
    }
    if (isNaN(num1)) {
        document.getElementById("result").innerHTML = 'Введены недопустимые символы.';
        return;
    }
    result = num1 * price
    document.getElementById("result").innerHTML = result;
}