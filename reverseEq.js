// Add any extra import statements you may need here


// Add any helper functions you may need here
function join(arr) {
    return arr.reduce((s, it) => s + it, '');
  }

  function areTheyEqual(array_a, array_b){
    // console.log(array_a, array_b);

    // base case:
    if (join(array_a) === join(array_b)) {
      return true;
    }

    let pre = 0, post = array_a.length - 1;

    for (; pre < array_a.length; pre += 1) {
      if (array_a[pre] !== array_b[pre]) {
        break;
      }
    }

    for (; post >= 0; post -= 1) {
      if (array_a[post] !== array_b[post]) {
        break;
      }
    }

    if (pre === 0 && post === array_a.length - 1) {
      return false;
    }

    // console.log('>', array_a, array_b, pre, post);
    return areTheyEqual(
        array_a.slice(pre, post + 1),
        array_b.slice(pre, post + 1).reverse()
    );
  }





// These are the tests we use to determine if the solution is correct.
// You can add your own at the bottom, but they are otherwise not editable!
function printString(str) {
    var out = '["' + str + '"]';
    return out;
  }

  var test_case_number = 1;

  function check(expected, output) {
    var result = (expected == output);
    var rightTick = "\u2713";
      var wrongTick = "\u2717";
    if (result) {
        var out = rightTick + ' Test #' + test_case_number;
        console.log(out);
    }
    else {
        var out = '';
        out += wrongTick + ' Test #' + test_case_number + ': Expected ';
        out += printString(expected);
        out += ' Your output: ';
        out += printString(output);
        console.log(out);
    }
    test_case_number++;
  }

  var array_a_1 = [1, 2, 3, 4];
  var array_b_1 = [1, 4, 3, 2];
  var expected_1 = true;
  var output_1 = areTheyEqual(array_a_1, array_b_1);
  check(expected_1, output_1);

//   var array_a_2 = [1, 2, 3, 4];
//   var array_b_2 = [1, 4, 3, 3];
//   var expected_2 = false;
//   var output_2 = areTheyEqual(array_a_2, array_b_2);
//   check(expected_2, output_2);

//   // Add your own test cases here


//   var array_a_2 = [1, 2, 3, 5, 3];
//   var array_b_2 = [1, 5, 2, 3, 3];
//   var expected_2 = true;
//   var output_2 = areTheyEqual(array_a_2, array_b_2);
//   check(expected_2, output_2);


//   var array_a_2 = [2];
//   var array_b_2 = [4];
//   var expected_2 = false;
//   var output_2 = areTheyEqual(array_a_2, array_b_2);
//   check(expected_2, output_2);
