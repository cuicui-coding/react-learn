function cc() {
  var a = 10;
  var b = 20;

  function add(num1, num2) {
    debugger
    var num1 = !!num1 ? num1 : a;
    var num2 = !!num2 ? num2 : a;

    return num1 + num2;
  }

  return add;
}

const a = 10;

const bb = cc(10, 20);
bb();