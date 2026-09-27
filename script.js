/*
    GoogleSearchAdvanceCreator

    All search-building logic lives in this file.
*/


const operators = [

    {
        id: "exact",
        name: "Exact Phrase",
        code: "\"phrase\"",
        description: "Search for an exact phrase.",
        type: "text",
        placeholder: "Example: climate change"
    },

    {
        id: "or",
        name: "OR",
        code: "OR",
        description: "Search for either of two terms.",
        type: "two-text",
        placeholder1: "First term",
        placeholder2: "Second term"
    },

    {
        id: "exclude",
        name: "Exclude Word",
        code: "-word",
        description: "Exclude a word from results.",
        type: "text",
        placeholder: "Example: jobs"
    },

    {
        id: "site",
        name: "Site",
        code: "site:",
        description: "Search only within a specific website or domain.",
        type: "text",
        placeholder: "Example: wikipedia.org"
    },

    {
        id: "related",
        name: "Related Sites",
        code: "related:",
        description: "Find sites related to a domain.",
        type: "text",
        placeholder: "Example: example.com"
    },

    {
        id: "filetype",
        name: "File Type",
        code: "filetype:",
        description: "Search for a particular file type.",
        type: "text",
        placeholder: "Example: pdf"
    },

    {
        id: "intitle",
        name: "In Title",
        code: "intitle:",
        description: "Find a term in the page title.",
        type: "text",
        placeholder: "Example: report"
    },

    {
        id: "allintitle",
        name: "All In Title",
        code: "allintitle:",
        description: "Require all specified terms in the title.",
        type: "text",
        placeholder: "Example: annual financial report"
    },

    {
        id: "inurl",
        name: "In URL",
        code: "inurl:",
        description: "Find a term in the URL.",
        type: "text",
        placeholder: "Example: login"
    },

    {
        id: "allinurl",
        name: "All In URL",
        code: "allinurl:",
        description: "Require all specified terms in the URL.",
        type: "text",
        placeholder: "Example: blog technology"
    },

    {
        id: "intext",
        name: "In Text",
        code: "intext:",
        description: "Find a term in page text.",
        type: "text",
        placeholder: "Example: cybersecurity"
    },

    {
        id: "allintext",
        name: "All In Text",
        code: "allintext:",
        description: "Require all specified terms in page text.",
        type: "text",
        placeholder: "Example: privacy policy"
    },

    {
        id: "before",
        name: "Before Date",
        code: "before:",
        description: "Search before a specific date.",
        type: "date"
    },

    {
        id: "after",
        name: "After Date",
        code: "after:",
        description: "Search after a specific date.",
        type: "date"
    },

    {
        id: "cache",
        name: "Cache",
        code: "cache:",
        description: "Search for cached pages where supported.",
        type: "text",
        placeholder: "Example: example.com"
    },

    {
        id: "source",
        name: "Source",
        code: "source:",
        description: "Restrict news results to a source where supported.",
        type: "text",
        placeholder: "Example: bbc.com"
    },

    {
        id: "location",
        name: "Location",
        code: "location:",
        description: "Search by location where supported.",
        type: "text",
        placeholder: "Example: Toronto"
    },

    {
        id: "stocks",
        name: "Stocks",
        code: "stocks:",
        description: "Search for stock information.",
        type: "text",
        placeholder: "Example: AAPL"
    },

    {
        id: "movie",
        name: "Movie",
        code: "movie:",
        description: "Search for movie information.",
        type: "text",
        placeholder: "Example: Inception"
    },

    {
        id: "define",
        name: "Define",
        code: "define:",
        description: "Search for a definition.",
        type: "text",
        placeholder: "Example: serendipity"
    },

    {
        id: "weather",
        name: "Weather",
        code: "weather:",
        description: "Search weather information.",
        type: "text",
        placeholder: "Example: Toronto"
    },

    {
        id: "numberrange",
        name: "Number Range",
        code: "number..number",
        description: "Search within a numerical range.",
        type: "range"
    },

    {
        id: "language",
        name: "Language",
        code: "lang:",
        description: "Request results in a specific language.",
        type: "select-language"
    }

];



/*
    CREATE OPERATOR UI
*/

function createOperators() {

    const container =
        document.getElementById("operators");


    operators.forEach(operator => {

        const element =
            document.createElement("div");


        element.className =
            "operator";


        element.innerHTML = `

            <div class="operator-header">

                <div class="operator-info">

                    <div class="operator-name">
                        ${operator.name}
                    </div>

                    <div class="operator-code">
                        ${operator.code}
                    </div>

                    <div class="operator-description">
                        ${operator.description}
                    </div>

                </div>


                <label class="switch">

                    <input
                        type="checkbox"
                        id="toggle-${operator.id}"
                    >

                    <span class="slider"></span>

                </label>

            </div>


            <div
                class="operator-fields"
                id="fields-${operator.id}"
            >

                ${createFields(operator)}

            </div>

        `;


        container.appendChild(element);


        /*
            Add toggle listener
        */

        document
            .getElementById(`toggle-${operator.id}`)
            .addEventListener(
                "change",
                () => toggleOperator(operator.id)
            );

    });

}



