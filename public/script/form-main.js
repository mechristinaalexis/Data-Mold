document.querySelector(".create-form-btn").addEventListener("click", () => {
  let jsonInput = document.getElementById("json-form-editor").textContent.trim();

  console.log("Raw Input:", jsonInput); 

 
  const firstBraceIndex = jsonInput.indexOf("{");
  const lastBraceIndex = jsonInput.lastIndexOf("}");

  if (firstBraceIndex !== -1 && lastBraceIndex !== -1 && lastBraceIndex > firstBraceIndex) {
    jsonInput = jsonInput.substring(firstBraceIndex, lastBraceIndex + 1);
  }

  console.log("cleaned JSON Input:", jsonInput); 

  try {
      const parsedJSON = JSON.parse(jsonInput); 

      if (!parsedJSON.formTitle || !Array.isArray(parsedJSON.fields)) {
          throw new Error("invalid JSON structure");
      }

      const existingForm = document.querySelector("form-component");
      if (existingForm) {
          existingForm.remove();
      }


      const existingCopyButton = document.getElementById("copyCodeButton");
      if (existingCopyButton) {
          existingCopyButton.remove();
      }

   
      const formComponent = document.createElement("form-component");
      formComponent.setAttribute("json", JSON.stringify(parsedJSON));

      document.getElementById("formContainer").appendChild(formComponent);

      console.log("formComponent appended");
      console.log(formComponent);

      formComponent.scrollIntoView({ behavior: "smooth", block: "start" });



      const copyButton = document.createElement("button");
      copyButton.id = "copyCodeButton";
      copyButton.textContent = "Copy Code";
      copyButton.style.marginTop = "20px"; 

      copyButton.addEventListener("click", () => copyFormComponentCode(parsedJSON));

      document.getElementById("formContainer").appendChild(copyButton);

      copyButton.scrollIntoView({ behavior: "smooth", block: "start" });

  } catch (error) {
      document.getElementById("error-message").textContent = "invalid JSON format. correct it and try again";
      console.error(error);
  }
});



