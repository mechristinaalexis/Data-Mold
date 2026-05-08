document.addEventListener("submit", async function (event) {
  if (event.target.classList.contains("add-relation-submit")) {
      event.preventDefault();

      // Extract database name from URL
      const pathSegments = window.location.pathname.split("/");
      const databaseName = pathSegments[4]; // Assuming it's always at this position

      // Get form data
      const form = event.target.closest(".form");
      const childTable = form.querySelector('input[name="child_table"]').value.trim();
      const childColumn = form.querySelector('input[name="child_column"]').value.trim();
      const parentTable = form.querySelector('input[name="parent_table"]').value.trim();
      const parentColumn = form.querySelector('input[name="parent_column"]').value.trim();
      const constraintName = form.querySelector('input[name="constraint_name"]').value.trim();
      const onDelete = form.querySelector('select[name="on_delete"]').value;
      const onUpdate = form.querySelector('select[name="on_update"]').value;

      // Validate inputs
      if (!childTable || !childColumn || !parentTable || !parentColumn) {
          alert("Please fill in all required fields.");
          return;
      }

      // Prepare request payload
      const requestData = { childTable, childColumn, parentTable, parentColumn, onDelete, onUpdate };
      if (constraintName) {
          requestData.constraintName = constraintName; // Include constraint name if provided
      }

      // Send request to backend
      try {
          const response = await fetch(`/add-relation/${databaseName}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(requestData),
          });

          const data = await response.json();
          if (response.ok) {
              alert("Foreign key relation added successfully!");
              console.log(data);
          } else {
              alert("Error: " + data.message);
          }
      } catch (error) {
          console.error("Error in add-relation:", error);
      }
  }
});
