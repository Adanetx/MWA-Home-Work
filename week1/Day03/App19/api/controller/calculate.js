const calculate = function(req, res) {
    let number1 = 3;

    if (req.query && req.query.number1) {

        number1 = parseInt(req.query.number1, 10);

        console.log("the query number1 is " + number1)
    }
    let number2 = req.params.Id;
    console.log("the params id  is" + number2);

    let result = number1 * number2;
    console.log("the multiplication result of the two numbers is " + result);
    res.status(200).json(result)
}
module.exports = {
    calculate: calculate
}