// Form Submission Handler for Deleting a Row
document.addEventListener('submit', async function (event) {
  if (event.target.classList.contains('delete-row-submit')) {
      event.preventDefault();

      // Extract database name from URL
      const pathSegments = window.location.pathname.split('/');
      const databaseName = pathSegments[4]; // Assuming it's always at this position

      // Get form data
      const form = event.target.closest('.form');
      const tableName = form.querySelector('input[name="table_name"]').value.trim();
      const condition = form.querySelector('input[name="condition"]').value.trim();

      // Validate inputs
      if (!tableName || !condition) {
          alert("Please provide a valid table name and condition.");
          return;
      }

      // Send request to backend
      try {
          const response = await fetch(`/delete-row/${databaseName}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tableName, condition })
          });

          const data = await response.json();
          if (response.ok) {
              alert("Row deleted successfully!");
              console.log("Deleted row:", data);
          } else {
              alert("Error: " + data.message);
          }
      } catch (error) {
          console.error("Error in delete-row:", error);
      }
  }
});
