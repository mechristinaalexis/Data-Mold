  // document.querySelector(".create-table-btn").addEventListener("click", async () => {
  //     let jsonInput = document.getElementById("json-table-container").textContent.trim();
      
  //     console.log("Raw Input:", jsonInput);

  //     // Extract JSON from content
  //     const firstBraceIndex = jsonInput.indexOf("{");
  //     const lastBraceIndex = jsonInput.lastIndexOf("}");
      
  //     if (firstBraceIndex !== -1 && lastBraceIndex !== -1 && lastBraceIndex > firstBraceIndex) {
  //         jsonInput = jsonInput.substring(firstBraceIndex, lastBraceIndex + 1);
  //     }

  //     console.log("Cleaned JSON Input:", jsonInput);

  //     try {
  //         const parsedJSON = JSON.parse(jsonInput);

  //         if (!parsedJSON.tableName || !Array.isArray(parsedJSON.columns)) {
  //             throw new Error("Invalid JSON structure: Missing 'tableName' or 'columns' array.");
  //         }

  //         const pathMatch = window.location.pathname.match(/view-projects\/([^\/]+)/);
  //         const dbName = pathMatch ? pathMatch[1] : null;


  //         if (!dbName) {
  //             throw new Error("Database name not found in URL.");
  //         }

  //         const apiUrl = `/create-table-dbname/${dbName}`;

  //         console.log(`Sending request to: ${apiUrl}`);

  //         // Send data to server
  //         const response = await fetch(apiUrl, {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(parsedJSON),
  //       });


  //       const contentType = response.headers.get("content-type");
  //           if (contentType && contentType.includes("application/json")) {
  //               const result = await response.json();
  //               console.log(result);
  //               alert(result.message);


  //               fetchTableStructure(dbName, parsedJSON.tableName);


                
  //           } else {
  //               throw new Error("Invalid response from server: Not JSON");
  //           }

  //         // const result = await response.json();
  //         // console.log(result);


  //     } catch (error) {
  //         console.error("Error processing JSON:", error);
  //         document.getElementById("error-message").textContent = error.message;
  //         document.getElementById("error-message").style.color = "red";
  //     }
  // });





  document.querySelector(".create-table-btn").addEventListener("click", async () => {
    let jsonInput = document.getElementById("json-table-container").textContent.trim();

    console.log("Raw Input:", jsonInput);

    // Extract JSON from content
    const firstBraceIndex = jsonInput.indexOf("{");
    const lastBraceIndex = jsonInput.lastIndexOf("}");

    if (firstBraceIndex !== -1 && lastBraceIndex !== -1 && lastBraceIndex > firstBraceIndex) {
        jsonInput = jsonInput.substring(firstBraceIndex, lastBraceIndex + 1);
    }

    console.log("Cleaned JSON Input:", jsonInput);

    try {
        const parsedJSON = JSON.parse(jsonInput);

        if (!parsedJSON.tableName || !Array.isArray(parsedJSON.columns)) {
            throw new Error("Invalid JSON structure: Missing 'tableName' or 'columns' array.");
        }

        const pathMatch = window.location.pathname.match(/view-projects\/([^\/]+)/);
        let dbName = pathMatch ? pathMatch[1] : null;

        if (dbName) {
          // dbName = dbName.replace(/%20/g, "-"); 
          dbName = decodeURIComponent(dbName); // Restore spaces from %20


        }

        if (!dbName) {
            const pathParts = window.location.pathname.split("/");
            dbName = pathParts.length > 2 ? pathParts[2] : null;
        }

        if (!dbName) {
            document.getElementById("error-message").textContent = "Database name not found.";
            return;
        }

        const apiUrl = `/create-table-dbname/${dbName}`;

        console.log(`Sending request to: ${apiUrl}`);

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsedJSON),
        });


        if (!response.ok) {
          throw new Error("Failed to create table: " + (await response.text()));
      }

      const result = await response.json();
      console.log(result);
      alert(result.message);

      // After table creation, fetch its structure
      fetchTableStructure(dbName, parsedJSON.tableName);

        // if (response.ok) {
        //     const result = await response.json();
        //     console.log(result);
        //     alert(result.message);

        //     if (result.tableName) {
        //         fetchTableStructure(dbName, result.tableName);
        //     }
        // } else {
        //     throw new Error("Failed to create table: " + (await response.text()));
        // }

    } catch (error) {
        console.error("Error processing JSON:", error);
        document.getElementById("error-message").textContent = error.message;
    }
});


  






async function fetchTableStructure(dbName, tableName) {
  try {
      // Restore spaces if they were URL-encoded
      dbName = decodeURIComponent(dbName);
      console.log("checking dbname ", dbName);

      const apiUrl = `/api/table-desc/${dbName}/${tableName}`;
      console.log(`Fetching table structure from: ${apiUrl}`);

      const response = await fetch(apiUrl);

      if (!response.ok) {
          throw new Error("Failed to fetch table structure.");
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format from server.");
      }

      const tableStructure = await response.json();
      console.log("Table Structure:", tableStructure);

      renderTable(tableStructure, tableName);
  } catch (error) {
      console.error("Error fetching table structure:", error);
  }
}







function renderTable(data, tableName) {
  const tableContainer = document.getElementById("tableContainer");
  tableContainer.innerHTML = `
      <h3>${tableName}</h3>
      <table cellspacing="0" cellpadding="8" style="width: 56%;">
          <thead>
              <tr>
                  <th>Column</th>
                  <th>Type</th>
              </tr>
          </thead>
          <tbody>
              ${data.map(row => `
                  <tr>
                      <td>${row.Field}</td>
                      <td>${row.Type}</td>
                  </tr>`).join('')}
          </tbody>
      </table>
  `;

  // Scroll to table
  tableContainer.scrollIntoView({ behavior: "smooth" });
}

