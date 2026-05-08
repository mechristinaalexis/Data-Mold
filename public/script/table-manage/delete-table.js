document.addEventListener("submit", async function (event) {
  if (event.target.classList.contains("delete-table-submit")) {
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

      // Confirm deletion
      const confirmation = confirm(`Are you sure you want to delete the table "${tableName}"? This action cannot be undone.`);
      if (!confirmation) return;

      // Send request to backend
      try {
          const response = await fetch(`/delete-table/${databaseName}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tableName }),
          });

          const data = await response.json();
          if (response.ok) {
              alert(`Table "${tableName}" deleted successfully!`);
              console.log("Deleted Table:", data);
          } else {
              alert("Error: " + data.message);
          }
      } catch (error) {
          console.error("Error deleting table:", error);
      }
  }
});
