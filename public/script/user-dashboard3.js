

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

// table initialization
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

















  const routeMap = {
    '/user/dashboard/home': 'home',
    '/user/dashboard/modern-data-types': 'modern-data-types',
    '/user/dashboard/view-projects': 'view-projects',
    '/user/dashboard/view-projects/create-project': 'create-database',
    '/user/dashboard/how-to-use': 'how-to-use'
  };
  

  // navigate link handler
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const path = this.getAttribute('href');
      window.history.pushState({}, '', path);
      handleRoute();
    });
  });

  const handleRoute = () => {
    const path = window.location.pathname;

    // let a = window.location.href.split("/")[5].split("=");

   
    // console.log("a",a);
    // // http://localhost:3100/user/dashboard/view-projects?dbName=user-authetication/json-converters

    // const db = a[1];
    // console.log(path);
    // showSection('json-coverters', () => renderJsonConverters(db));
    // /a/b/c?a=b

    // debugger


    
    const dbRouteMatch = path.match(/^\/user\/dashboard\/view-projects\/([^\/]+)\/json-converters$/);
    console.log("dbmatch route", dbRouteMatch);
    if (dbRouteMatch) {
        const dbName = decodeURIComponent(dbRouteMatch[1]);   1   
        showSection('json-coverters', () => renderJsonConverters(dbName));
        return;
    }

    const conversionRouteMatch = path.match(/^\/user\/dashboard\/view-projects\/([^/]+)\/json-converters\/json-to-(\w+)$/);
    if (conversionRouteMatch) {
        const dbName = decodeURIComponent(conversionRouteMatch[1]);
        const conversionType = conversionRouteMatch[2];
        showSection(`json-to-${conversionType}`, () => renderJsonConverters(dbName));
        return;
    }

    const sectionId = routeMap[path] || 'home';
    showSection(sectionId, () => {
        if (sectionId === 'modern-data-types') populateTable();
        if (sectionId === 'view-projects') fetchProjects();
    });
};





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



document.querySelector('.create-btn')?.addEventListener('click', (e) => {
    e.preventDefault();

    window.history.pushState({}, '', '/user/dashboard/view-projects/create-project');

    showSection('create-database');
});



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



  handleRoute();
  window.addEventListener('popstate', handleRoute);
});






function renderJsonConverters(dbName) {
  console.log("inside render jsonnnnn");

  const section = document.getElementById("json-coverters");




  const existingTitle = section.querySelector("h2");
  if (existingTitle) existingTitle.remove();

  const jsonConvertersSectionDbname = document.createElement("h2");
  jsonConvertersSectionDbname.textContent = `Converters for Database: ${dbName}`;
  jsonConvertersSectionDbname.classList.add("jsonConvertersSectionDbname")

  const container = document.createElement("div");
  container.className = "converter-options";
  container.innerHTML = `
      <div class="converter-card" onclick="handleConversion('form')">
          <h3>JSON to Form</h3>
          <p style="margin-top: -8px;">Database: ${dbName}</p>  
          <div class="json-convertors-img-container">
            <img src="/imgs/json-img.webp" class="json-img convertors-img" alt="json">
            <i class="fa-solid fa-arrow-right"></i>
            <img src="/imgs/html-form.png" class="form-img convertors-img" alt="json">
          </div> 
      </div>
      <div class="converter-card" onclick="handleConversion('mysql')">
          <h3>JSON to MySQL</h3>
          <p style="margin-top: -8px;">Database: ${dbName}</p>
          <div class="json-convertors-img-container">
            <img src="/imgs/json-img.webp" class="form-img convertors-img" alt="json">
            <i class="fa-solid fa-arrow-right"></i>
            <img src="/imgs/mysql-schema-logo-removebg-preview.png" class="json-img convertors-img" alt="json">
          </div> 
      </div>
      <div class="converter-card" onclick="handleConversion('mermaid')">
          <h3>JSON to Mermaid</h3>
          <p style="margin-top: -8px;">Database: ${dbName}</p>
          <div class="json-convertors-img-container">
            <img src="/imgs/json-img.webp" class="json-img convertors-img" alt="json">
            <i class="fa-solid fa-arrow-right"></i>
            <img src="/imgs/11-removebg-preview.png" class="json-img convertors-img" alt="json">
          </div> 
      </div>
      <div class="converter-card" onclick="handleConversion('ai')">
          <h3>Create using AI</h3>
          <p style="margin-top: -8px;">Database: ${dbName}</p>
          <div class="json-convertors-img-container">
            <img src="/imgs/prompt-img.webp" class="json-img convertors-img" alt="json">
            <i class="fa-solid fa-arrow-right"></i>
            <img src="/imgs/html-form.png" class="form-img convertors-img" alt="json">
          </div> 
      </div>
  `;




  const existingContainer = section.querySelector(".converter-options");
  if (existingContainer) existingContainer.remove();

  section.appendChild(jsonConvertersSectionDbname);
  section.appendChild(container);
  

  const path = window.location.pathname;
  const conversionMatch = path.match(/^\/user\/dashboard\/view-projects\/([^/]+)\/json-converters\/json-to-(\w+)$/);
  if (conversionMatch) {
      const conversionType = conversionMatch[2];
      const targetSection = document.getElementById(`json-to-${conversionType}`);
      if (targetSection) {
          targetSection.classList.remove('hidden');
      }
  }
}