/*
    CREATE FIELDS
*/

function createFields(operator) {


    if (operator.type === "text") {

        return `

            <label class="field-label">
                Value
            </label>

            <input
                type="text"
                id="value-${operator.id}"
                placeholder="${operator.placeholder}"
            >

        `;

    }



    if (operator.type === "two-text") {

        return `

            <label class="field-label">
                First value
            </label>

            <input
                type="text"
                id="value-${operator.id}-1"
                placeholder="${operator.placeholder1}"
            >


            <label class="field-label">
                Second value
            </label>

            <input
                type="text"
                id="value-${operator.id}-2"
                placeholder="${operator.placeholder2}"
            >

        `;

    }



    if (operator.type === "date") {

        return `

            <label class="field-label">
                Date
            </label>

            <div class="date-grid">

                <input
                    type="number"
                    id="value-${operator.id}-year"
                    placeholder="Year"
                    min="1900"
                    max="2100"
                >

                <input
                    type="number"
                    id="value-${operator.id}-month"
                    placeholder="Month"
                    min="1"
                    max="12"
                >

                <input
                    type="number"
                    id="value-${operator.id}-day"
                    placeholder="Day"
                    min="1"
                    max="31"
                >

            </div>

            <div class="help">
                Enter the date normally. It will automatically become YYYY-MM-DD.
            </div>

        `;

    }



    if (operator.type === "range") {

        return `

            <label class="field-label">
                Minimum
            </label>

            <input
                type="number"
                id="value-${operator.id}-min"
                placeholder="Example: 100"
            >


            <label class="field-label">
                Maximum
            </label>

            <input
                type="number"
                id="value-${operator.id}-max"
                placeholder="Example: 500"
            >

        `;

    }



    if (operator.type === "select-language") {

        return `

            <label class="field-label">
                Language
            </label>

            <select id="value-${operator.id}">

                <option value="">
                    Select language
                </option>

                <option value="en">
                    English
                </option>

                <option value="fr">
                    French
                </option>

                <option value="es">
                    Spanish
                </option>

                <option value="de">
                    German
                </option>

                <option value="it">
                    Italian
                </option>

                <option value="pt">
                    Portuguese
                </option>

                <option value="ja">
                    Japanese
                </option>

                <option value="ko">
                    Korean
                </option>

                <option value="zh-CN">
                    Chinese
                </option>

                <option value="ru">
                    Russian
                </option>

                <option value="ar">
                    Arabic
                </option>

                <option value="hi">
                    Hindi
                </option>

            </select>

        `;

    }


    return "";

}



/*
    SHOW / HIDE OPERATOR FIELDS
*/

function toggleOperator(id) {

    const toggle =
        document.getElementById(`toggle-${id}`);


    const fields =
        document.getElementById(`fields-${id}`);


    fields.classList.toggle(
        "active",
        toggle.checked
    );

}



/*
    GENERATE SEARCH
*/

