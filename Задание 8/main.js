const popup = document.getElementsByClassName("popup")[0];
const infomsg = document.getElementsByClassName("infomsg")[0];
window.addEventListener("DOMContentLoaded", function () {
  const OpenButton = document.getElementsByClassName("openPopup")[0];
  const CloseButton = document.getElementsByClassName("closePopup")[0];
  const InfoButton = document.getElementsByClassName("submit")[0];
  OpenButton.addEventListener("click", function() {
      openPopup();
  });
  addEventListener("popstate", function(event) {
      closePopup();
  });
  CloseButton.addEventListener("click", function() {
      closePopup();
  });
  InfoButton.addEventListener("click", function(event) {
      event.preventDefault();
      submitForm();
  });
});

function openPopup() {
  history.pushState(null, null, '#popup');
  popup.style.display = "block";
}

function closePopup() {
  popup.style.display = "none";
  history.pushState(null, null, '/Users/User/Desktop/index.html');
}

function submitForm() {
  const saveForm = {
      FIO: document.getElementsByName("field-name-1")[0].value,
      Email: document.getElementsByName("field-email")[0].value,
      Number: document.getElementsByName("field-number")[0].value,
      Organization: document.getElementsByName("field-name-3")[0].value,
      Message: document.getElementsByName("field-name-2")[0].value,
      Check: document.getElementsByName("check-1")[0].checked,
  };
  var slapform = new Slapform();
  slapform.submit({
      form: 'ryb0Sgwtn',
      data: saveForm,
  })
      .then(function (response) {
          console.log('Success', response);
          infomsg.innerHTML = 'Выполненно успешно';
          clearForm();
      })
      .catch(function (e) {
          console.error('Fail', e);
          infomsg.innerHTML = 'Не получилось выполнить';
      })
}

function clearForm() {
  const popup = document.getElementsByClassName("popup")[0];
  const popupElems = popup.getElementsByClassName("txt");
  const popupCheckbox = document.getElementsByName("check-1")[0];
  var elem = 0;
  var elemInput;
  console.log(popupElems)
  for (elem; elem < popupElems.length; elem++) {
      if (elem !== 4) {
          elemInput = popupElems[elem];
      } else {
          elemInput = popupElems[elem];
      }
      elemInput.value = "";
  }
  popupCheckbox.checked = false;
}


document.addEventListener('DOMContentLoaded', () => {
    let savedForm = localStorage.getItem('saveForm');
    if (savedForm) {                                 
      savedForm = JSON.parse(savedForm);         
      document.getElementById('subject').value = savedForm.subject; 
      document.getElementById('message').value = savedForm.message; 
      localStorage.removeItem('saveForm');       
    }
  
    window.addEventListener('beforeunload', e => {        
      let subj = document.getElementById('subject').value,
          msg  = document.getElementById('message').value; 
      if (subj.length || msg.length) {             
        let saveForm = {                              
          subject: subj, 
          message: msg
        };
        localStorage.setItem('saveForm', JSON.stringify(saveForm)); 
      }
    }); 
  });