document.querySelector('.create-btn').addEventListener('click', (e) => {
  e.preventDefault();
  window.history.pushState({}, '', '/user/dashboard/view-projects/create-project');
});





function renderProjectCard(dbName) {
  const projectGrid = document.querySelector(".projects-grid");

  const existingCard = projectGrid.querySelector(`.project-card[data-db="${dbName}"]`);
  if (existingCard) return; 


  const projectDisplayCard = document.createElement("div");
  projectDisplayCard.classList.add("project-card");
  projectDisplayCard.setAttribute("data-db", dbName); 

  const projectDisplayCardContent = document.createElement("div");
  projectDisplayCardContent.classList.add("project-content");

  const projectDisplayCardContentDbName = document.createElement("h3");
  projectDisplayCardContentDbName.textContent = dbName;

  projectDisplayCardContent.appendChild(projectDisplayCardContentDbName);
  projectDisplayCard.appendChild(projectDisplayCardContent);
  projectGrid.appendChild(projectDisplayCard);

  projectDisplayCard.addEventListener("click", () => {
    const newPath = `/user/dashboard/view-projects?dbName=${dbName}/json-converters`;
    window.history.pushState({}, "", newPath);

    
  
    document.querySelectorAll(".content-section").forEach(section => section.classList.add("hidden"));

  

    // show section 
    const jsonConvertersSection = document.getElementById("json-coverters");
    jsonConvertersSection.classList.remove("hidden");



    renderJsonConverters(dbName);
  });
}






document.addEventListener("DOMContentLoaded", () => {
  if (!window.projectsFetched) {
    fetchProjects();
    window.projectsFetched = true; 
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
      console.log("fetched projects:", data);
      data.forEach(project => {
        renderProjectCard(project.database_name);
      });
    })
    .catch(error => console.error("error fetching projects:", error));
}





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

      const result = await response.json();
      console.log("checking response", result);
      alert(result.message);

      window.history.pushState({}, '', `/user/dashboard/view-projects/${database}/json-converters`);


      document.querySelectorAll('.content-section').forEach(section => section.classList.add('hidden'));
        const jsonSection = document.getElementById("json-coverters");
        jsonSection.classList.remove('hidden');

        jsonSection.querySelector("h2").textContent = `Database name: ${database}`;
        jsonSection.querySelector("p").textContent = `Hello, now you can work with the database ${database}.`;
        renderJsonConverters(database);

    } catch (error) {
        console.log("error caught", error);
    }
});

















window.handleConversion = function (conversionType) {
  const path = window.location.pathname;
  const dbRouteMatch = path.match(/^\/user\/dashboard\/view-projects\/([^/]+)\/json-converters$/);
  
  if (!dbRouteMatch) {
      console.error("Database name not found in URL.");
      return;
  }

  const dbName = decodeURIComponent(dbRouteMatch[1]);
  const newPath = `/user/dashboard/view-projects/${dbName}/json-converters/json-to-${conversionType}`;


  // update the URL
  window.history.pushState({}, '', newPath);


  document.querySelectorAll('.content-section').forEach(section => {
      section.classList.add('hidden');
  });


  const targetSection = document.getElementById(`json-to-${conversionType}`);
  if (targetSection) {
      targetSection.classList.remove('hidden');
  } else {
      console.warn(`Section #json-to-${conversionType} not found.`);
  }
};














