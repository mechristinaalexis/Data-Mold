document.addEventListener("submit", async function (event) {
  if (event.target.classList.contains("delete-relation-submit")) {
      event.preventDefault();

      // Extract database name from URL
      const pathSegments = window.location.pathname.split("/");
      const databaseName = pathSegments[4]; // Assuming it's always at this position

      // Get form data
      const form = event.target.closest(".form");
      const tableName = form.querySelector('input[name="table_name"]').value.trim();
      const foreignKeyName = form.querySelector('input[name="foreign_key_name"]').value.trim();

      // Validate inputs
      if (!tableName || !foreignKeyName) {
          alert("Please fill in all required fields.");
          return;
      }

      // Prepare request payload
      const requestData = { tableName, foreignKeyName };

      // Send request to backend
      try {
          const response = await fetch(`/delete-relation/${databaseName}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(requestData),
          });

          const data = await response.json();
          if (response.ok) {
              alert("Foreign key relation deleted successfully!");
              console.log(data);
          } else {
              alert("Error: " + data.message);
          }
      } catch (error) {
          console.error("Error in delete-relation:", error);
      }
  }
});
