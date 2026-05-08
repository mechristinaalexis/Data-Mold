document.addEventListener('DOMContentLoaded', () => {
  const dataTypes = [
      {
          type: 'Email',
          description: 'Validates that the input string is in a valid email address format.',
          methods: '{"type":"email","name":"email","placeholder":"Enter your email"}'
      },
      {
          type: 'Distance',
          description: 'Measures distance with validation on unit (meters, kilometers, miles).',
          methods: '{"type":"distance","name":"distance","placeholder":"Enter distance"}'
      },
      {
          type: 'PhoneNumber',
          description: 'Validates international and local phone number formats.',
          methods: '{"type":"phoneNumber","name":"Phone Number","placeholder":"Enter your phone Number"}'
      },
      {
          type: 'Temperature',
          description: 'Handles temperature data with units (Celsius, Fahrenheit, Kelvin).',
          methods: '{"type":"temperature","name":"temperature","placeholder":"Enter your temperature"}'
      },
      {
        type: 'Url',
        description: 'Validates URLs to ensure proper format.',
        methods: '{"type":"url","name":"url","placeholder":"Enter your url"}'
    },
    {
      type: 'DateTime',
      description: 'Validates date and time formats,including timezone-awareness.',
      methods: '{"type":"dateTime","name":"DateTime","placeholder":"Enter your DateTime"}'
  },
{
  type: 'CurrencyAmount',
  description: 'Represents monetary values with validation on currency codes.',
  methods: '{"type":"temperature","name":"temperature","placeholder":"Enter your temperature"}'
},
{
  type: 'Countries',
  description: 'Validates country codes against ISO standards.',
  methods: '{"type":"Countries","name":"Countries","placeholder":"Enter your Countries"}'
},
{
  type: 'States',
  description: 'Validates States with the country.',
  methods: '{"type":"States","name":"States","placeholder":"Enter your States"}'
},
{
  type: 'PostalCode',
  description: 'Validates postal codes based on country-specic formats.',
  methods: '{"type":"PostalCode","name":"PostalCode","placeholder":"Enter your PostalCode"}'
},
{
  type: 'LanguageCode',
  description: 'Validates language codes against ISO standards.',
  methods: '{"type":"LanguageCode","name":"LanguageCode","placeholder":"Enter your LanguageCode"}'
},
{
  type: 'GeoCoordinates',
  description: 'Represents and validates geographical coordinates (latitude, longitude).',
  methods: '{"type":"GeoCoordinates","name":"GeoCoordinates","placeholder":"Enter your GeoCoordinates"}'
},
{
  type: 'IPAddress',
  description: 'Validates IPv4 and IPv6 address formats.',
  methods: '{"type":"IPAddress","name":"IPAddress","placeholder":"Enter your IPAddress"}'
},
{
  type: 'UUID',
  description: 'Validates universally unique identiers against standard formats.',
  methods: '{"type":"UUID","name":"UUID","placeholder":"Enter your UUID"}'
},
{
  type: 'HexColor',
  description: 'Validates strings as hexadecimal color codes.',
  methods: '{"type":"HexColor","name":"HexColor","placeholder":"Enter your HexColor"}'
},
{
  type: 'JSONString',
  description: 'Validates that a string is well-formed JSON.',
  methods: '{"type":"JSONString","name":"JSONString","placeholder":"Enter your JSONString"}'
},
{
  type: 'CreditCardNumber',
  description: 'Validates credit card numbers using the Luhn algorithm.',
  methods: '{"type":"CreditCardNumber","name":"CreditCardNumber","placeholder":"Enter your CreditCardNumber"}'
},
{
  type: 'SocialSecurityNumber',
  description: 'Validates national identication numbers, considering region-specicfic formats.',
  methods: '{"type":"SocialSecurityNumber","name":"SocialSecurityNumber","placeholder":"Enter your SocialSecurityNumber"}'
}

  ];

  // Table initialization
  let tableInitialized = false;
  const populateTable = () => {
      const tableBody = document.getElementById('data-types-table');
      if (!tableBody || tableInitialized) return;

      tableBody.innerHTML = '';
      dataTypes.forEach(type => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${type.type}</td>
              <td>${type.description}</td>
              <td><code>${type.methods}</code></td>
          `;
          tableBody.appendChild(row);
      });
      tableInitialized = true;
  };

  // Routing configuration
  const routeMap = {
      '/user/dashboard/home': 'home',
      '/user/dashboard/modern-data-types': 'modern-data-types',
      '/user/dashboard/view-projects': 'view-projects',
      '/user/dashboard/view-projects/create-project': 'create-database',
      '/user/dashboard/how-to-use': 'how-to-use'

  };



//   const handleRoute = () => {
//     const path = window.location.pathname;
//     const sectionId = routeMap[path] || 'home';

//     // Hide all sections
//     document.querySelectorAll('.content-section').forEach(section => {
//         section.classList.add('hidden');
//     });

//     // Set active navigation
//     document.querySelectorAll('.nav-link').forEach(link => {
//         link.classList.remove('active');
//         if (link.getAttribute('href') === path) {
//             link.classList.add('active');
//         }
//     });

//     const targetSection = document.getElementById(sectionId);
//     if (targetSection) {
//         targetSection.classList.remove('hidden');
//         if (sectionId === 'modern-data-types') populateTable();
//     } else {
//         document.getElementById('home').classList.remove('hidden');
//     }

//     // Check if the path matches a dynamic route (for example, /json-converters)
//     if (path.includes('/json-converters')) {
//         const dbName = path.split('/')[4]; // Get the database name from the URL
//         renderJsonConverters(dbName); // This will update the content dynamically for the specific dbName
//     }
// };




const handleRoute = () => {
  const path = window.location.pathname;

  // Check for dynamic database path
  const dbRouteMatch = path.match(/^\/user\/dashboard\/view-projects\/([^/]+)\/json-converters$/);
  
  if (dbRouteMatch) {
      const dbName = decodeURIComponent(dbRouteMatch[1]); // Extracts the database name from URL
      console.log("Database name:", dbName);
      document.querySelectorAll('.content-section').forEach(section => section.classList.add('hidden'));

      // Show JSON converters section
      const jsonConvertersSection = document.getElementById("json-coverters");
      jsonConvertersSection.classList.remove("hidden");

      // Render converters for the extracted database name
      renderJsonConverters(dbName);
      return;
  }

  // Default static route handling
  const sectionId = routeMap[path] || 'home';

  document.querySelectorAll('.content-section').forEach(section => {
      section.classList.add('hidden');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === path) {
          link.classList.add('active');
      }
  });

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
      targetSection.classList.remove('hidden');

      // Call populateTable() when navigating to 'modern-data-types'
      if (sectionId === 'modern-data-types') {
          populateTable();
      }
  } else {
      document.getElementById('home').classList.remove('hidden');
  }
};







  // Create project handler
  document.querySelector('.create-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.history.pushState({}, '', '/user/dashboard/view-projects/create-project');
      handleRoute();
  });



  document.getElementById('database-form')?.addEventListener('submit', (e) => {
      e.preventDefault();

      window.history.pushState({}, '', '/user/dashboard/view-projects');
      handleRoute();
      e.target.reset();
  });





  handleRoute();
  window.addEventListener('popstate', handleRoute);


});








document.getElementById("database-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const database = document.getElementById("db-name").value;
  const user = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
      const response = await fetch("/create-database", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ database, user, password })
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      console.log("Checking response", result);
      alert(result.message); // Success alert

      renderProjectCard(database);

  } catch (error) {
      console.error("Error creating database:", error);
      alert("Error creating database"); // Error alert
  }
});













// // Function to render conversion options
// function renderJsonConverters(databaseName) {
//   const section = document.getElementById("json-coverters");

//   const jsonConvertersSectionDbname = document.createElement("h2");
//   jsonConvertersSectionDbname.textContent = databaseName;

  
//   // Create container for converter options
//   const container = document.createElement("div");
//   container.className = "converter-options";
//   container.innerHTML = `
//       <div class="converter-card" onclick="handleConversion('form')">
//           <h3>JSON to Form</h3>
//           <p>Database: ${databaseName}</p>
//       </div>
//       <div class="converter-card" onclick="handleConversion('mysql')">
//           <h3>JSON to MySQL</h3>
//           <p>Database: ${databaseName}</p>
//       </div>
//       <div class="converter-card" onclick="handleConversion('mermaid')">
//           <h3>JSON to Mermaid</h3>
//           <p>Database: ${databaseName}</p>
//       </div>
//       <div class="converter-card" onclick="handleConversion('ai')">
//           <h3>Create using AI</h3>
//           <p>Database: ${databaseName}</p>
//       </div>
//   `;

//   // Clear previous content and append new options
//   const existingContainer = section.querySelector(".converter-options");
//   if (existingContainer) existingContainer.remove();
//   section.appendChild(jsonConvertersSectionDbname);
//   section.appendChild(container);
// }




function renderJsonConverters(dbName) {

  console.log("inside render jsonnnnn")
  const section = document.getElementById("json-coverters");

  // Dynamically update the content based on the dbName
  const jsonConvertersSectionDbname = document.createElement("h2");
  jsonConvertersSectionDbname.textContent = `Converters for Database: ${dbName}`;

  const container = document.createElement("div");
  container.className = "converter-options";
  container.innerHTML = `
      <div class="converter-card" onclick="handleConversion('form')">
          <h3>JSON to Form</h3>
          <p>Database: ${dbName}</p>
      </div>
      <div class="converter-card" onclick="handleConversion('mysql')">
          <h3>JSON to MySQL</h3>
          <p>Database: ${dbName}</p>
      </div>
      <div class="converter-card" onclick="handleConversion('mermaid')">
          <h3>JSON to Mermaid</h3>
          <p>Database: ${dbName}</p>
      </div>
      <div class="converter-card" onclick="handleConversion('ai')">
          <h3>Create using AI</h3>
          <p>Database: ${dbName}</p>
      </div>
  `;

  // Clear previous content and append new options
  const existingContainer = section.querySelector(".converter-options");
  if (existingContainer) existingContainer.remove();
  section.appendChild(jsonConvertersSectionDbname);
  section.appendChild(container);
}








function renderProjectCard(dbName){
  const projectGrid = document.querySelector(".projects-grid");

  const projectDisplayCard = document.createElement("div");
  projectDisplayCard.classList.add("project-card");

  const projectDisplayCardContent = document.createElement("div");
  projectDisplayCardContent.classList.add("project-content");

  const projectDisplayCardContentDbName = document.createElement("h3");
  projectDisplayCardContentDbName.textContent = dbName;

  projectDisplayCardContent.appendChild(projectDisplayCardContentDbName);
  projectDisplayCard.appendChild(projectDisplayCardContent);
  projectGrid.appendChild(projectDisplayCard);



  projectDisplayCard.addEventListener("click", () => {
    const newPath = `/user/dashboard/view-projects/${dbName}/json-converters`;
    window.history.pushState({}, "", newPath);
    // handleRoute();
    // Hide all sections
    document.querySelectorAll(".content-section").forEach(section => section.classList.add("hidden"));

    // Show JSON converters section
    const jsonConvertersSection = document.getElementById("json-coverters");
    jsonConvertersSection.classList.remove("hidden");

    // Update and render converters with the selected database name
    renderJsonConverters(dbName);


  });
}




document.addEventListener("DOMContentLoaded", () => {
  fetchProjects();
});

function fetchProjects() {
  fetch("http://localhost:3000/api/projects")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched projects:", data);
      data.forEach(project => {
        renderProjectCard(project.database_name);
      });
    })
    .catch(error => console.error("Error fetching projects:", error));
}










// document.getElementById("database-form").addEventListener("submit", async function(event) {
//   event.preventDefault();

//   const database = document.getElementById("db-name").value;
//   const user = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   try {
//       const response = await fetch("/create-database", {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json"
//           },
//           body: JSON.stringify({ database, user, password })
//       });

//       const result = await response.json();
//       console.log("checking response", result);
//       alert(result.message);

//       document.querySelectorAll('.content-section').forEach(section => section.classList.add('hidden'));
//         const jsonSection = document.getElementById("json-coverters");
//         jsonSection.classList.remove('hidden');

//         // Update text and render converters
//         jsonSection.querySelector("h2").textContent = `Database name: ${database}`;
//         jsonSection.querySelector("p").textContent = `Hello, now you can work with the database ${database}.`;
//         renderJsonConverters(database);

//     } catch (error) {
//         alert("Error creating database");
//     }
// });