// JSON IDE

document.addEventListener("DOMContentLoaded", function () {
  const editors = document.querySelectorAll(".editor");
  const errorMessages = document.querySelectorAll("#error-message");

  editors.forEach((editorDiv, index) => {
      const editor = ace.edit(editorDiv, {
          theme: "ace/theme/monokai",
          mode: "ace/mode/json",
          showPrintMargin: false,
          highlightActiveLine: false,
          displayIndentGuides: false,
      });

      const errorMessage = errorMessages[index];

  
      function validateJSON() {
          try {
              JSON.parse(editor.getValue());
              errorMessage.textContent = ""; 
          } catch (error) {
              errorMessage.textContent = "❌ invalid JSON: " + error.message;
          }
      }
      // listen for changes in the editor
      editor.session.on("change", validateJSON);
  });
});



















document.getElementById('form-action-container').addEventListener('click', function (event) {
  if (event.target.classList.contains('table-action-btn')) {
      const formContainer = document.getElementById('table-curd-form-container');
      formContainer.innerHTML = ''; 
      formContainer.style.display = 'flex';

      const action = event.target.classList.contains('add-column') ? 'add-column' :
                     event.target.classList.contains('update-column') ? 'update-column' :
                     event.target.classList.contains('show-column') ? 'show-column' :
                     event.target.classList.contains('delete-column') ? 'delete-column' :
                     event.target.classList.contains('add-row') ? 'add-row' :
                     event.target.classList.contains('delete-row') ? 'delete-row' :
                     event.target.classList.contains('delete-all-rows') ? 'delete-all-rows' :
                     event.target.classList.contains('add-relation') ? 'add-relation' :
                     event.target.classList.contains('delete-relation') ? 'delete-relation' :
                     event.target.classList.contains('join-tables') ? 'join-tables' :
                     event.target.classList.contains('show-table') ? 'show-table' :
                     event.target.classList.contains('delete-table') ? 'delete-table' :
                     null; 

      let formHTML = '';

      if (action === 'add-column') {
          formHTML = `
              <form class="form table-crud-form">
                  <button type="button" class="close-btn">X</button>
                  <h2>Add Column</h2>
                  <div class="field-row">
                      <label>Table Name</label>
                      <input type="text" name="table_name" placeholder="Enter table name" required>
                  </div>
                  <span class="error"></span>
                  <div class="field-row">
                      <label>Column Name</label>
                      <input type="text" name="column_name" placeholder="Enter column name" required>
                  </div>
                  <span class="error"></span>
                  <div class="field-row">
                      <label>Column Definition</label>
                      <input type="text" name="column_definition" placeholder="Enter column definition (e.g., VARCHAR(255))" required>
                  </div>
                  <span class="error"></span>
                  <button type="button" id="add-column-submit" class="formsubmit add-column-submit">Submit</button>
              </form>
          `;
          
      } 
      
      else if (action === 'update-column') {
          formHTML = `
              <form class="form table-crud-form">
                  <button type="button" class="close-btn">X</button>
                  <h2>Update Column</h2>
                  <div class="field-row">
                      <label>Table Name</label>
                      <input type="text" name="table_name" placeholder="Enter table name" required>
                  </div>
                  <span class="error"></span>
                  <div class="field-row">
                      <label>Column Name</label>
                      <input type="text" name="column_name" placeholder="Enter column name" required>
                  </div>
                  <span class="error"></span>
                  <div class="field-row">
                      <label>New Value</label>
                      <input type="text" name="new_value" placeholder="Enter new value" required>
                  </div>
                  <span class="error"></span>
                  <div class="field-row">
                      <label>Condition (WHERE)</label>
                      <input type="text" name="condition" placeholder="Enter condition (e.g., id = 1)" required>
                  </div>
                  <span class="error"></span>
                  <button type="button" id="update-column-submit" class="formsubmit update-column-submit">Submit</button>
              </form>
          `;
      } 
      
      else if (action === 'show-column') {
          formHTML = `
              <form class="form table-crud-form">
                  <button type="button" class="close-btn">X</button>
                  <h2>Show Column</h2>
                  <div class="field-row">
                      <label>Table Name</label>
                      <input type="text" name="table_name" placeholder="Enter table name" required>
                  </div>
                  <span class="error"></span>
                  <div class="field-row">
                      <label>Columns (comma-separated)</label>
                      <input type="text" name="columns" placeholder="Enter column names (e.g., name, age)" required>
                  </div>
                  <span class="error"></span>
                  <div class="field-row">
                      <label>Condition (WHERE)</label>
                      <input type="text" name="condition" placeholder="Enter condition (optional)">
                  </div>
                  <span class="error"></span>
                  <button type="button" id="show-column-submit" class="formsubmit show-column-submit">Submit</button>
              </form>
          `;
      } 
      
      else if (action === 'delete-column') {
          formHTML = `
              <form class="form table-crud-form">
                  <button type="button" class="close-btn">X</button>
                  <h2>Delete Column</h2>
                  <div class="field-row">
                      <label>Table Name</label>
                      <input type="text" name="table_name" placeholder="Enter table name" required>
                  </div>
                  <span class="error"></span>
                  <div class="field-row">
                      <label>Column Name</label>
                      <input type="text" name="column_name" placeholder="Enter column name to delete" required>
                  </div>
                  <span class="error"></span>
                  <button type="button" id="delete-column-submit" class="formsubmit delete-column-submit">Submit</button>
              </form>
          `;
      }

      else if (action === 'add-row') {
        formHTML = `
            <form class="form table-crud-form">
                <button type="button" class="close-btn">X</button>
                <h2>Add Row</h2>
                <div class="field-row">
                    <label>Table Name</label>
                    <input type="text" name="table_name" placeholder="Enter table name" required>
                </div>
                <span class="error"></span>
                <div class="field-row">
                    <label>Columns (comma-separated)</label>
                    <input type="text" name="columns" placeholder="Enter column names (e.g., name, age)" required>
                </div>
                <span class="error"></span>
                <div class="field-row">
                    <label>Values (comma-separated)</label>
                    <input type="text" name="values" placeholder="Enter values (e.g., 'John', 25)" required>
                </div>
                <span class="error"></span>
                <button type="button" id="add-row-submit" class="formsubmit add-row-submit">Submit</button>
            </form>
        `;
    }

    else if (action === 'delete-row') {
      formHTML = `
          <form class="form table-crud-form">
              <button type="button" class="close-btn">X</button>
              <h2>Delete Row</h2>
              <div class="field-row">
                  <label>Table Name</label>
                  <input type="text" name="table_name" placeholder="Enter table name" required>
              </div>
              <span class="error"></span>
              <div class="field-row">
                  <label>Condition (WHERE)</label>
                  <input type="text" name="condition" placeholder="Enter condition (e.g., id = 1)" required>
              </div>
              <span class="error"></span>
              <button type="submit" id="delete-row-submit" class="formsubmit delete-row-submit">Submit</button>
          </form>
      `;
  }
  
  else if (action === 'delete-all-rows') {
    formHTML = `
        <form class="form table-crud-form">
            <button type="button" class="close-btn">X</button>
            <h2>Delete All Rows</h2>
            <div class="field-row">
                <label>Table Name</label>
                <input type="text" name="table_name" placeholder="Enter table name" required>
            </div>
            <div class="field-row">
                <label>Delete method</label>
                <input type="text" name="delete_method" placeholder="DELETE or TRUNCATE" required>
            </div>
            <span class="error"></span>
            <button type="button" id="delete-all-rows-submit" class="formsubmit delete-all-rows-submit">Submit</button>
        </form>
    `;
}

else if (action === 'add-relation') {
  formHTML = `
      <form class="form table-crud-form">
          <button type="button" class="close-btn">X</button>
          <h2>Add Foreign Key Relation</h2>
          <div class="field-row">
              <label>Child Table</label>
              <input type="text" name="child_table" placeholder="Enter child table name" required>
          </div>
          <span class="error"></span>
          <div class="field-row">
              <label>Child Column</label>
              <input type="text" name="child_column" placeholder="Enter child column name" required>
          </div>
          <span class="error"></span>
          <div class="field-row">
              <label>Parent Table</label>
              <input type="text" name="parent_table" placeholder="Enter parent table name" required>
          </div>
          <span class="error"></span>
          <div class="field-row">
              <label>Parent Column</label>
              <input type="text" name="parent_column" placeholder="Enter parent column name" required>
          </div>
          <span class="error"></span>
          <div class="field-row">
              <label>Constraint Name</label>
              <input type="text" name="constraint_name" placeholder="Enter constraint name (optional)">
          </div>
          <span class="error"></span>
          <div class="field-row">
              <label>ON DELETE Action</label>
              <select name="on_delete">
                  <option value="CASCADE">CASCADE</option>
                  <option value="SET NULL">SET NULL</option>
                  <option value="RESTRICT">RESTRICT</option>
                  <option value="NO ACTION">NO ACTION</option>
              </select>
          </div>
          <span class="error"></span>
          <div class="field-row">
              <label>ON UPDATE Action</label>
              <select name="on_update">
                  <option value="CASCADE">CASCADE</option>
                  <option value="SET NULL">SET NULL</option>
                  <option value="RESTRICT">RESTRICT</option>
                  <option value="NO ACTION">NO ACTION</option>
              </select>
          </div>
          <span class="error"></span>
          <button type="submit" id="add-relation-submit" class="formsubmit add-relation-submit">Submit</button>
      </form>
  `;
}

else if (action === 'delete-relation') {
  formHTML = `
      <form class="form table-crud-form">
          <button type="button" class="close-btn">X</button>
          <h2>Delete Foreign Key Relation</h2>
          <div class="field-row">
              <label>Table Name</label>
              <input type="text" name="table_name" placeholder="Enter table name" required>
          </div>
          <span class="error"></span>
          <div class="field-row">
              <label>Foreign Key Name</label>
              <input type="text" name="foreign_key_name" placeholder="Enter foreign key name" required>
          </div>
          <span class="error"></span>
          <button type="submit" id="delete-relation-submit" class="formsubmit delete-relation-submit">Submit</button>
      </form>
  `;
}
else if (action === 'join-tables') {
  formHTML = `
      <form class="form table-crud-form">
          <button type="button" class="close-btn">X</button>
          <h2>Join Tables (Equi Join)</h2>
          <div class="field-row">
              <label>First Table Name</label>
              <input type="text" name="tableA" placeholder="Enter first table name" required>
          </div>
          <span class="error"></span>
          <div class="field-row">
              <label>Second Table Name</label>
              <input type="text" name="tableB" placeholder="Enter second table name" required>
          </div>
          <span class="error"></span>
          <div class="field-row">
              <label>Common Column</label>
              <input type="text" name="common_column" placeholder="Enter common column name" required>
          </div>
          <span class="error"></span>
          <div class="field-row">
              <label>Columns to Select (comma-separated)</label>
              <input type="text" name="columns" placeholder="e.g., A.name, B.email" required>
          </div>
          <span class="error"></span>
          <button type="submit" id="join-tables-submit" class="formsubmit join-tables-submit">Submit</button>
      </form>
  `;
}


else if (action === 'show-table') {
  formHTML = `
      <form class="form table-crud-form">
          <button type="button" class="close-btn">X</button>
          <h2>Show Table</h2>
          <div class="field-row">
              <label>Table Name</label>
              <input type="text" name="table_name" placeholder="Enter table name" required>
          </div>
          <span class="error"></span>
          <button type="submit" id="show-table-submit" class="formsubmit show-table-submit">Submit</button>
      </form>
  `;
}

else if (action === 'delete-table') {
  formHTML = `
      <form class="form table-crud-form">
          <button type="button" class="close-btn">X</button>
          <h2>Delete Table</h2>
          <div class="field-row">
              <label>Table Name</label>
              <input type="text" name="table_name" placeholder="Enter table name" required>
          </div>
          <span class="error"></span>
          <button type="submit" id="delete-table-submit" class="formsubmit delete-table-submit">Submit</button>
      </form>
  `;
}







    




      if (formHTML) {
          formContainer.innerHTML = formHTML;

          const closeBtn = formContainer.querySelector('.close-btn');
          if (closeBtn) {
              closeBtn.addEventListener('click', function () {
                  formContainer.innerHTML = ''; 
                  formContainer.style.display = 'none';
              });
          }
      }
  }
});




