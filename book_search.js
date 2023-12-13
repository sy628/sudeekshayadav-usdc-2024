// USDC 2024 - Sudeeksha Yadav

/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = { // moved this definition higher
        "SearchTerm": searchTerm,
        "Results": []
    };
    
    if (scannedTextObj.length == 0) { // first, check if the text object is empty
        return result; // if empty, return the search term and empty results object
    }

    // create a temp book object that we can modify with a matching search to add to results

    // if not empty, we know it has "Content" but that list might be empty
    for (var bookIndex = 0; bookIndex < scannedTextObj.length; bookIndex++) {
        var currentBookObject = scannedTextObj[bookIndex];
        
        if (currentBookObject["Content"].length > 0) { // if there is scanned content for this book
            for (var contentIndex = 0; contentIndex < currentBookObject["Content"].length; contentIndex++) {
                var currentContentObject = currentBookObject["Content"][contentIndex];

                if (currentContentObject["Text"].includes(searchTerm)) {
                    var tempBookSearchResult = {
                        "ISBN": currentBookObject.ISBN,
                        "Page": currentContentObject.Page,
                        "Line": currentContentObject.Line
                    };
                    result.Results.push(tempBookSearchResult);
                }
            }
        }
    }
    return result;
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) == JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

// UNIT TESTS

const testInput = [
    {
        "Title": "The Great Gatsby",
        "ISBN": "9780743273565",
        "Content": [
            {
                "Page": 3,
                "Line": 1,
                "Text": "My family have been prominent, well-to-do people in this"
            },
            {
                "Page": 4,
                "Line": 4,
                "Text": "It was lonely for a day or so until one morning some"
            },
            {
                "Page": 6,
                "Line": 2,
                "Text": "had been one of the most powerful ends that ever played"
            } 
        ] 
    }
]

const expectedResultPositiveTest1 = {
    "SearchTerm": "one",
    "Results": [
        {
            "ISBN": "9780743273565",
            "Page": 4,
            "Line": 4
        },
        {
            "ISBN": "9780743273565",
            "Page": 6,
            "Line": 2
        }
    ]
}

// POSITIVE TESTS

// test by comparing exact results for ISBN, page, line
const positiveTestResult1 = findSearchTermInBooks("one", testInput); 
if (JSON.stringify(positiveTestResult1.Results) == JSON.stringify(expectedResultPositiveTest1.Results)) {
    console.log("PASS: Positive Test 1");
} else {
    console.log("FAIL: Positive Test 1");
    console.log("Expected:", JSON.stringify(expectedResultPositiveTest1.Results));
    console.log("Received:", JSON.stringify(positiveTestResult1.Results));
}

// test by reverse searching for that word in each given page/line combination
// would make this more robust by using a for loop so that it works for mutliple matches
// I would assign a match number for multiple searches within the same ISBN, or use a bookID as a universal key for the different contents
// struggling to find the matching text to search without a ISBN or primary key?
const positiveTestResult2 = findSearchTermInBooks("family", testInput); 
if (testInput[0]["Content"][0]["Text"].includes("family")) {
    console.log("PASS: Positive Test 2");
}
else {
    console.log("FAIL: Positive Test 1");
    console.log("Expected:", true);
    console.log("Received:", false);
}

// NEGATIVE TESTS

// test for something that does not have matches by checking that there are 0 matches
// check by counting number of matches
const negativeTestResult1 = findSearchTermInBooks("happy", testInput);
if (negativeTestResult1.Results.length == 0) { // there should be 0 matches
    console.log("PASS: Negative Test 1");
} else {
    console.log("FAIL: Negative Test 1");
    console.log("Expected:", JSON.stringify(expectedResult.Results));
    console.log("Received:", JSON.stringify(negativeTestResult1.Results));
}

// an empty output
const emptyResultNegativeTest2 = {
    "SearchTerm": "happy",
    "Results": []
}

// check by comparing Results to an empty output
const negativeTestResult2 = findSearchTermInBooks("bird", testInput);
if (JSON.stringify(negativeTestResult2.Results) == JSON.stringify(emptyResultNegativeTest2.Results)) {
    console.log("PASS: Negative Test 2");
}
else {
    console.log("FAIL: Negative Test 2");
    console.log("Expected:", JSON.stringify(emptyResultNegativeTest2.Results));
    console.log("Received:", JSON.stringify(negativeTestResult2.Results));
}

// CASE TESTS

// test for something that does not have matches
// "family" should return a match, but not "Family"
const caseTestResult_family = findSearchTermInBooks("family", testInput);
const caseTestResult_Family = findSearchTermInBooks("Family", testInput);

if (caseTestResult_family.Results.length == 1 && caseTestResult_Family.Results.length == 0) { // there should be 1 match for "family" and 0 for "Family"
    console.log("PASS: Case Test 1");
} else {
    console.log("FAIL: Case Test 1");
    console.log("Expected:", true);
    console.log("Received:", false);
}

if (caseTestResult_family.Results.length != caseTestResult_Family.Results.length) { // there should be differing counts for "family" and "Family"
    console.log("PASS: Case Test 2");
} else {
    console.log("FAIL: Case Test 2");
    console.log("Expected:", true);
    console.log("Received:", false);
}

// extension -- what if there are two matches on the same page or on the same line? these objects should be combined into a list
// case matching
