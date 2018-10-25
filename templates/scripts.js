$(function(){
    $("#header").load("./templates/header.html"); 
    //$("#footer").load("footer.html"); 
  });
  function classToggle() {
    document.querySelectorAll('.navbar-items').forEach(nav => nav.classList.toggle('navbar-toggleshow'));
  }
  // document.querySelector('navbar-toggle')
  // .addEventListener('click', classToggle);

