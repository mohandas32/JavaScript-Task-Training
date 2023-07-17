let table = document.getElementById('table')
let reportTable = document.getElementById('reportTable')
let percentageTable=document.getElementById("percentageTable")

//arrays to store the name,subject and marks array
var nameArray = []
var subjectArray = []
var marksArray = []
reportTable.style.emptyCells = "hide";
let srCounter = 6

let form = document.getElementById('form')

//handling the form submit event
form.addEventListener("submit", e => {
    e.preventDefault()
    getAllData()
})

function onClickAccept(thatBtn){
    thatBtn.style.background="green"
    thatBtn.style.color="white"
    //when click on accept button, the nextsibling i.e., reject button style none
    thatBtn.nextElementSibling.style='none'
    
}

function onClickReject(thatBtn){
    thatBtn.style.color="white"
    thatBtn.style.background="red"
    //when click on reject button, the nextsibling i.e., accept button style none
    addBtn=thatBtn.previousElementSibling.style='none'
}

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
    newCell2.innerHTML = `<input type="text"  class="form-control stu_name" pattern="[A-Za-z ]{3,}" title="Only alphabets allowed" placeholder="Enter Name" required>`
    newCell3.innerHTML = `<input type="text"  class="form-control subject" pattern="[A-Za-z ]{3,}" title="Only alphabets allowed" placeholder="Enter Subject" required>`
    newCell4.innerHTML = `<input type="number"  class="form-control marks" min="0" max="100" placeholder="Enter Marks" required>`
    newCell5.innerHTML = ` <div>
                            <button type="button" class="pass btn btn-outline-success" onclick="onClickAccept(this)">ACCEPT</button>
                            <button type="button" class="fail btn btn-outline-danger" onclick="onClickReject(this)">REJECT</button>
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
   

    let name = document.querySelectorAll(".stu_name")
    let subject = document.querySelectorAll(".subject")
    let marks = document.querySelectorAll(".marks")


    //getting all the values of the row
    for (i = 0; i < name.length; i++) {
        nameArray.push(((name[i].value).trim()).toUpperCase())
        subjectArray.push(((subject[i].value).trim()).toUpperCase())
        marksArray.push(marks[i].value)

    }

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
    
    //calling function to print the percentage table
    getPercentage();
    nameArray.length=0
    subjectArray.length=0
    marksArray.length=0
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

//function that print the new table withe percentage of student
function getPercentage(){
    percentageTable.innerHTML=`<tr class="reportThead">
                                <th>SR NO.</th>
                                <th>NAME</th>
                                <th>PERCENTAGE</th>
                               </tr>`
    let sum=0
    let percentage=[]
    let newMarksArray=[]

    //finding the duplicates values from the nameArray
    let duplicateName = nameArray.filter((value, index) =>{
        return nameArray.lastIndexOf(value)== index && nameArray.indexOf(value)!= index;
    })

    //stores the values that are not duplicate
    let nonduplicate =nameArray.filter( (v,i) =>{
        return nameArray.indexOf(v) ==i && nameArray.lastIndexOf(v)==i
    })
    

    //get all the student name and marks that are not duplicate
    for(i in nonduplicate){
        for(j in nameArray){
            if(nonduplicate[i]===nameArray[j]){
                newMarksArray.push(marksArray[j]) //store the marks in newMarksArray
            }
        }
    }
 
    countTimes=0
    for(let i in duplicateName){    //iterate over each item of the duplicateName
     //iterate over each item of the nameArray
        for(let j in nameArray){    
            if(duplicateName[i] === nameArray[j]){    //checking if duplicateName is in the nameArray then return the index
                countTimes++
                sum += Number.parseInt(marksArray[j])
            }
        }
        percentage.push(sum/countTimes) //finding percentage of student whoes name occur more than 1 time
        sum=0
        countTimes=0
    }

    //printing the data i table of student whoes name not occur than 1 time
    let row_length=percentageTable.rows.length
    for(k=row_length; k<nonduplicate.length+row_length;k++){
        let row = percentageTable.insertRow(k-row_length+1)                                                                                                                      
        row.insertCell(0).className = "count"
        row.insertCell(1).innerHTML = nonduplicate[k-row_length]
        let per = Number.parseFloat(newMarksArray[k-row_length]).toFixed(2)
        let perCell= row.insertCell(2)
        perCell.innerHTML=per+"%"
         //if percentage is less than 33 then change the background color to red
        if(per <33){
        perCell.parentNode.style.background="#F08080"
        }
    }

    //printing the data in table of student whoes name occur more than 1 time
    let row_length_2=percentageTable.rows.length
    for(i=row_length_2;i<duplicateName.length+row_length_2;i++){
        let row = percentageTable.insertRow(i-row_length_2+1)  
        row.insertCell(0).className = "count"
        row.insertCell(1).innerHTML = duplicateName[i-row_length_2]
        // row.insertCell(2).innerHTML=Number.parseFloat(percentage[i-row_length_2]).toFixed(2)+"%"
        let per = Number.parseFloat(percentage[i-row_length_2]).toFixed(2)
        let perCell= row.insertCell(2)
        perCell.innerHTML=per+"%"

        //if percentage is less than 33 then change the background color to red
        if(per <33){
        perCell.parentNode.style.background="#F08080"
    
        }
    }
}
