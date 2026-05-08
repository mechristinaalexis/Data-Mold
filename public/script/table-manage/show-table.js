document.addEventListener("submit", async function (event) {
  if (event.target.classList.contains("show-table-submit")) {
      event.preventDefault();

      // Extract database name from URL
      const pathSegments = window.location.pathname.split("/");
      const databaseName = pathSegments[4]; // Assuming it's always at this position

      // Get table name from the form
      const form = event.target.closest(".form");
      const tableName = form.querySelector('input[name="table_name"]').value.trim();

      // Validate input
      if (!tableName) {
          alert("Please enter a table name.");
          return;
      }

      // Send request to backend
      try {
          const response = await fetch(`/show-table/${databaseName}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tableName }),
          });

          const data = await response.json();
          if (response.ok) {
              console.log("Table Data:", data);
              alert("Table data retrieved successfully!");
              // You can display `data` in a table format in the UI
          } else {
              alert("Error: " + data.message);
          }
      } catch (error) {
          console.error("Error fetching table data:", error);
      }
  }
});
