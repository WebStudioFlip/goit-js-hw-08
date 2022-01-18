import '../sass/main.scss';
import throttle from 'lodash.throttle';
import localMemory from './localStorage';

let valuesFeedbackForm = {};
const feedbackFormEl = document.querySelector('.feedback-form');

const getValuesFeedbackForm = function () {
  if (localMemory.load('feedback-form-state')) {
    valuesFeedbackForm = localMemory.load('feedback-form-state');
    const fieldsOfFeedbackForm = feedbackFormEl.querySelectorAll('label');
    for (let index = 0; index < fieldsOfFeedbackForm.length; index++) {
      const elementOfFeedbackForm = fieldsOfFeedbackForm[index].children[0];
      if (elementOfFeedbackForm.name in valuesFeedbackForm) {
        elementOfFeedbackForm.value = valuesFeedbackForm[elementOfFeedbackForm.name];
      } else {
        fieldsOfFeedbackForm[index].reset;
      }
    }
  }
  return valuesFeedbackForm;
};

getValuesFeedbackForm();

const onFeedbackFormInput = function (event) {  
  
  if (event.target.value.length >0) {
    valuesFeedbackForm[event.target.name] = event.target.value;
  } else {delete valuesFeedbackForm[event.target.name]
  }  
  localMemory.save('feedback-form-state', valuesFeedbackForm);
};

const onSubmitFeedbackForm = event => {  
  event.preventDefault();    
  
  if (("email" in valuesFeedbackForm) && ("message" in valuesFeedbackForm) && event.currentTarget.checkValidity()) {
    console.log(valuesFeedbackForm) 
    localMemory.remove('feedback-form-state');
    event.target.reset();  
    valuesFeedbackForm={}
  }  
};

feedbackFormEl.addEventListener('input', throttle(onFeedbackFormInput, 500));

feedbackFormEl.addEventListener('submit', onSubmitFeedbackForm);
