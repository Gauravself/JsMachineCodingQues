(async function () {
  const response = await fetch("./Data.json");
  const data = await response.json();

  const employeeList = document.querySelector(".employees__names--list");
  const employeeInfo = document.querySelector(".employees__single--info");
  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");
  const dobField = document.querySelector(".addEmployee_create--dob");

  let employees = data;
  let selectedEmployeeId = employees[0].id;
  let selectedEmployee = employees[0];

  const renderEmployees = () => {
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employees__names--item");

      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }

      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;

      employeeList.append(employee);
    });
  };

  // Render Single Employee Detail
  const renderSingleEmployee = () => {
    if (selectedEmployeeId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }
    employeeInfo.innerHTML = `<img src=${selectedEmployee.imageUrl} />
        <span class="employees__single--heading">
          Name - ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
        </span>
        <span>Address - ${selectedEmployee.address}</span>
        <span>Email - ${selectedEmployee.email}</span>
        <span>Mobile - ${selectedEmployee.contactNumber}</span>
        <span>DOB = ${selectedEmployee.dob}</span> 
      `;
  };

  //Select Employee ->Concept Used Event Deligation
  employeeList.addEventListener("click", (event) => {
    //   Check if only span is clicked and if clicked span id is not selected emp id
    if (
      event.target.tagName === "SPAN" &&
      selectedEmployeeId !== event.target.id
    ) {
      // Update selected employee to clicked span id
      selectedEmployeeId = event.target.id;

      // Re-render employees list to see effect
      renderEmployees();

      // Show selected employee detail
      if (selectedEmployee) renderSingleEmployee();
    }

    if (event.target.tagName === "I") {
      employees = employees.filter(
        (emp) => String(emp.id) !== event.target.parentNode.id
      );

      // deleteSelectedUser(event.target.id);
      if (String(selectedEmployeeId) === event.target.parentNode.id) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }
      renderEmployees();
    }
  });

  // Add Employee
  createEmployee.addEventListener("click", (event) => {
    addEmployeeModal.style.display = "flex";
  });

  // Modal
  addEmployeeModal.addEventListener("click", (event) => {
    if (event.target.className === "addEmployee") {
      addEmployeeModal.style.display = "none";
    }
  });

  // Process Data from Form Input
  addEmployeeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    let empData = {};
    values.forEach((newEmpData) => {
      empData[newEmpData[0]] = newEmpData[1];
    });
    empData.id = employees[employees.length - 1].id + 1;
    empData.age =
      new Date().getFullYear - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-pmg.flaticon.com/512/0/93.png";
    employees.push(empData);
    renderEmployees();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
  });

  // Get Age
  dobField.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  renderEmployees();
  if (selectedEmployee) renderSingleEmployee();
})();
