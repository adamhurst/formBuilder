import '../sass/demo.scss'
import { insertStyle, removeStyle } from '../../js/utils'
import { builderActions, renderActions, demoActions } from './actionButtons'

const localeSessionKey = 'formBuilder-locale'
const defaultLocale = 'en-US'

const dataTypes = document.querySelectorAll('.demo-dataType')
const dataType = window.sessionStorage.getItem('dataType') || 'json'
const changeDataType = ({ target }) => {
  window.sessionStorage.setItem('dataType', target.value)
  demoActions.resetDemo()
}
for (let i = 0; i < dataTypes.length; i++) {
  if (dataType === dataTypes[i].value) {
    dataTypes[i].checked = true
  }
  dataTypes[i].addEventListener('click', changeDataType, false)
}

const toggleBootStrap = ({ target }) => {
  if (!target.checked) {
    removeStyle('bootstrap')
  } else {
    insertStyle({
      src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
      id: 'bootstrap',
    })
  }
}

document.getElementById('toggleBootstrap').addEventListener('click', toggleBootStrap, false)

jQuery(function($) {
  const fields = [
    // {
    //   type: 'autocomplete',
    //   label: 'Custom Autocomplete',
    //   required: true,
    //   values: [
    //     { label: 'SQL' },
    //     { label: 'C#' },
    //     { label: 'JavaScript' },
    //     { label: 'Java' },
    //     { label: 'Python' },
    //     { label: 'C++' },
    //     { label: 'PHP' },
    //     { label: 'Swift' },
    //     { label: 'Ruby' },
    //   ],
    // },
    {
      label: 'Risk Range',
      type: 'riskRange',
      icon: '📟',
    },
    {
      label: 'BMI Calculation',
      optionType: 'riskScore',
      attrs: {
        type: 'bmiCalculation',
      },
      icon: '📟',
    },
    {
      label: 'MUST Calculation',
      attrs: {
        type: 'mustCalculation',
      },
      icon: '📟',
    },
    {
      label: 'Risk Calculation',
      optionType: 'riskScore',
      attrs: {
        type: 'riskCalculation',
      },
      icon: '📟',
    },
    {
      label: 'Suggested Actions',
      optionType: 'string',
      attrs: {
        type: 'suggestedActions',
      },
      icon: '📝'
    }
  ]

  const replaceFields = [
    // {
    //   type: 'textarea',
    //   subtype: 'tinymce',
    //   datatype: 'custom-tinymce',
    //   label: 'tinyMCE',
    //   // test: 'rerere',
    //   required: true,
    // },
  ]

  const actionButtons = [
    {
      id: 'smile',
      className: 'btn btn-success',
      label: '😁',
      type: 'button',
      events: {
        click: () => {
          // @todo toggle options editor instead
          alert('😁😁😁 !SMILE! 😁😁😁')
        },
      },
    },
    'save',
  ]

  const templates = {
    riskRange: function(fieldData) {
      return {
        field: '<span id="' + fieldData.name + '">',
        onRender: () => {
          $(document.getElementById(fieldData.name)).append('na | low | medium | high | severe')
        },
      }
    },
    bmiCalculation: function(fieldData) {
      return {
        field: '<span id="' + fieldData.name + '">',
        onRender: () => {
          $(document.getElementById(fieldData.name)).append('Weight / Height^2')
        },
      }
    },
    mustCalculation: function (fieldData) {
      return {
        field: '<span id="' + fieldData.name + '">',
        onRender: () => {
          $(document.getElementById(fieldData.name)).append('MUST Calculation - this field has pre-defined risk values')
        },
      }
    },
    suggestedActions: function (fieldData) {
      return {
        field: '<span id="' + fieldData.name + '">',
        onRender: () => {
          $(document.getElementById(fieldData.name)).append('When a user chooses a specific option')
        },
      }
    },
    riskCalculation: function(fieldData) {
      return {
        field: '<span id="' + fieldData.name + '">',
        onRender: () => {
          $(document.getElementById(fieldData.name)).append('Likelihood x Severity = Outcome')
        },
      }
    },
  }

  const inputSets = [
    {
      label: 'User Details',
      icon: '👨',
      name: 'user-details', // optional
      showHeader: true, // optional
      fields: [
        {
          type: 'text',
          label: 'First Name',
          className: 'form-control',
        },
        {
          type: 'select',
          label: 'Profession',
          className: 'form-control',
          values: [
            {
              label: 'Street Sweeper',
              value: 'option-2',
              selected: false,
            },
            {
              label: 'Brain Surgeon',
              value: 'option-3',
              selected: false,
            },
          ],
        },
        {
          type: 'textarea',
          label: 'Short Bio:',
          className: 'form-control',
        },
      ],
    },
    {
      label: 'User Agreement',
      fields: [
        {
          type: 'header',
          subtype: 'h3',
          label: 'Terms & Conditions',
          className: 'header',
        },
        {
          type: 'paragraph',
          label:
            'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.',
        },
        {
          type: 'paragraph',
          label:
            'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.',
        },
        {
          type: 'checkbox',
          label: 'Do you agree to the terms and conditions?',
        },
      ],
    },
  ]

  const typeUserDisabledAttrs = {
    autocomplete: ['access'],
  }

  const typeUserAttrs = {
    text: {
      shape: {
        label: 'Class',
        multiple: true,
        options: {
          'red form-control': 'Red',
          'green form-control': 'Green',
          'blue form-control': 'Blue',
        },
        style: 'border: 1px solid red',
      },
      readonly: {
        label: 'readonly',
        value: false,
      },
    },
    number: {
      volume: {
        label: 'Volume Level',
        value: 1,
        max: 11,
      },
    },
  }

  // test disabledAttrs
  const disabledAttrs = ['access', 'name', 'value', 'inline', 'toggle', 'other']

  const fbOptions = {
    disabledSubtypes: {
      text: ['password'],
    },
    // disableHTMLLabels: true,
    disabledAttrs,
    // allowStageSort: false,
    // dataType,
    // subtypes: {
    //   text: ['datetime-local'],
    // },
    formType: 'preAssessment',
    onSave: toggleEdit,
    onAddField: fieldId => {
      document.getElementById('currentFieldId').value = fieldId
    },
    onClearAll: () => window.sessionStorage.removeItem('formData'),
    stickyControls: {
      enable: true,
    },
    sortableControls: true,
    fields: fields,
    templates: templates,
    // inputSets: inputSets,
    typeUserDisabledAttrs: typeUserDisabledAttrs,
    // typeUserAttrs: typeUserAttrs,
    disableInjectedStyle: false,
    actionButtons: actionButtons,
    disableFields: ['autocomplete', 'number', 'date', 'button', 'hidden', 'file', 'paragraph'],
    // replaceFields: replaceFields,
    disabledFieldButtons: {
    },
    controlPosition: 'right', // left|right,
    i18n: {
      override: {
        [defaultLocale]: {
          key: 'Field ID',
          riskLabel: 'Risk Label',
          rangeLow: 'Lower Threshold',
          rangeHigh: 'Higher Threshold',
          optionType: 'Option Value Type',
          dependsOnKey: 'Depends on Field ID',
          dependsOnValue: 'Depends on value',
          suggestedActions: 'Suggested Actions',
          outputQuestion: 'Output Question Format'
        },
      },
    },
  }
  const formData = window.sessionStorage.getItem('formData')
  let editing = true

  if (formData) {
    fbOptions.formData = formData
  }

  /**
   * Toggles the edit mode for the demo
   * @return {Boolean} editMode
   */
  function toggleEdit() {
    document.body.classList.toggle('form-rendered', editing)
    if (!editing) {
      $('.build-wrap').formBuilder('setData', $('.render-wrap').formRender('userData'))
    } else {
      const formRenderData = $('.build-wrap').formBuilder('getData', dataType)
      $('.render-wrap').formRender({
        formData: formRenderData,
        // templates: templates,
        dataType,
      })
      window.sessionStorage.setItem('formData', formRenderData)
    }
    return (editing = !editing)
  }

  const formBuilder = $('.build-wrap').formBuilder(fbOptions)

  const fbPromise = formBuilder.promise

  fbPromise.then(function(fb) {
    const apiBtns = {
      ...builderActions,
      ...renderActions,
      ...demoActions,
    }

    Object.keys(apiBtns).forEach(function(action) {
      document.getElementById(action).addEventListener('click', function(e) {
        apiBtns[action]()
      })
    })

    document.querySelectorAll('.editForm').forEach(element => element.addEventListener('click', toggleEdit), false)
    const langSelect = document.getElementById('setLanguage')
    const savedLocale = window.sessionStorage.getItem(localeSessionKey)

    if (savedLocale && savedLocale !== defaultLocale) {
      langSelect.value = savedLocale
      fb.actions.setLang(savedLocale)
    }

    langSelect.addEventListener(
      'change',
      ({ target: { value: lang } }) => {
        window.sessionStorage.setItem(localeSessionKey, lang)
        fb.actions.setLang(lang)
      },
      false,
    )
  })
})
