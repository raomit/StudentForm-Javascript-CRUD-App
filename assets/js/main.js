// Data Structure For Student Details
let studentId = -1;

console.log("reloaded");

let studentDetails, educationField;

let educationDataTable;

// template for nested table


let tempNestedTable =`
<div class="nested-edu-container">
<div class="nested-edu-header-cont d-flex align-items-center">
<i class="fa-solid fa-school me-2" style="color: yellow; font-size: 1.5rem"></i>
<h3 class="nested-edu-header mt-3">Education Details</h3>
</div>
  <table class="edu-tbl table table-hover table-responsive" id="eduTable">
              <thead>
                <tr>
                  <th scope="col">Degree/Board</th>
                  <th scope="col">School/College</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">Passout Year</th>
                  <th scope="col">Percentage</th>
                  <th scope="col">Backlog</th>
                </tr>
              </thead>
              <tbody>
                  
              </tbody>
    </table>
</div>  
  `;

// nested table instance

// retrieving data from localstorage

let students = JSON.parse(localStorage.getItem("students")) || [];

// Add Input Field Button
const btnAdd = document.querySelector(".btn-add");

const editDelTemp = `
<i class="fa-solid fa-pen-nib icon bg-success text-white p-2" data-bs-toggle="modal" data-bs-target="#stud-form" onclick="updateModal(this)"></i>
<i class="fa-solid fa-trash icon bg-danger text-white p-2" onclick="deleteRecord(this)"></i>
`;

let dataTableInstance = $(".stud-tbl").DataTable({
  data: students,

  order: [[0, "asc"]],
  columns: [
    {
      data: null,
      defaultContent:
        '<i class="info-icon mt-1 fa-solid fa-circle-info" style="color: #FFD43B; font-size: 1.5rem; cursor: pointer"></i>',
      orderable: false,
    },
    { data: "fname" },
    { data: "lname" },
    { data: "dob" },
    { data: "email" },
    { data: "address" },
    { data: "gradyear" },
    {
      data: null,
      defaultContent: editDelTemp,
      orderable: false,
    },
  ],
});

dataTableInstance.on("click", ".info-icon", function (e) {
  // $("[data-dt-row]").hide();
  let tr = e.target.closest("tr");

  // the index of current clicked row
  let indexOfRow = dataTableInstance.row(tr).index();

  let row = dataTableInstance.row(tr);

  if (educationDataTable) {
    educationDataTable.destroy();
    educationDataTable = null;
    // $('tr[data-dt-row]').remove();
    console.log('detroyed', educationDataTable);
  }


  if (row.child.isShown()) {
    row.child.hide();
    console.log('show');
  } else {
    dataTableInstance.rows().every(function () {
      // this.child().find('table').find('colgroup').remove();
      this.child.remove();
    });
    
    row.child(tempNestedTable).show();

    console.log(educationDataTable, 'before');

    educationDataTable = $("#eduTable").DataTable({
      paging: false,
      info: false,
      searching: false,
      data: students[indexOfRow].educationFields,
      columns: [
        { data: "deg" },
        { data: "school" },
        { data: "sdate" },
        { data: "pyear" },
        { data: "percent" },
        { data: "back" },
      ],
    });
    console.log(educationDataTable);
    // educationDataTable.destroy();
    // educationDataTable = null;
    // console.log(educationDataTable);
    // educationDataTable.clear().draw();
    // educationDataTable.rows.add(students[indexOfRow].educationFields);
    // console.log(educationDataTable.rows);
    // educationDataTable.draw();
    // console.log(students[indexOfRow].educationFields);
    // educationDataTable.clear().rows.add(students[indexOfRow].educationFields).draw();

    // let educationDataTable = $(row.child())
    //   .find("table#eduTable")
    //   .DataTable({
    //     paging: false,
    //     info: false,
    //     searching: false,
    //     data: students[indexOfRow].educationFields,
    // columns: [
    //   { data: "deg" },
    //   { data: "school" },
    //   { data: "sdate" },
    //   { data: "pyear" },
    //   { data: "percent" },
    //   { data: "back" },
    // ],
    //   });
    $(row.child()).find("div.dt-start").hide();
    $(row.child()).find("div.dt-end").hide();
  }
});

