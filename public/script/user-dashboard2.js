document.addEventListener('DOMContentLoaded', () => {
  // ... (keep existing dataTypes array and table initialization code)

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


  // Enhanced routing configuration
  const routeMap = {
    '/user/dashboard/home': 'home',
    '/user/dashboard/modern-data-types': 'modern-data-types',
    '/user/dashboard/view-projects': 'view-projects',
    '/user/dashboard/view-projects/create-project': 'create-database',
    '/user/dashboard/how-to-use': 'how-to-use'
  };

  // Navigation link handler
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const path = this.getAttribute('href');
      window.history.pushState({}, '', path);
      handleRoute();
    });
  });

  // Enhanced route handler
  const handleRoute = () => {
    const path = window.location.pathname;

    console.log("path name ", path);
    
    // Handle dynamic database routes
    const dbRouteMatch = path.match(/^\/user\/dashboard\/view-projects\/([^/]+)\/json-converters$/);
    if (dbRouteMatch) {
        const dbName = decodeURIComponent(dbRouteMatch[1]);
        showSection('json-coverters', () => renderJsonConverters(dbName));
        return;
    }

    // Handle static routes
    const sectionId = routeMap[path] || 'home';
    showSection(sectionId, () => {
        if (sectionId === 'modern-data-types') populateTable();
        if (sectionId === 'view-projects') fetchProjects();
        if (sectionId === 'create-database') {
            // Ensure the create-database section is visible
            const createDatabaseSection = document.getElementById('create-database');
            if (createDatabaseSection) {
                createDatabaseSection.classList.remove('hidden');
            }
        }
    });
};

// Generic section show function
const showSection = (sectionId, callback) => {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === window.location.pathname) {
            link.classList.add('active');
        }
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        if (callback) callback();
    }
};

// .create-btn click handler
document.querySelector('.create-btn')?.addEventListener('click', (e) => {
    e.preventDefault();

    // Navigate to the create project section without reloading the page
    window.history.pushState({}, '', '/user/dashboard/view-projects/create-project');

    // Show the create-database section directly
    showSection('create-database');
});

  // Project card click handler
  document.body.addEventListener('click', (e) => {
    const projectCard = e.target.closest('.project-card');
    if (projectCard) {
      e.preventDefault();
      const dbName = projectCard.querySelector('h3').textContent;
      const path = `/user/dashboard/view-projects/${encodeURIComponent(dbName)}/json-converters`;
      window.history.pushState({}, '', path);
      handleRoute();
    }
  });

  // ... (keep existing form submission handlers and helper functions)

  // Initial setup
  handleRoute();
  window.addEventListener('popstate', handleRoute);
});





// ... (keep existing renderJsonConverters, renderProjectCard, and fetchProjects functions)

function renderJsonConverters(dbName) {
  console.log("inside render jsonnnnn");

  const section = document.getElementById("json-coverters");

  // Remove the existing h2 element if it already exists
  const existingTitle = section.querySelector("h2");
  if (existingTitle) existingTitle.remove();

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

  // Remove existing container before appending a new one
  const existingContainer = section.querySelector(".converter-options");
  if (existingContainer) existingContainer.remove();


  section.appendChild(jsonConvertersSectionDbname);
  section.appendChild(container);
}





document.querySelector('.create-btn').addEventListener('click', (e) => {
  e.preventDefault();
  window.history.pushState({}, '', '/user/dashboard/view-projects/create-project');
  // handleRoute();
});





function renderProjectCard(dbName) {
  const projectGrid = document.querySelector(".projects-grid");

  // Check if a project card with the same dbName already exists
  const existingCard = projectGrid.querySelector(`.project-card[data-db="${dbName}"]`);
  if (existingCard) return; // Prevent duplicates

  const projectDisplayCard = document.createElement("div");
  projectDisplayCard.classList.add("project-card");
  projectDisplayCard.setAttribute("data-db", dbName); // Add a unique identifier

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
  if (!window.projectsFetched) {
    fetchProjects();
    window.projectsFetched = true; // Prevent multiple fetch calls
  }
});

function fetchProjects() {
  fetch("/api/projects")
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








// // Storage Chart
// const ctx = document.getElementById('storageChart').getContext('2d');
// new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//         labels: ['Relational', 'NoSQL', 'Archived'],
//         datasets: [{
//             data: [65, 25, 10],
//             backgroundColor: ['#3498db', '#2ecc71', '#95a5a6']
//         }]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false
//     }
// });