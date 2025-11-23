let studentName = document.querySelector("#student-name");
let studentCity = document.querySelector("select#city");
let addStudentBtn = document.querySelector("#student-add");
let studentList = document.querySelector(".student-list");
let studentInfo = [];

let editIndex = null; // track index we are editing

function addStudent() {
  let name = studentName.value;
  let program = document.querySelector("[name=program]:checked")?.value;
  let city = studentCity.value;
  let programYear = document.querySelector("[name=year]:checked")?.value;

  if (!name || !program || !programYear || !city) {
    alert("Not all fields filled.");
    return;
  }

  // IF EDITING → save changes to existing student
  if (editIndex !== null) {
    studentInfo[editIndex] = {
      name,
      program,
      city,
      year: programYear,
    };

    editIndex = null; // clear edit mode
    addStudentBtn.textContent = "Add Student";
  }
  // OTHERWISE → add new student
  else {
    studentInfo.push({
      name,
      program,
      city,
      year: programYear,
    });
  }

  render();
  clearForm();
}

function clearForm() {
  studentName.value = "";
  studentCity.value = "";
  document
    .querySelectorAll("[name=program]")
    .forEach((r) => (r.checked = false));
  document.querySelectorAll("[name=year]").forEach((r) => (r.checked = false));
}

function render() {
  studentList.innerHTML = "";

  studentInfo.forEach((student, index) => {
    let li = document.createElement("li");
    li.textContent = `Namn: ${student.name} - Utbildning: ${student.program} - Stad: ${student.city} - År: ${student.year} `;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    // DELETE
    deleteButton.addEventListener("click", () => {
      studentInfo.splice(index, 1);
      render();
    });

    // EDIT
    editBtn.addEventListener("click", () => {
      // Fill form with existing info
      studentName.value = student.name;
      studentCity.value = student.city;
      document.querySelector(
        `[name=program][value="${student.program}"]`
      ).checked = true;
      document.querySelector(
        `[name=year][value="${student.year}"]`
      ).checked = true;

      addStudentBtn.textContent = "Save Changes";
      editIndex = index; // mark which student we are editing
    });

    li.append(deleteButton, editBtn);
    studentList.append(li);
  });
}

addStudentBtn.addEventListener("click", addStudent);
