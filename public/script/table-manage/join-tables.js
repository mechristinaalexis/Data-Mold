document.addEventListener("submit", async function (event) {
    if (event.target.classList.contains("join-tables-submit")) {
        event.preventDefault();

        // Extract database name from URL
        const pathSegments = window.location.pathname.split("/");
        const databaseName = pathSegments[4]; // Assuming it's always at this position

        // Get form data
        const form = event.target.closest(".form");
        const tableA = form.querySelector('input[name="tableA"]').value.trim();
        const tableB = form.querySelector('input[name="tableB"]').value.trim();
        const commonColumn = form.querySelector('input[name="common_column"]').value.trim();
        const columns = form.querySelector('input[name="columns"]').value.trim();

        // Validate inputs
        if (!tableA || !tableB || !commonColumn || !columns) {
            alert("Please fill in all required fields.");
            return;
        }

        // Prepare request payload
        const requestData = { tableA, tableB, commonColumn, columns };

        // Send request to backend
        try {
            const response = await fetch(`/join-tables/${databaseName}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Tables joined successfully!");
                console.log(data);
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error in join-tables:", error);
        }
    }
});
