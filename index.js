"use strict";
import RegistrationForm from "./formInterface.mjs";
import { getElement } from "./htmlInterface.mjs";


/* fields: {
  fieldLabel:[
    HTMLInputType:'',
    HTMLInputAttributes:{},
    children:{
      [
        HTMLType: '',
        innerText:'',
        HTMLAttributes:{}
      ],
      ...
    }
  ],
  ...
};
rootId: ValidHTMLId:'';
*/
const fields = {
  'First Name': [
    'input',
    {
      type: 'text',
      placeholder: 'Juan',
      name: 'firstname',
      required: true,
      autocomplete: 'on',
      autofocus: true,
      autocapitalize: 'words'
    },
  ],
  'Last Name': [
    'input',
    {
      type: 'text',
      placeholder: 'Dela Cruz',
      name: 'lastname',
      required: true,
      autocomplete: 'on',
      autocapitalize: 'words'
    }
  ],
  'Birthday': [
    'input',
    {
      type: 'date',
      value: '2002-01-10',
      name: 'birthday',
      required: true,
      max: '2024-01-01',
      autocomplete: 'off'
    }
  ],
  'Gender': [
    'select',
    {
      name: 'gender',
      required: true,
    },
    [
      [
        'option',
        'Other',
        {
          value: 'other',
          selected: true
        }
      ],
      [
        'option',
        'Female',
        { value: 'female' }
      ],
      [
        'option',
        'Male',
        { value: 'Male' }
      ]
    ]
  ],
  'Email': [
    'input',
    {
      type: 'email',
      name: 'email',
      placeholder: 'juan.delacruz@gmail.com',
      required: true,
      autocomplete: 'on',
      pattern: '[A-Za-z0-9\\._%+\\-]+@[A-Za-z0-9\\.\\-]+\\.[A-Za-z]{2,}'
    }
  ],
  'Password': [
    'input',
    {
      type: 'password',
      name: 'password',
      required: true,
      autocomplete: 'on',
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.#$!%*?&^])[A-Za-z\\d@.#$!%*?&]{8,15}$'
    }
  ],
  'Confirm Password': [
    'input',
    {
      type: 'password',
      required: true,
      autocomplete: 'on',
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.#$!%*?&^])[A-Za-z\\d@.#$!%*?&]{8,15}$'
    }
  ],
};

const HTMLForm = getElement('#form_body');

const form = new RegistrationForm(HTMLForm, fields);

/** TODO
 * Add form validation for inputs with only spaces in them
 * Add constraints on the first name and last name inputs
 * Add form validation info about the required formats
 */