function generateSearch() {

    const parts = [];


    /*
        Main keywords
    */

    const keywords =
        document
            .getElementById("keywords")
            .value
            .trim();


    if (keywords) {

        parts.push(keywords);

    }



    /*
        Operators
    */

    operators.forEach(operator => {

        const enabled =
            document
                .getElementById(`toggle-${operator.id}`)
                .checked;


        if (!enabled) {
            return;
        }



        /*
            Normal text operator
        */

        if (operator.type === "text") {

            const value =
                document
                    .getElementById(`value-${operator.id}`)
                    .value
                    .trim();


            if (!value) {
                return;
            }


            if (operator.id === "exact") {

                parts.push(
                    `"${value}"`
                );

            }

            else if (operator.id === "exclude") {

                parts.push(
                    `-${value}`
                );

            }

            else {

                parts.push(
                    `${operator.code}${value}`
                );

            }

        }



        /*
            OR
        */

        if (operator.type === "two-text") {

            const value1 =
                document
                    .getElementById(
                        `value-${operator.id}-1`
                    )
                    .value
                    .trim();


            const value2 =
                document
                    .getElementById(
                        `value-${operator.id}-2`
                    )
                    .value
                    .trim();


            if (!value1 || !value2) {
                return;
            }


            parts.push(
                `${value1} OR ${value2}`
            );

        }



        /*
            DATE
        */

        if (operator.type === "date") {

            const year =
                document
                    .getElementById(
                        `value-${operator.id}-year`
                    )
                    .value;


            const month =
                document
                    .getElementById(
                        `value-${operator.id}-month`
                    )
                    .value;


            const day =
                document
                    .getElementById(
                        `value-${operator.id}-day`
                    )
                    .value;


            if (!year || !month || !day) {
                return;
            }


            const formattedDate =
                `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


            parts.push(
                `${operator.code}${formattedDate}`
            );

        }



        /*
            NUMBER RANGE
        */

        if (operator.type === "range") {

            const min =
                document
                    .getElementById(
                        `value-${operator.id}-min`
                    )
                    .value;


            const max =
                document
                    .getElementById(
                        `value-${operator.id}-max`
                    )
                    .value;


            if (!min || !max) {
                return;
            }


            parts.push(
                `${min}..${max}`
            );

        }



        /*
            LANGUAGE
        */

        if (operator.type === "select-language") {

            const language =
                document
                    .getElementById(
                        `value-${operator.id}`
                    )
                    .value;


            if (!language) {
                return;
            }


            parts.push(
                `${operator.code}${language}`
            );

        }

    });



    const search =
        parts.join(" ");


    const result =
        document.getElementById("result");


    const status =
        document.getElementById("status");



    if (!search) {

        result.innerHTML = `
            <span class="placeholder">
                Add keywords or enable an operator with a value.
            </span>
        `;

        status.textContent = "";

        return;

    }



    result.textContent = search;

    status.textContent =
        "Search generated successfully.";

}



/*
    COPY SEARCH
*/

async function copySearch() {

    const result =
        document
            .getElementById("result")
            .textContent
            .trim();


    if (
        !result ||
        result.includes("Your generated search") ||
        result.includes("Add keywords")
    ) {

        setStatus(
            "Generate a search first."
        );

        return;

    }


    try {

        await navigator.clipboard.writeText(result);

        setStatus(
            "Copied to clipboard!"
        );

    }

    catch (error) {

        setStatus(
            "Could not copy automatically."
        );

    }

}



/*
    OPEN GOOGLE
*/

function openGoogle() {

    const result =
        document
            .getElementById("result")
            .textContent
            .trim();


    if (
        !result ||
        result.includes("Your generated search") ||
        result.includes("Add keywords")
    ) {

        setStatus(
            "Generate a search first."
        );

        return;

    }


    const googleURL =
        "https://www.google.com/search?q=" +
        encodeURIComponent(result);


    window.open(
        googleURL,
        "_blank"
    );

}



/*
    STATUS
*/

function setStatus(message) {

    document
        .getElementById("status")
        .textContent = message;

}



/*
    CLEAR EVERYTHING
*/

function clearAll() {

    document
        .getElementById("keywords")
        .value = "";


    operators.forEach(operator => {

        const toggle =
            document.getElementById(
                `toggle-${operator.id}`
            );


        toggle.checked = false;


        document
            .getElementById(
                `fields-${operator.id}`
            )
            .classList.remove("active");


        const fields =
            document.querySelectorAll(
                `#fields-${operator.id} input,
                 #fields-${operator.id} select`
            );


        fields.forEach(field => {

            field.value = "";

        });

    });


    document
        .getElementById("result")
        .innerHTML = `
            <span class="placeholder">
                Your generated search will appear here...
            </span>
        `;


    setStatus("");

}



/*
    ENABLE OPERATOR
*/

function enableOperator(
    id,
    value = ""
) {

    const toggle =
        document.getElementById(
            `toggle-${id}`
        );


    toggle.checked = true;


    document
        .getElementById(
            `fields-${id}`
        )
        .classList.add("active");


    const input =
        document.getElementById(
            `value-${id}`
        );


    if (input) {

        input.value = value;

    }

}



/*
    ENABLE DATE
*/

function enableDate(
    id,
    year,
    month,
    day
) {

    document
        .getElementById(
            `toggle-${id}`
        )
        .checked = true;


    document
        .getElementById(
            `fields-${id}`
        )
        .classList.add("active");


    document
        .getElementById(
            `value-${id}-year`
        )
        .value = year;


    document
        .getElementById(
            `value-${id}-month`
        )
        .value = month;


    document
        .getElementById(
            `value-${id}-day`
        )
        .value = day;

}



/*
    EXAMPLE SEARCH
*/

function loadExample() {

    clearAll();


    document
        .getElementById("keywords")
        .value =
        "artificial intelligence healthcare";


    enableOperator(
        "exact",
        "machine learning"
    );


    enableOperator(
        "site",
        "nih.gov"
    );


    enableOperator(
        "filetype",
        "pdf"
    );


    enableDate(
        "after",
        2024,
        1,
        1
    );


    enableDate(
        "before",
        2026,
        1,
        1
    );


    generateSearch();

}



/*
    COMMON OPERATORS
*/

function enableCommon() {

    clearAll();


    const common = [
        "site",
        "filetype",
        "intitle",
        "exclude",
        "after"
    ];


    common.forEach(id => {

        document
            .getElementById(
                `toggle-${id}`
            )
            .checked = true;


        document
            .getElementById(
                `fields-${id}`
            )
            .classList.add("active");

    });


    document
        .getElementById("keywords")
        .focus();

}



/*
    BUTTON EVENTS
*/

document
    .getElementById("generateBtn")
    .addEventListener(
        "click",
        generateSearch
    );


document
    .getElementById("clearBtn")
    .addEventListener(
        "click",
        clearAll
    );


document
    .getElementById("copyBtn")
    .addEventListener(
        "click",
        copySearch
    );


document
    .getElementById("googleBtn")
    .addEventListener(
        "click",
        openGoogle
    );


document
    .getElementById("exampleBtn")
    .addEventListener(
        "click",
        loadExample
    );


document
    .getElementById("commonBtn")
    .addEventListener(
        "click",
        enableCommon
    );



/*
    INITIALIZE APP
*/

createOperators();
