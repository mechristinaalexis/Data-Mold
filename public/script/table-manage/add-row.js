// Form Submission Handler for Adding a Row
document.addEventListener('submit', async function (event) {
  if (event.target.classList.contains('add-row-submit')) {
      event.preventDefault();

      // Extract database name from URL
      const pathSegments = window.location.pathname.split('/');
      const databaseName = pathSegments[4]; // Assuming it's always at this position

      // Get form data
      const form = event.target.closest('.form');
      const tableName = form.querySelector('input[name="table_name"]').value.trim();
      const columnsInput = form.querySelector('input[name="columns"]').value.trim();
      const valuesInput = form.querySelector('input[name="values"]').value.trim();

      // Convert comma-separated values to arrays
      const columns = columnsInput.split(',').map(col => col.trim());
      const values = valuesInput.split(',').map(val => val.trim());

      // Validate inputs
      if (!tableName || columns.length === 0 || values.length === 0 || columns.length !== values.length) {
          alert("Please provide a valid table name, column names, and corresponding values.");
          return;
      }

      // Send request to backend
      try {
          const response = await fetch(`/add-row/${databaseName}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tableName, columns, values })
          });

          const data = await response.json();
          if (response.ok) {
              alert("Row added successfully!");
              console.log("Inserted values:", data);
          } else {
              alert("Error: " + data.message);
          }
      } catch (error) {
          console.error("Error in add-row:", error);
      }
  }
});