const tableCrudContainer = document.getElementById("table-curd-form-container");

console.log("checking container", tableCrudContainer);




document.addEventListener("click", async (event) => {
  if (event.target.id === "add-column-submit") {
      event.preventDefault(); 


      console.log("clicked button");

      const form = event.target.closest("form");
      const tableName = form.querySelector('input[name="table_name"]').value.trim();
      const columnName = form.querySelector('input[name="column_name"]').value.trim();
      const columnDefinition = form.querySelector('input[name="column_definition"]').value.trim();

      console.log(tableName, columnName, columnDefinition);

      if (!tableName || !columnName || !columnDefinition) {
          alert("Please fill all fields correctly");
          return;
      }

      const pathSegments = window.location.pathname.split('/');
      const databaseName = pathSegments[4];

      try {
          const response = await fetch(`/add-column/${databaseName}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tableName, columnName, columnDefinition })
          });

          const data = await response.json();
          if (response.ok) {
              alert("Column added successfully!");
              console.log(data);
          } else {
              alert("Error: " + data.message);
          }
      } catch (error) {
          console.error("Error in add-column:", error);
          alert("An error occurred. Please try again.");
      }
  }
  else if (event.target.id === "update-column-submit") {
    event.preventDefault();

    const pathSegments = window.location.pathname.split('/');
    const databaseName = pathSegments[4]; 

    const form = event.target.closest('.form');
    const tableName = form.querySelector('input[name="table_name"]').value.trim();
    const columnName = form.querySelector('input[name="column_name"]').value.trim();
    const newValue = form.querySelector('input[name="new_value"]').value.trim();
    const condition = form.querySelector('input[name="condition"]').value.trim();

    if (!tableName || !columnName || !newValue || !condition) {
        alert("please fill all fields correctly");
        return;
    }


    try {
        const response = await fetch(`/update-column/${databaseName}`, {
            method: "PUT", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tableName, columnName, newValue, condition })
        });

        const data = await response.json();
        if (response.ok) {
            alert("update operation successful!");
            console.log(data);
        } else {
            alert("error: " + data.message);
        }
    } catch (error) {
        console.error("error in update-column:", error);
    }
}
else if (event.target.id === "show-column-submit") {
  event.preventDefault();

  const pathSegments = window.location.pathname.split('/');
  const databaseName = pathSegments[4]; 

  const form = event.target.closest('.form');
  const tableName = form.querySelector('input[name="table_name"]').value.trim();
  const columns = form.querySelector('input[name="columns"]').value.trim();
  const condition = form.querySelector('input[name="condition"]').value.trim();


  if (!tableName || !columns) {
      alert("please fill all required fields correctly");
      return;
  }


  const queryParams = new URLSearchParams({
      tableName,
      columns,
      condition
  }).toString();

  fetch(`/show-column/${databaseName}?${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
  })
  .then(response => response.json())
  .then(data => {
      if (data.result) {
          console.log("fetched data:", data);

          console.log("show column data", data);


          form.style.display = "none";

          displayResultsTable(data.result, form);
      } else {
          alert("error: " + data.message);
      }
  })
  .catch(error => {
      console.error("error in show-column:", error);
  });
}

else if(event.target.id === "delete-column-submit"){
  event.preventDefault();

      const pathSegments = window.location.pathname.split('/');
      const databaseName = pathSegments[4]; 

      const form = event.target.closest('.form');
      const tableName = form.querySelector('input[name="table_name"]').value.trim();
      const columnName = form.querySelector('input[name="column_name"]').value.trim();


      if (!tableName || !columnName) {
          alert("please fill all required fields correctly");
          return;
      }

      if (!confirm(`are you sure you want to delete the column "${columnName}" from "${tableName}"? This action cannot be undone.`)) {
          return;
      }

      try {
          const response = await fetch(`/delete-column/${databaseName}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tableName, columnName })
          });

          const data = await response.json();
          if (response.ok) {
              alert("column deleted successfully!");
              console.log("deleted column:", columnName);
          } else {
              alert("error: " + data.message);
          }
      } catch (error) {
          console.error("error in delete-column:", error);
      }
}

else if(event.target.id === "add-row-submit"){

  event.preventDefault();

      const pathSegments = window.location.pathname.split('/');
      const databaseName = pathSegments[4];


      const form = event.target.closest('.form');
      const tableName = form.querySelector('input[name="table_name"]').value.trim();
      const columnsInput = form.querySelector('input[name="columns"]').value.trim();
      const valuesInput = form.querySelector('input[name="values"]').value.trim();


      const columns = columnsInput.split(',').map(col => col.trim());
      const values = valuesInput.split(',').map(val => val.trim());

      if (!tableName || columns.length === 0 || values.length === 0 || columns.length !== values.length) {
          alert("please enter a valid table name, column names, and corresponding values");
          return;
      }


      try {
          const response = await fetch(`/add-row/${databaseName}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tableName, columns, values })
          });

          const data = await response.json();
          if (response.ok) {
              alert("row added successfully!");
              console.log("inserted values:", data);
          } else {
              alert("error: " + data.message);
          }
      } catch (error) {
          console.error("error in add-row:", error);
      }

}

