var birthday = document.querySelector("#birth-date")
var submit = document.querySelector("#submit")
var result = document.querySelector("#result")
//reverse dates
function reverseString(date) {
    var dateList = date.split("")
    var reverseDateList = dateList.reverse()
    var reverseDate = reverseDateList.join("")

    return reverseDate
}

// checks for palindrome
function checkPalindrome(date) {

    var reverseDate = reverseString(date);
    return reverseDate === date
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
        stringDate.month = "" + date.month
    }

    stringDate.year = "" + date.year

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
//Write a function that checks palindrome for all the date formats
function checkPalindromeForAllDateFormats(date) {
    var datesList = dateFormats(date);
    var palindromeCheckList = [];

    for (let i = 0; i < datesList.length; i++) {
        var palindromeCheck = checkPalindrome(datesList[i])
        palindromeCheckList.push(palindromeCheck)
    }

    return palindromeCheckList;
}

function isLeapYear(date) {
    if (date.year % 400 === 0) {
        return true
    }

    if (date.year % 100 === 0) {
        return false
    }

    if (date.year % 4 === 0)
        return true;
    return false;
}

function getNextDate(date) {

    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    const maxDatesinMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (isLeapYear)
        maxDatesinMonth[1] = 29;

    if (day > maxDatesinMonth[month - 1]) {
        day = 1;
        month++;
    }

    if (month > 12) {
        month = 1
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date) {
    var counter = 1;
    var nextDate = getNextDate(date)

    while (true) {
        counter++;
        var dateString = dateConversionToString(date);
        var checkPalindromeList = checkPalindromeForAllDateFormats(dateString)
        getNextDate(date);
        counter++;

        for (let i = 0; i < checkPalindromeList.length; i++) {
            if (checkPalindromeList[i]) {
                return [counter, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
}




var date = {

    day: 07,
    month: 7,
    year: 2022
}

var dateString = dateConversionToString(date)
console.log(checkPalindromeForAllDateFormats(dateString))
console.log(getNextDate(date))

submit.addEventListener("click", clickHandler)

function clickHandler() {

    var date = {
        day: Number(birthday.value.slice(8, 10)),
        month: Number(birthday.value.slice(5, 7)),
        year: Number(birthday.value.slice(0, 4))
    }
    console.log(date)
    console.log(birthday.value)

    var dateString = dateConversionToString(date)
    var list = checkPalindromeForAllDateFormats(dateString)

    var flag = false;
    for (let i = 0; i < list.length; i++) {
        if (list[i] === true) {
            flag = true;
            break;
        }
    }

    if (flag === true) {
        result.innerText = "YAYYYY .. your birthday is palindrome"
        console.log("YAYYYY .. your birthday is palindrome")
    } else {
        var [ctr, nextPalindromeDate] = getNextPalindromeDate(dateString)

        result.innerText = ` Not a Palindrome date. Next palindrome date comes in ${nextPalindromeDate.date} - ${nextPalindromeDate.month} - ${nextPalindromeDate.year} and you missed it by ${ctr} days1`

        console.log(nextPalindromeDate)

    }
}