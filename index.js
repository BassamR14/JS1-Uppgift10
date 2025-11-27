let studentName = document.querySelector("#student-name");
let studentCity = document.querySelector("select#city");
let addStudentBtn = document.querySelector("#student-add");
let studentList = document.querySelector(".student-list");
let editSection = document.querySelector("#edit-section");
let studentInfo = [];

function render() {
  studentList.innerHTML = "";

  studentInfo.forEach((student, index) => {
    let li = document.createElement("li");
    li.innerText = `Namn: ${student.name} - Utbildning: ${student.program} - Stad: ${student.city} - År: ${student.year} `;
    studentList.append(li);

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    li.append(deleteButton);

    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    li.append(editBtn);

    function deleteItem() {
      //either remove the li or render the array again.
      //this only removes the item from the list, but not from the array
      deleteButton.closest("li").remove();
      //this removes it from the array, splice(index start,what to remove - so 1 remove exactly ONE element starting at that position)
      studentInfo.splice(index, 1);
      //   render();
    }

    let myObject = {};

    function editItem() {
      editSection.style.display = "flex";

      let saveBtn = document.querySelector("#save-changes");

      saveBtn.addEventListener("click", () => {
        let newProgram = document.querySelector("[name=new-program]:checked");
        let newYear = document.querySelector("[name=new-year]:checked");
        let newName = document.querySelector("#new-student-name").value;
        let newCity = document.querySelector("select#new-city").value;

        if (!newName || !newProgram || !newCity || !newYear) {
          alert("not all fields filled");
          return;
        } else {
          myObject = {
            name: newName,
            program: newProgram.value,
            city: newCity,
            year: newYear.value,
          };
          studentInfo.splice(index, 1, myObject);
          render();
          editSection.style.display = "none";
        }
      });
    }

    deleteButton.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);
  });
}

function addStudent() {
  //save values.
  let name = studentName.value;
  //radio buttons need to have a value attribute in HTML
  let program = document.querySelector("[name=program]:checked");
  let city = studentCity.value;
  let programYear = document.querySelector("[name=year]:checked");

  if (
    //This uses queryselectorall to check if ALL radio buttons for each section is empty
    // document.querySelectorAll('input[name ="program"]:checked').length === 0 ||
    // document.querySelectorAll('input[name ="year"]:checked').length === 0 ||
    // name === ""

    //!name checks if name is empty, null or false. Shorter than above.
    //check radio buttons have been check but not their value, will cause an error
    !name ||
    !program ||
    !programYear ||
    !city
  ) {
    alert("Not all Fields have been filled.");
    return;
  } else {
    let newStudent = {
      name: name,
      program: program.value,
      city: city,
      year: programYear.value,
    };
    studentInfo.push(newStudent);

    studentName.value = "";
    document.querySelector("[name=program]:checked").checked = false;

    render();
    console.log(studentInfo);
  }
}

addStudentBtn.addEventListener("click", addStudent);

/////////////////////////////////////////////////////7
//Filter

let progDrop = document.querySelector("#program-dropdown");
let cityDrop = document.querySelector("#city-dropdown");
let yearDrop = document.querySelector("#year-dropdown");
let filterBtn = document.querySelector("#filter-btn");

function filterArray() {
  let programDropValue = progDrop.value;
  let cityDropValue = cityDrop.value;
  let yearDropValue = yearDrop.value;

  let filteredList = studentInfo;

  if (programDropValue !== "") {
    filteredList = filteredList.filter((student) => {
      console.log(student.program, programDropValue);
      return student.program === programDropValue;
    });
  }

  if (cityDropValue !== "") {
    filteredList = filteredList.filter(
      (student) => student.city === cityDropValue
    );
  }

  if (yearDropValue !== "") {
    filteredList = filteredList.filter(
      (student) => student.year === yearDropValue
    );
  }

  studentList.innerHTML = "";

  filteredList.forEach((student) => {
    let li = document.createElement("li");
    li.innerText = `Namn: ${student.name} - Utbildning: ${student.program} - Stad: ${student.city} - År: ${student.year} `;
    studentList.append(li);
  });
}

filterBtn.addEventListener("click", filterArray);