else if(event.target.id === "delete-row-submit"){

  event.preventDefault();

      const pathSegments = window.location.pathname.split('/');
      const databaseName = pathSegments[4]; 

      const form = event.target.closest('.form');
      const tableName = form.querySelector('input[name="table_name"]').value.trim();
      const condition = form.querySelector('input[name="condition"]').value.trim();

      if (!tableName || !condition) {
          alert("pls provide a valid table name and condition.");
          return;
      }

      try {
          const response = await fetch(`/delete-row/${databaseName}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tableName, condition })
          });

          const data = await response.json();
          if (response.ok) {
              alert("Row deleted successfully!");
              console.log("deleted row:", data);
          } else {
              alert("error: " + data.message);
          }
      } catch (error) {
          console.error("error in delete-row:", error);
      }

}

else if(event.target.id === "delete-all-rows-submit"){

  event.preventDefault();

      const pathSegments = window.location.pathname.split('/');
      const databaseName = pathSegments[4]; 


      const form = event.target.closest('.form');
      const tableName = form.querySelector('input[name="table_name"]').value.trim();
      const deleteMethod = form.querySelector('input[name="delete_method"]').value; 

      if (!tableName || !deleteMethod) {
          alert("Please select a table name and a deletion method.");
          return;
      }


      const confirmDelete = confirm(`are you sure you want to ${deleteMethod} all rows from ${tableName}?`);
      if (!confirmDelete) return;

      try {
          const response = await fetch(`/delete-all-rows/${databaseName}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tableName, deleteMethod })
          });

          const data = await response.json();
          if (response.ok) {
              alert(`all rows successfully deleted using ${deleteMethod}!`);
              console.log("deleted all rows:", data);
          } else {
              alert("error: " + data.message);
          }
      } catch (error) {
          console.error("Eerror in delete-all-rows:", error);
      }

}

