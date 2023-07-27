import { formatCapitalize } from "../../utils/formatData.js";

/**
 * Build the email header with title and greeting
 * @param {string} emailTitle - Email title
 * @param {string} receiver - The receiver name
 * @returns {string} HTML Code for email Header
 */
const buildEmailHeader = (emailTitle, receiver) => {
  return `
    <h1 style="text-align: center; color: #00a86b">
      <b> ${emailTitle.toUpperCase()} </b>
    </h1>
    <p> Hi ${formatCapitalize(receiver)},</p>
  `;
};

/**
 * Build the greeting and introduction/purpose
 * @param {string} content - Email title
 * @returns {string} HTML Code for email Header
 */
const buildEmailDetail = (content) => {
  return `
    <p>${content}</p>
  `;
};

/**
 * Build the closing of email
 * @param {string} sender - The sender name, sign, etc.
 * @returns {string} The HTML code for closing the email
 */
const buildEmailClosing = () => {
  const emailClosingTemplate = `
    <div> Thank you for using our service! </div>
    <br> Best regards,</br>
    <br> The Atlana shop team </br>
  `;

  return emailClosingTemplate;
};

/**
 * HTML code to for render a verifyButton
 * @param {string} endpoint - The url that browser navigate to when submit
 * @param {string} buttonTitle - The title of button
 * @returns {string} The string includes HTML code for rendering a button
 */
const buildButton = (endpoint, buttonTitle) => {
  let buttonHTML = `
    <div style="text-align: center;">
      <a href="${endpoint}" 
        style="display: block; width: 250px; height: 50px; font-size: 16px;
        background-color: #00a86b; color: #fff; font-weight: 500;
        text-align: center; margin: 10px 0; line-height: 50px;
        text-decoration: none; border-radius: 10px;"
       >
          ${buttonTitle}
      </a>
    </div>
  `;

  return buttonHTML;
};

/**
 * Get the complete email
 * @param {string} emailTitle - The title of email
 * @param {string} receiver - The receiver's name
 * @param {string} content - Main content
 * @param {string} endpoint - The endpoint for submitting
 * @param {string} btnTitle - The button title
 * @returns {string} Completed email
 */
const getVerifyEmail = (emailTitle, receiver, content, endpoint, btnTitle) => {
  let header = buildEmailHeader(emailTitle, receiver);
  let details = buildEmailDetail(content);
  let verifyButton = buildButton(endpoint, btnTitle);
  let closing = buildEmailClosing();

  const completeMail = `
    ${header}
    ${details}
    ${verifyButton}
    ${closing}
  `;

  return completeMail;
};

export default { getVerifyEmail: getVerifyEmail };
