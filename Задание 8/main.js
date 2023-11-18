const popup = document.getElementsByClassName("popup")[0];
const infomsg = document.getElementsByClassName("infomsg")[0];
window.addEventListener("DOMContentLoaded", function () {
  const popupOpenButton = document.getElementsByClassName("openPopup")[0];
  const popupCloseButton = document.getElementsByClassName("closePopup")[0];
  const sendInfoButton = document.getElementsByClassName("submit")[0];
  popupOpenButton.addEventListener("click", function() {
      openPopup();
  });
  addEventListener("popstate", function(event) {
      closePopup();
  });
  popupCloseButton.addEventListener("click", function() {
      closePopup();
  });
  sendInfoButton.addEventListener("click", function(event) {
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
  const formData = {
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
      data: formData,
  })
      .then(function (response) {
          console.log('Success', response);
          infomsg.innerHTML = 'Успех';
          clearForm();
      })
      .catch(function (e) {
          console.error('Fail', e);
          infomsg.innerHTML = 'Ошибка';
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
    let savedFormData = localStorage.getItem('formData');
    if (savedFormData) {                                 
      savedFormData = JSON.parse(savedFormData);         
      document.getElementById('subject').value = savedFormData.subject; 
      document.getElementById('message').value = savedFormData.message; 
      localStorage.removeItem('formData');       
    }
  
    window.addEventListener('beforeunload', e => {        
      let subj = document.getElementById('subject').value,
          msg  = document.getElementById('message').value; 
      if (subj.length || msg.length) {             
        let formData = {                              
          subject: subj, 
          message: msg
        };
        localStorage.setItem('formData', JSON.stringify(formData)); 
      }
    }); 
  });