// Education Field Template
const educationFieldTemp = `<div class="my-3 ed-field-cont ed-field-cont-new field-1 d-flex align-items-baseline border-bottom flex-column flex-lg-row">
    <div class="mb-3 me-2">
        <label for="deg" class="form-label">Degree/Board</label>
        <input type="text" class="form-control" id="deg" required>
        <div class="invalid-feedback">
            Degree/Board Required.
        </div>
    </div>
    <div class="mb-3 me-2">
        <label for="school" class="form-label">School/College</label>
        <input type="text" class="form-control" id="school" required>
        <div class="invalid-feedback">
            School/College Required.
        </div>
    </div>
    <div class="mb-3 me-2">
        <label for="sdate" class="form-label">Start Date</label>
        <input type="month" class="form-control" id="sdate" oninput="startDateValidity(event)" required>
        <div class="invalid-feedback">
            Please enter valid start date.
        </div>
    </div>
    <div class="mb-3 me-2">
        <label for="pyear" class="form-label">Passout Year</label>
        <input type="month" class="form-control" id="pyear" oninput="passYearValidity(event)" required>
        <div class="invalid-feedback">
            Please enter valid pass out year.
        </div>
    </div>
    <div class="mb-3 me-2">
        <label for="percent" class="form-label">Percentage</label>
        <input type="number" class="form-control" id="percent" placeholder="Dont use % sign" min="0" max="100" step=".01" required>
        <div class="invalid-feedback">
            Percentage Required.
        </div>
    </div>
    <div class="mb-3 me-2">
        <label for="back" class="form-label">Backlog</label>
        <input type="number" class="form-control" id="back" placeholder="If Any" value="0" min="0">
    </div>
    <button class="btn bg-light text-dark py-1 btn-remove">-</button>
    </div>`;

// DOB Input Reference

let dobInput = document.getElementById("dob");

// Graduation Year Reference

let gradYearInput = document.getElementById("gradyear");

// Table reference

let table = document.querySelector(".stud-tbl tbody");

// Getting the modal form reference

const studentForm = document.querySelector("div.modal-body form");

// Education Details Container
const edForm = document.querySelector(".ed-form");

// Submit Button
const submitBtn = document.querySelector(".btn-submit");

// Format function that will take data and return table for perticular row clicked

let format = function (rowDataObj) {
  return $(`<div class="nested-edu-header-cont d-flex align-items-center"><i class="fa-solid fa-school me-2" style="color: yellow; font-size: 1.5rem"></i><h3 class="nested-edu-header mt-3">Education Details</h3>
  </div><table class="edu-tbl table table-hover table-responsive" id="eduTable"><thead><tr><th scope="col">Degree/Board</th><th scope="col">School/College</th><th scope="col">Start Date</th><th scope="col">Passout Year</th><th scope="col">Percentage</th><th scope="col">Backlog</th></tr></thead><tbody></tbody></table>`);
};

$(".btn-close").on("click", function (event) {
  console.log(studentId);
  $("form")[0].reset(); // Reset the first form found in the document
  $(".btn-submit").text("Submit");

  $(".ed-field-cont-new").remove();
});

$(btnAdd).on("click", function (e) {
  e.preventDefault();
  $(edForm).append(educationFieldTemp);
});

$(edForm).on("click", ".btn-remove", function (e) {
  $(this).parent().remove();
});

/* Validation Logic Starts Here*/

// Regex for the email
let emailCheckRegEx = /^[a-z][a-z0-9]*@[a-z]+\.[a-z]+$/;

$(dobInput).on("input", function (event) {
  if (new Date().getFullYear() - new Date($(this).val()).getFullYear() > 18) {
    event.target.setCustomValidity("");
  } else {
    event.target.setCustomValidity("something else");
  }

  // Triggering the 'input' event on gradYearInput
  $(gradYearInput).trigger("input");
});

$(gradYearInput).on("input", function (event) {
  if (
    new Date($(this).val()).getFullYear() -
      new Date($(dobInput).val()).getFullYear() >
    0
  ) {
    console.log("valid");
    event.target.setCustomValidity("");
  } else {
    event.target.setCustomValidity("something else");
    $(event.target)
      .parent()
      .find(".invalid-feedback")
      .text("Graduation year can't be the same year or before DOB!");
  }
});

// Validity check function for the start year and passout year