function copyFormComponentCode(jsonForForm) {
  const componentCode = `
import Distance from '../dist/distance.js';
import Email from '../dist/email.js';
import DateTime from '../dist/DateTime.js';
import Countries from '../dist/Countries.js';
import CreditCardNumber from '../dist/CreditCardNumber.js';
import CurrencyAmount from '../dist/CurrencyAmount.js';
import GeoCoordinates from '../dist/GeoCoordinates.js';
import HexColor from '../dist/HexColor.js';
import IPAddress from '../dist/IPAddress.js';
import JSONString from '../dist/JSONString.js';
import LanguageCode from '../dist/LanguageCode.js';
import PostalCode from '../dist/PostalCode.js';
import States from '../dist/States.js';
import SocialSecurityNumber from '../dist/SocialSecurityNumber.js';
import Temperature from '../dist/Temperature.js';
import Url from '../dist/Url.js';


class FormComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const jsonForForm = ${JSON.stringify(jsonForForm, null, 2)};

    const formTitle = jsonForForm.formTitle;
    const fields = jsonForForm.fields || [];

    this.shadowRoot.innerHTML = \`
      <div id="formContainer"></div>
      <style>
         #formContainer {
           padding: 20px;
           margin-top: 20px;
           display: flex;
           max-width: 600px;
           background-color: #e9e9e9;
           align-items: center;
           justify-content: center;
           background-color: white;
         }
         input {
           padding: 10px;
           width: 350px;
         }
         button {
           padding: 10px 24px;
           background-color: #14213D;
           color: #fff;
           border: none;
           cursor: pointer;
           border-radius: 6px;
           margin-top: 20px;
         }
         .error {
           margin-bottom: 10px;
           color: red;
           font-size: 14px;
           margin-top: -5px;
           display: block;
         }
         .form {
           width: 100%;
           display: flex;
           flex-direction: column;
           align-items: center;
         }
         .field-row {
           display: flex;
           align-items: start;
           margin: 15px 0px;
           flex-direction: column;
           gap: 10px;
         }
         label {
           margin-right: 20px;
           width: 70px;
         }
      </style>
    \`;

    const formContainer = this.shadowRoot.querySelector('#formContainer');
    const form = document.createElement('form');
    form.classList.add("form");

    const formHeader = document.createElement('h2');
    formHeader.textContent = formTitle;
    form.appendChild(formHeader);

    fields.forEach(field => {
      const formElement = document.createElement('div');
      formElement.classList.add("field-row");

      const label = document.createElement('label');
      label.textContent = field.label || field.name;

      const input = document.createElement('input');
      input.setAttribute('type', field.type);
      input.setAttribute('name', field.name);
      input.setAttribute('placeholder', field.placeholder);

      formElement.appendChild(label);
      formElement.appendChild(input);
      form.appendChild(formElement);

      const errorMessage = document.createElement('span');
      errorMessage.classList.add('error');
      errorMessage.textContent = '';
      form.appendChild(errorMessage);

      input.addEventListener('input', () => this.validateField(input, errorMessage, field.type));
      input.addEventListener('blur', () => this.validateField(input, errorMessage, field.type));
    });

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.id = 'formsubmit';
    submitButton.textContent = 'Submit Form';

    form.appendChild(submitButton);
    formContainer.appendChild(form);
  }

  validateField(input, errorMessage, fieldType) {
    try {
      if (fieldType === 'email') {
        new Email(input.value);
        errorMessage.textContent = '';
      } else if (fieldType === 'distance') {
        const [value, unit] = input.value.split(' ');
        new Distance(value, unit);
        errorMessage.textContent = '';
      }
      else if (fieldType === 'dateTime') {
              new DateTime(input.value); 
              errorMessage.textContent = ''; 
          }
          else if (fieldType === 'countries') {
            new Countries(input.value); 
            errorMessage.textContent = ''; 
        }
        else if (fieldType === 'creditCardNumber') {
          new CreditCardNumber(input.value); 
          errorMessage.textContent = ''; 
      }

      else if (fieldType === 'currencyAmount') {
        const [amount, currency] = input.value.split(" "); 
        new CurrencyAmount(amount, currency); 
        errorMessage.textContent = ''; 
    }

    else if (fieldType === 'geoCoordinates') {
      const [latitude, longitude] = input.value.split(",").map(coord => coord.trim()); 
      new GeoCoordinates(latitude, longitude);
      errorMessage.textContent = ''; 
  }

  else if (fieldType === 'hexColor') {
    new HexColor(input.value);
    errorMessage.textContent = ''; 
}
else if (fieldType === 'IPAddress') {
  new IPAddress(input.value);
  errorMessage.textContent = ''; 
}

else if (fieldType === 'JSONString') {
  new JSONString(input.value);
  errorMessage.textContent = ''; 
}
else if (fieldType === 'languageCode') {
  new LanguageCode(input.value);
  errorMessage.textContent = ''; 
}
else if (fieldType === 'postalCode') {
  const [value, country] = input.value.split(" ").map(part => part.trim()); 
  new PostalCode(value, country);
  errorMessage.textContent = ''; 
}

else if (fieldType === 'states') {
  const [value, country] = input.value.split(" ").map(part => part.trim()); 
  new States(value, country);
  errorMessage.textContent = ''; 
}

else if (fieldType === 'socialSecurityNumber') {
  new SocialSecurityNumber(input.value);
  errorMessage.textContent = ''; 
}

else if (fieldType === 'temperature') {
  const [value, unit] = input.value.split(" ").map(part => part.trim()); 
  new Temperature(value, unit);
  errorMessage.textContent = ''; 
}

else if (fieldType === 'url') {
  new Url(input.value);
  errorMessage.textContent = ''; 
}

    } catch (error) {
      errorMessage.textContent = error.message;
    }
  }
}

customElements.define('form-component', FormComponent);
  `;

  navigator.clipboard.writeText(componentCode).then(() => {
    alert("FormComponent code copied successfully!");
  }).catch(err => {
    alert("failed to copy code: " + err);
  });
}



























