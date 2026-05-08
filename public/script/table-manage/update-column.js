// Form Submission Handler for Updating a Column
document.addEventListener('submit', async function (event) {
  if (event.target.classList.contains('update-column-submit')) {
      event.preventDefault();

      // Extract database name from URL
      const pathSegments = window.location.pathname.split('/');
      const databaseName = pathSegments[4]; // Assuming it's always at this position

      // Get form data
      const form = event.target.closest('.form');
      const tableName = form.querySelector('input[name="table_name"]').value.trim();
      const columnUpdates = form.querySelector('input[name="column_updates"]').value.trim();
      const condition = form.querySelector('input[name="condition"]').value.trim();

      // Validate inputs
      if (!tableName || !columnUpdates || !condition) {
          alert("Please fill all fields correctly.");
          return;
      }

      // Send request to backend
      try {
          const response = await fetch(`/update-column/${databaseName}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tableName, columnUpdates, condition })
          });

          const data = await response.json();
          if (response.ok) {
              alert("Update operation successful!");
              console.log(data);
          } else {
              alert("Error: " + data.message);
          }
      } catch (error) {
          console.error("Error in update-column:", error);
      }
  }
});
