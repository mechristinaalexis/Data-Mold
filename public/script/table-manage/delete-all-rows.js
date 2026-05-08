// Form Submission Handler for Deleting All Rows
document.addEventListener('submit', async function (event) {
  if (event.target.classList.contains('delete-all-rows-submit')) {
      event.preventDefault();

      // Extract database name from URL
      const pathSegments = window.location.pathname.split('/');
      const databaseName = pathSegments[4]; // Assuming it's always at this position

      // Get form data
      const form = event.target.closest('.form');
      const tableName = form.querySelector('input[name="table_name"]').value.trim();
      const deleteMethod = form.querySelector('select[name="delete_method"]').value; // 'DELETE' or 'TRUNCATE'

      // Validate inputs
      if (!tableName || !deleteMethod) {
          alert("Please select a table name and a deletion method.");
          return;
      }

      // Confirm action
      const confirmDelete = confirm(`Are you sure you want to ${deleteMethod} all rows from ${tableName}?`);
      if (!confirmDelete) return;

      // Send request to backend
      try {
          const response = await fetch(`/delete-all-rows/${databaseName}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tableName, deleteMethod })
          });

          const data = await response.json();
          if (response.ok) {
              alert(`All rows successfully deleted using ${deleteMethod}!`);
              console.log("Deleted all rows:", data);
          } else {
              alert("Error: " + data.message);
          }
      } catch (error) {
          console.error("Error in delete-all-rows:", error);
      }
  }
});
