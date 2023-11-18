
window.addEventListener("DOMContentLoaded", function () {
    const popupOpenButton = document.getElementsByClassName("openPopup")[0];
    popupOpenButton.addEventListener("click", function() {
        openPopup();
    });
});

function openPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
}
var user_id = $(this).closest("form").attr('id');
function closePopup() {
    document.getElementById("myPopup").style.display = "none";
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