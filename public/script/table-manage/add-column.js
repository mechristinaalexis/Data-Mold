// document.addEventListener("submit", async function (event) {
//   if (event.target.classList.contains('add-column-submit')) {
//       event.preventDefault();

//       // Extract database name from URL
//       const pathSegments = window.location.pathname.split('/');
//       const databaseName = pathSegments[4]; 

//       // Get form data
//       const form = event.target.closest('.form');
//       const tableName = form.querySelector('input[name="table_name"]').value.trim();
//       const columnName = form.querySelector('input[name="column_name"]').value.trim();
//       const columnDefinition = form.querySelector('input[name="column_definition"]').value.trim();


//       console.log(tableName, columnName, columnDefinition);

//       if (!tableName || !columnName || !columnDefinition) {
//           alert("please fill all fields correctly");
//           return;
//       }

//       try {
//           const response = await fetch(`/add-column/${databaseName}`, {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ tableName, columnName, columnDefinition })
//           });

//           const data = await response.json();
//           if (response.ok) {
//               alert("column added successfully!");
//               console.log(data);
//           } else {
//               alert("Error: " + data.message);
//           }
//       } catch (error) {
//           console.error("Error in add-column:", error);
//       }
//   }
// });

const tableCrudForm = document.querySelector(".table-crud-form");

if(tableCrudForm){



tableCrudForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    const form = event.target;
    const tableName = form.querySelector('input[name="table_name"]').value.trim();
    const columnName = form.querySelector('input[name="column_name"]').value.trim();
    const columnDefinition = form.querySelector('input[name="column_definition"]').value.trim();

    console.log(tableName, columnName, columnDefinition);

    if (!tableName || !columnName || !columnDefinition) {
        alert("Please fill all fields correctly");
        return;
    }

    const pathSegments = window.location.pathname.split('/');
    const databaseName = pathSegments[4];

    try {
        const response = await fetch(`/add-column/${databaseName}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tableName, columnName, columnDefinition })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Column added successfully!");
            console.log(data);
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error in add-column:", error);
    }
});


}