else if(event.target.id === "add-relation-submit"){
  event.preventDefault();

      const pathSegments = window.location.pathname.split("/");
      const databaseName = pathSegments[4]; 

      const form = event.target.closest(".form");
      const childTable = form.querySelector('input[name="child_table"]').value.trim();
      const childColumn = form.querySelector('input[name="child_column"]').value.trim();
      const parentTable = form.querySelector('input[name="parent_table"]').value.trim();
      const parentColumn = form.querySelector('input[name="parent_column"]').value.trim();
      const constraintName = form.querySelector('input[name="constraint_name"]').value.trim();
      const onDelete = form.querySelector('select[name="on_delete"]').value;
      const onUpdate = form.querySelector('select[name="on_update"]').value;

      if (!childTable || !childColumn || !parentTable || !parentColumn) {
          alert("Please fill in all required fields.");
          return;
      }

      const requestData = { childTable, childColumn, parentTable, parentColumn, onDelete, onUpdate };
      if (constraintName) {
          requestData.constraintName = constraintName; 
      }

      try {
          const response = await fetch(`/add-relation/${databaseName}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(requestData),
          });

          const data = await response.json();
          if (response.ok) {
              alert("foreign key relation added successfully!");
              console.log(data);
          } else {
              alert("error: " + data.message);
          }
      } catch (error) {
          console.error("error in add-relation:", error);
      }

}

else if(event.target.id === "delete-relation-submit"){

  event.preventDefault();

      const pathSegments = window.location.pathname.split("/");
      const databaseName = pathSegments[4];

      const form = event.target.closest(".form");
      const tableName = form.querySelector('input[name="table_name"]').value.trim();
      const foreignKeyName = form.querySelector('input[name="foreign_key_name"]').value.trim();

      if (!tableName || !foreignKeyName) {
          alert("please fill in all required fields.");
          return;
      }


      const requestData = { tableName, foreignKeyName };


      try {
          const response = await fetch(`/delete-relation/${databaseName}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(requestData),
          });

          const data = await response.json();
          if (response.ok) {
              alert("foreign key relation deleted successfully!");
              console.log(data);
          } else {
              alert("error: " + data.message);
          }
      } catch (error) {
          console.error("error in delete-relation:", error);
      }
}

