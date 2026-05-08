// Form Submission Handler for Showing Columns
document.addEventListener('submit', async function (event) {
  if (event.target.classList.contains('show-column-submit')) {
      event.preventDefault();

      // Extract database name from URL
      const pathSegments = window.location.pathname.split('/');
      const databaseName = pathSegments[4]; // Assuming it's always at this position

      // Get form data
      const form = event.target.closest('.form');
      const tableName = form.querySelector('input[name="table_name"]').value.trim();
      const columns = form.querySelector('input[name="columns"]').value.trim();
      const condition = form.querySelector('input[name="condition"]').value.trim();

      // Validate inputs
      if (!tableName || !columns) {
          alert("Please fill all required fields correctly.");
          return;
      }

      // Send request to backend
      try {
          const response = await fetch(`/show-column/${databaseName}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tableName, columns, condition })
          });

          const data = await response.json();
          if (response.ok) {
              console.log("Fetched data:", data);
              alert("Columns retrieved successfully! Check console for data.");
          } else {
              alert("Error: " + data.message);
          }
      } catch (error) {
          console.error("Error in show-column:", error);
      }
  }
});
