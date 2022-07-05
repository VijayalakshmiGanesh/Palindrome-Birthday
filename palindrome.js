//reverse dates
function reverseString(date) {
    var dateList = date.split("")
    var reverseDateList = dateList.reverse()
    var reverseDate = reverseDateList.join("")

    return reverseDate
}

// checks for palindrome
function checkPalindromeForAllDateFormats(date) {

    var datesList = dateConversionToString(date)
    var reverseDate = reverseString(date);

    flag = false;
    for (let i = 0; i < datesList.length; i++) {

    }

    //     if (date === reverseDate) {
    //         return true;
    //     } else {
    //         return false;
    //     }
}

//converts the date from number to string
function dateConversionToString(date) {
    var stringDate = {
        day: '',
        month: '',
        year: ''
    }

    // Take care of '0' when day/month is less than 10
    if (date.day < 10) {
        stringDate.day = '0' + date.day
    } else {
        stringDate.day = date.day.toString()
    }

    if (date.month < 10) {
        stringDate.month = '0' + date.month
    } else {
        stringDate.month = date.month.toString()
    }

    stringDate.year = date.year.toString()

    return stringDate
}

// returns an array of strings for these date formats
function dateFormats(date) {
    var ddMMyyyy = date.day + date.month + date.year;
    var mmDDyyyy = date.month + date.day + date.year;
    var yyyyMMdd = date.year + date.month + date.day;
    var ddMMyy = date.day + date.month + date.year.slice(-2);
    var mmDDyy = date.month + date.day + date.year.slice(-2);
    var yyMMdd = date.year.slice(-2) + date.month + date.day;

    var formats = [
        ddMMyyyy, mmDDyyyy, yyyyMMdd, ddMMyy, mmDDyy, yyMMdd
    ]

    return formats
}

var date = {
    day: 1,
    month: 5,
    year: 2020
}

var dateString = dateConversionToString(date)
console.log(dateFormats(dateString))