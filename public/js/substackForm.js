class SubstackForm extends HTMLElement {
  constructor() {
    super();
    this.errorSvg =
      /* html */
      `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2548_35167)">
      <path d="M40.0083 33.0013H38V37.0048H40.0083V33.0013Z" fill="#F5F4F0"/>
      <path d="M37.9991 28.9979H36.0039V33.0014H37.9991V28.9979Z" fill="#F5F4F0"/>
      <path d="M38.0009 37.0048H1.99609V38.9999H38.0009V37.0048Z" fill="#F5F4F0"/>
      <path d="M36.0049 24.9945H34.0098V28.998H36.0049V24.9945Z" fill="#F5F4F0"/>
      <path d="M34.0083 21.0042H32V24.9945H34.0083V21.0042Z" fill="#F5F4F0"/>
      <path d="M32.001 17.0007H30.0059V21.0042H32.001V17.0007Z" fill="#F5F4F0"/>
      <path d="M30.0063 12.9973H27.998V17.0008H30.0063V12.9973Z" fill="#F5F4F0"/>
      <path d="M27.9971 8.99377H26.002V12.9972H27.9971V8.99377Z" fill="#F5F4F0"/>
      <path d="M26.003 5.00342H24.0078V8.99375H26.003V5.00342Z" fill="#F5F4F0"/>
      <path d="M24.0063 2.99524H21.998V5.00353H24.0063V2.99524Z" fill="#F5F4F0"/>
      <path d="M17.9971 33.0014H22.0006V31.0063H24.0089V27.0028H22.0006V24.9945H17.9971V27.0028H16.002V31.0063H17.9971V33.0014Z" fill="#F5F4F0"/>
      <path d="M21.9976 11.0021H17.9941V22.9993H21.9976V11.0021Z" fill="#F5F4F0"/>
      <path d="M21.9976 1H17.9941V2.99516H21.9976V1Z" fill="#F5F4F0"/>
      <path d="M17.9971 2.99524H16.002V5.00353H17.9971V2.99524Z" fill="#F5F4F0"/>
      <path d="M16.001 5.00342H14.0059V8.99375H16.001V5.00342Z" fill="#F5F4F0"/>
      <path d="M14.0063 8.99377H11.998V12.9972H14.0063V8.99377Z" fill="#F5F4F0"/>
      <path d="M11.9971 12.9973H10.002V17.0008H11.9971V12.9973Z" fill="#F5F4F0"/>
      <path d="M10.003 17.0007H8.00781V21.0042H10.003V17.0007Z" fill="#F5F4F0"/>
      <path d="M8.00829 21.0042H6V24.9945H8.00829V21.0042Z" fill="#F5F4F0"/>
      <path d="M5.99907 24.9945H4.00391V28.998H5.99907V24.9945Z" fill="#F5F4F0"/>
      <path d="M4.00438 28.9979H1.99609V33.0014H4.00438V28.9979Z" fill="#F5F4F0"/>
      <path d="M1.99516 33.0013H0V37.0048H1.99516V33.0013Z" fill="#F5F4F0"/>
      </g>
      <defs>
      <clipPath id="clip0_2548_35167">
      <rect width="40" height="40" fill="white"/>
      </clipPath>
      </defs>
      </svg>
`;
    this.emailErrorMessage = "Please enter an email";
    this.processErrorMessage = `Hm, something's not working. Try signing up <a href="https://newsletter.joshwayne.com/">on Substack</a>.`;
    this.successSvg =
      /* html */
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    this.successMessage = ``;
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["domain", "max-width", "button-width", "input", "submit"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    attr === "domain" && (this.domain = newVal);
    attr === "max-width" && (this.width = newVal);
    attr === "button-width" && (this.buttonWidth = newVal);
    attr === "input" && (this.input = newVal);
    attr === "submit" && (this.submit = newVal);
  }

  getStyles() {
    return /* html */ `<style>

    </style>`;
  }

  getTemplate() {
    const template = document.createElement("template");

    template.innerHTML =
			/* html */

			`
      ${this.getStyles()}

      <style>
        @import "/css/index.css";
      </style>
      <form class="form" novalidate>
        <div class="form__inner">
          <div class="input-container">

            <label class="label sr-only" for="substackForm">
              ${this.input}
            </label>

            <input class="input" id="substackForm" type="email" placeholder="Your email" aria-describedby="substackInputError" required />

            <p class="status error" id="substackInputError" data-inline data-form-error></p>

          </div>
          <div class="button-container">
            <button class="submit button button-inverse button-small" type="submit">
              <span>${this.submit}</span>
            </button>
          </div>
        </div>
        <div class="status-container">
          <div role="status" aria-busy="true" class="loader flow" tabindex="-1"></div>
          <div role="status" class="status recursive-stack stack-small" tabindex="-1" data-form-state></div>
        </div>
      </form>`;

    return template;
  }

  render() {
    this.shadowRoot.innerHTML = this.getTemplate().innerHTML;
    this.innerHTML = "";
  }

  connectedCallback() {
    // this.innerHTML = this.getTemplate().content.cloneNode(true);
    this.render();

    // Get newly created form elements
    const form = this.shadowRoot.querySelector("form");
    const email = this.shadowRoot.querySelector("input");
    const loading = this.shadowRoot.querySelector(".loader");
    const error = this.shadowRoot.querySelector("[data-form-error]");
    const announce = this.shadowRoot.querySelector("[data-form-state]");

    // Handle submit events
    async function submitHandler(event) {
      // Stop the form from reloading
      event.preventDefault();

      // Make sure an email address was provided
      if (!email.value) {
        error.innerHTML = `${this.errorSvg} ${this.emailErrorMessage}`;
        error.classList.remove("success");
        error.classList.add("error");
        email.focus();
        return;
      }

      try {
        // Call the API
        announce.innerHTML = "";
        error.innerHTML = "";
        this.inputEmail = email.value;
        loading.innerHTML = `<div class="loading"></div>
        <p><b>Loading...</b></p>`;
        loading.focus();
        let request = await fetch(
          "https://us-central1-substackapi.cloudfunctions.net/subscribe",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.inputEmail,
              domain: this.domain,
            }),
          }
        );

        // Get the response and show the message in the UI
        let response = await request.json();
        loading.innerHTML = "";
        if (this.successMessage) {
          announce.innerHTML = `<p>${this.successSvg} ${this.successMessage}</p>`;
        } else {
          announce.innerHTML = `<p>Sweet. Finish signing up by clicking on the link in the confirmation email sent to <b>${this.inputEmail}</b>.</p><p><a href="#">I typed my email wrong.</a></p>`;
        }
        announce.classList.remove("error");
        announce.classList.add("success");
      } catch (error) {
        // If something went wrong, show the error instead

        loading.hidden = true;
        announce.innerHTML = `<p>${this.errorSvg} ${this.processErrorMessage}</p>`;
        announce.classList.remove("success");
        announce.classList.add("error");
      }
    }

    // Listen for submit events
    form.addEventListener("submit", submitHandler.bind(this));
  }
}

customElements.define("substack-form", SubstackForm);
