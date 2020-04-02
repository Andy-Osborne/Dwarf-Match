$(document).ready(function() {
    
   var modal = document.getElementById("tutorial");
   var btns = document.querySelectorAll(".tutorial-btn");
   var close = document.getElementsByClassName("modal-close")[0];


   [].forEach.call(btns, function(el) {
    el.onclick = function() {
        modal.style.display="block";
    }
})

   close.onclick = function() {
       modal.style.display = "none";
   }

   window.onclick = function(event) {
       if (event.target == modal) {
           modal.style.display = "none";
       }
   }


});