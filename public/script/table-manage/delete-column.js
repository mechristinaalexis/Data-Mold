// Form Submission Handler for Deleting a Column
document.addEventListener('submit', async function (event) {
  if (event.target.classList.contains('delete-column-submit')) {
      event.preventDefault();

      // Extract database name from URL
      const pathSegments = window.location.pathname.split('/');
      const databaseName = pathSegments[4]; // Assuming it's always at this position

      // Get form data
      const form = event.target.closest('.form');
      const tableName = form.querySelector('input[name="table_name"]').value.trim();
      const columnName = form.querySelector('input[name="column_name"]').value.trim();

      // Validate inputs
      if (!tableName || !columnName) {
          alert("Please fill all required fields correctly.");
          return;
      }

      // Confirm action
      if (!confirm(`Are you sure you want to delete the column "${columnName}" from "${tableName}"? This action cannot be undone.`)) {
          return;
      }

      // Send request to backend
      try {
          const response = await fetch(`/delete-column/${databaseName}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tableName, columnName })
          });

          const data = await response.json();
          if (response.ok) {
              alert("Column deleted successfully!");
              console.log("Deleted column:", columnName);
          } else {
              alert("Error: " + data.message);
          }
      } catch (error) {
          console.error("Error in delete-column:", error);
      }
  }
});
