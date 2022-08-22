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
        stringDate.day = "" + date.day
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
        return true
    }

    if (date.year % 4 == 0)
        return true;
    return false;
}

function getNextDate(date) {

    const maxDatesinMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    date.day = Number(date.day) + 1

    if (isLeapYear)
        maxDatesinMonth[1] = 29;

    if (date.day > maxDatesinMonth[date.month - 1]) {
        date.day = '1'
        date.month = Number(date.month) + 1
    }

    if (date.month > 12) {
        date.month = '1'
        date.year = Number(date.year) + 1
    }
    return date
}

function getNextPalindromeDate(date) {
    var counter = 0;
    var nextDate = getNextDate(date)

    while (true) {
        counter++;
        var dateString = dateConversionToString(nextDate);
        var checkPalindromeList = checkPalindromeForAllDateFormats(dateString)

        for (let i = 0; i < checkPalindromeList.length; i++) {
            if (checkPalindromeList[i]) {
                return [counter, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
}




// var date = {
//     day: 31,
//     month: 12,
//     year: 2020
// }

// var dateString = dateConversionToString(date)
// console.log(checkPalindromeForAllDateFormats(dateString))
// console.log(getNextPalindromeDate(date))
submit.addEventListener("click", clickHandler)

function clickHandler() {

    if (birthday.value == 0) {
        alert("Enter all neccessary values")
        return
    }
    var date = {
        day: Number(birthday.value.slice(8, 10)),
        month: Number(birthday.value.slice(5, 7)),
        year: Number(birthday.value.slice(0, 4))
    }
    // console.log(date)
    // console.log(birthday.value)

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
        result.innerText = "YAYYYY 😀 your birthday is palindrome"
        // console.log("YAYYYY 😀 your birthday is palindrome")
    } else {
        var [ctr, nextPalindromeDate] = getNextPalindromeDate(dateString)

        result.innerText = ` Not a Palindrome date 😔 Next palindrome date comes in ${nextPalindromeDate.day}-${nextPalindromeDate.month}-${nextPalindromeDate.year} and you missed it by ${ctr} days`

        // console.log(nextPalindromeDate)

    }
}