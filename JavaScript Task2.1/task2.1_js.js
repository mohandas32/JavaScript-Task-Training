let table = document.getElementById('table')
let reportTable = document.getElementById('reportTable')
reportTable.style.emptyCells = "hide";
let srCounter = 6

let form = document.getElementById('form')

//handling the form submit event
form.addEventListener("submit", e => {
    e.preventDefault()
    getAllData()
})

///function for add the row
function addRowContent() {
    let newRow = table.insertRow(srCounter)

    let newCell1 = newRow.insertCell(0)
    let newCell2 = newRow.insertCell(1)
    let newCell3 = newRow.insertCell(2)
    let newCell4 = newRow.insertCell(3)
    let newCell5 = newRow.insertCell(4)
    let newCell6 = newRow.insertCell(5)

    newCell1.className = "count"
    newCell2.innerHTML = `<input type="text"  class="form-control stu_name" pattern="[A-Za-z ]{3,15}" title="Only alphabets allowed" placeholder="Enter Name" required>`
    newCell3.innerHTML = `<input type="text"  class="form-control subject" pattern="[A-Za-z ]{3,20}" title="Only alphabets allowed" placeholder="Enter Subject" required>`
    newCell4.innerHTML = `<input type="number"  class="form-control marks" min="0" max="100" placeholder="Enter Marks" required>`
    newCell5.innerHTML = ` <div>
                            <button class="pass btn btn-outline-success">PASS</button>
                            <button class="fail btn btn-outline-danger">FAIL</button>
                         </div>`
    newCell6.innerHTML = `<button type="button" class="fail btn btn-outline-danger" onclick="removeRowContent(this)">Remove </button>`
    srCounter++
}

//function for remove the row 
function removeRowContent(row) {
    let confirmDel = confirm(`Are you sure to delete the row ?`)
    if(confirmDel == true){
        row.parentNode.parentNode.remove()
        srCounter--
        
        document.getElementById('alertMsg').innerHTML="ROW DELETED SUCCESFULLY"
        document.getElementById('alertMsg').style.visibility='visible'

        setTimeout(()=>{
            document.getElementById('alertMsg').style.visibility='hidden'
        },3000)
    }
}

//function to get the data in table
function getAllData() {
    reportTable.innerHTML = `<tr class="reportThead">
                            <th>SR NO.</th>
                            <th>NAME</th>
                            <th>SUBJECT</th>
                            <th>MARKS</th>
                          </tr>`
    //arrays to store the name,subject and marks array
    var nameArray = []
    var subjectArray = []
    var marksArray = []

    let name = document.querySelectorAll(".stu_name")
    let subject = document.querySelectorAll(".subject")
    let marks = document.querySelectorAll(".marks")

    //getting all the values of the row
    for (i = 0; i < name.length; i++) {
        nameArray.push(name[i].value)
        subjectArray.push(subject[i].value)
        marksArray.push(marks[i].value)

    }
    console.log(nameArray)

    for (i = 1; i < table.rows.length; i++) {

        let row = reportTable.insertRow(i)

        row.insertCell(0).className = "count"
        row.insertCell(1).innerHTML = nameArray[i - 1]
        row.insertCell(2).innerHTML = subjectArray[i - 1]
        let newCell4 = row.insertCell(3)

        //color the row in which the marks of the student is less than 33
        if (Number.parseInt(marksArray[i - 1]) < 33) {
            newCell4.innerHTML = marksArray[i - 1]
            newCell4.parentNode.style.background = "#F08080"
            newCell4.parentNode.style.fontWeight = "bold"
            newCell4.parentNode.style.textDecoration = "underline"
        }
        else {
            newCell4.innerHTML = marksArray[i - 1]
        }
    }
    document.getElementById("reportArea").style.visibility = 'visible'
}
function searchData() {
    let searchText = document.getElementById('searchText').value.toLowerCase()
    let resultTable = document.getElementById('reportTable')

    let tableRow = resultTable.getElementsByTagName('tr')
    //loop through each row and get the values of names and subject
    for (let i = 1; i < tableRow.length; i++) {

        let tdName = tableRow[i].getElementsByTagName('td')[1];
        let tdSubject = tableRow[i].getElementsByTagName('td')[2]
        
        if (tdName || tdSubject) {
            let subjectValue = tdSubject.innerHTML || tdSubject.textContent
            let nameValue = tdName.innerHTML || tdName.textContent
            
            //if the searchText name or subject startswith the entered text then display that row
            if (nameValue.toLowerCase().startsWith(searchText) || subjectValue.toLowerCase().startsWith(searchText) ) {
                tableRow[i].style.display = ""
            }
            else {
                tableRow[i].style.display = 'none'
            }
        }
    }
}
//function for performing sorting,specify the column number 1- for name and 2- for subject
function sortContent(col) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("reportTable");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[col];
            y = rows[i + 1].getElementsByTagName("TD")[col];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

//function for sorting the marks
function sortMarks() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("reportTable");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[3];
            y = rows[i + 1].getElementsByTagName("TD")[3];

            if (Number.parseInt(x.innerHTML) > Number.parseInt(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