function passYearValidity(event) {
  console.log(event.target.parentNode);
  // console.log(this);
  if (
    new Date(event.target.value).getFullYear() -
      new Date(
        event.target.parentElement.parentElement.querySelector("#sdate").value
      ).getFullYear() >=
    0
  ) {
    event.target.setCustomValidity("");
  } else {
    event.target.setCustomValidity("invalid");
  }
}

// Start date dispatches the event on input so that pass date year adjusts validity as per start date and if start date is set later than pass date then also validations work fine

function startDateValidity(event) {
  console.log("inside start date");
  event.target.parentElement.parentElement
    .querySelector("#pyear")
    .dispatchEvent(new Event("input"));
}

/* Validation Logic Ends Here
---------------
------------
---------------
---------------
*/

// fillUpForm function fills up the form with the details of students that you want to update

const fillUpForm = (reqStudent) => {
  // Check if student has more than two education fields, then first render template for those fields and then carry on with filling up values

  if (reqStudent.educationFields.length > 2) {
    for (let count = 2; count < reqStudent.educationFields.length; count++) {
      $(edForm).append(educationFieldTemp);
    }
  }

  // counter for edfields array
  let counterEdFields = 0;

  $(".stud-form-container .form-control").each(function () {
    $(this).val(reqStudent[$(this).attr("id")]);
  });

  $(".ed-form .ed-field-cont").each(function () {
    // getting individual education fields
    $(this)
      .find("input")
      .each(function () {
        $(this).val(reqStudent.educationFields[counterEdFields][this.id]);
      });
    counterEdFields++;
  });
};

// Update Student Record
let updateModal = (item) => {
  console.log("hit");
  // console.log(dataTableInstance.row($(item).closest('tr')).index());
  // change the submit text to be "Update"
  $(".btn-submit").text("Update");

  // fetching required student object from students array(localstorage data)
  let reqStudent =
    students[dataTableInstance.row($(item).closest("tr")).index()];

  // setting global studentId variable to be id of current updating student, so that at the time of clicking update button, we ca override the specific studentDetails object in localstorage

  studentId = dataTableInstance.row($(item).closest("tr")).index();

  // passing the studentdetails to be updated to fillupform so that it can build up form based upon given object
  fillUpForm(reqStudent);
};

// Delete Student Record
const deleteRecord = (item) => {
  let indexOfRecord = dataTableInstance.row($(item).closest("tr")).index();
  students.splice(indexOfRecord, 1);
  console.log(students);
  // dataTableInstance.row(indexOfRecord).remove().rows.clear().add(students).draw('full-hold');
  dataTableInstance.row(indexOfRecord).remove().draw("full-hold");
  dataTableInstance.clear().rows.add(students).draw("full-hold");

  localStorage.setItem("students", JSON.stringify(students));
};

// Form On Submit Event Attach, Handler and Validation
studentForm.addEventListener(
  "submit",
  function (event) {
    studentDetails = {};
    educationField = {};
    studentDetails.educationFields = [];

    if (!studentForm.checkValidity()) {
      studentForm.classList.add("was-validated");
      event.preventDefault();
      event.stopPropagation();
    } else {
      studentForm.classList.remove("was-validated");

      $(".stud-form-container .form-control").each(function () {
        studentDetails.id = Math.round(Math.random() * 100000) + Date.now();
        studentDetails[$(this).attr("id")] = $(this).val();
      });

      // Loop for getting education fields
      $("div.ed-form .ed-field-cont").each(function () {
        var educationField = {};
        $(this)
          .find("input")
          .each(function () {
            educationField[$(this).attr("id")] = $(this).val();
          });
        studentDetails.educationFields.push(educationField);
      });

      if (students == []) {
        console.log("inside students null");
        students.push(studentDetails);

        localStorage.setItem("students", JSON.stringify(students));
        console.log("local storage is null");
      } else {
        console.log("data is already there in local storage");

        if (submitBtn.innerText == "Update") {
          $(".btn-close").trigger("click");

          students[studentId] = studentDetails;
          console.log(studentId);
          dataTableInstance.row(studentId).data(studentDetails).draw();
          studentId = -1;
          localStorage.setItem("students", JSON.stringify(students));
        } else {
          students.push(studentDetails);
          dataTableInstance.row.add(studentDetails).draw();
          $(".btn-close").trigger("click");
          localStorage.setItem("students", JSON.stringify(students));
        }
      }
    }
  },
  false
);