else if(event.target.id === "join-tables-submit"){
  event.preventDefault();

        const pathSegments = window.location.pathname.split("/");
        const databaseName = pathSegments[4]; 

        const form = event.target.closest(".form");
        const tableA = form.querySelector('input[name="tableA"]').value.trim();
        const tableB = form.querySelector('input[name="tableB"]').value.trim();
        const commonColumn = form.querySelector('input[name="common_column"]').value.trim();
        const columns = form.querySelector('input[name="columns"]').value.trim();

        if (!tableA || !tableB || !commonColumn || !columns) {
            alert("Please fill in all required fields.");
            return;
        }

        const requestData = { tableA, tableB, commonColumn, columns };

        try {
            const response = await fetch(`/join-tables/${databaseName}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("tables joined successfully!");
                console.log(data);
            } else {
                alert("error: " + data.message);
            }
        } catch (error) {
            console.error("error in join-tables:", error);
        }
}

else if (event.target.id === "show-table-submit") {
  event.preventDefault();

  const pathSegments = window.location.pathname.split("/");
  const databaseName = pathSegments[4]; 


  const form = event.target.closest(".form");
  const tableName = form.querySelector('input[name="table_name"]').value.trim();


  if (!tableName) {
      alert("Please enter a table name.");
      return;
  }

  const queryParams = new URLSearchParams({ tableName }).toString();

  fetch(`/show-table/${databaseName}?${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
  })
  .then(response => response.json())
  .then(data => {
      if (data.result) {
          console.log("taable data:", data);

          form.style.display = "none";

          if (!data.result || data.result.length === 0) {
            alert("table is empty.");
            form.style.display = "block"; 
            return;
        }


          displayResultsTable(data.result, form);
      } else {
          alert("Error: " + data.message);
      }
  })
  .catch(error => {
      console.error("Error fetching table data:", error);
  });
}


else if(event.target.id === "delete-table-submit"){

  event.preventDefault();

      const pathSegments = window.location.pathname.split("/");
      const databaseName = pathSegments[4]; 

      const form = event.target.closest(".form");
      const tableName = form.querySelector('input[name="table_name"]').value.trim();


      if (!tableName) {
          alert("Please enter a table name.");
          return;
      }


      const confirmation = confirm(`are you sure you want to delete the table "${tableName}"? this action cannot be undone`);
      if (!confirmation) return;

      try {
          const response = await fetch(`/delete-table/${databaseName}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tableName }),
          });

          const data = await response.json();
          if (response.ok) {
              alert(`table "${tableName}" deleted successfully!`);
              console.log("deleted Table:", data);
          } else {
              alert("error: " + data.message);
          }
      } catch (error) {
          console.error("error deleting table:", error);
      }

}








});







function displayResultsTable(data, form) {
  console.log("container", tableCrudContainer);

  if (!tableCrudContainer) {
      console.error("error---- tableCrudContainer element with ID 'table-crud-form' not found.");
      return;
  }

  const existingResultDiv = document.getElementById("table-result-div");
  if (existingResultDiv) {
      existingResultDiv.remove();
  }

  const resultDiv = document.createElement("div");
  resultDiv.id = "table-result-div";

  const table = document.createElement("table");
  table.id = "results-table";
  table.border = "1";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  Object.keys(data[0]).forEach(column => {
      const th = document.createElement("th");
      th.textContent = column;
      headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  data.forEach(row => {
      const tr = document.createElement("tr");

      Object.values(row).forEach(value => {
          const td = document.createElement("td");
          td.textContent = value;
          tr.appendChild(td);
      });

      tbody.appendChild(tr);
  });

  table.appendChild(tbody);

  const backButton = document.createElement("button");
  backButton.textContent = "Go Back";
  backButton.id = "go-back-button";
  backButton.onclick = function () {
      resultDiv.remove();
      form.style.display = "block"; 
  };

  form.style.display = "none";
  resultDiv.appendChild(table);
  resultDiv.appendChild(backButton);
  tableCrudContainer.appendChild(resultDiv);
}
