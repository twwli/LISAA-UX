$(document).ready(function() {

var accordion = $('.accordion');

accordion.mouseenter(function(){
  $(this).addClass('active-acc');
  accordion.not(this).addClass('not-acc');
  $('header, footer').addClass('not-acc');
}).mouseleave(function(){
   $(this).removeClass('active-acc');
   accordion.not(this).removeClass('not-acc');
   $('header, footer').removeClass('not-acc');
});

var sectionTrigger = $('.section-trigger');

sectionTrigger.on('click', function(event){
	event.preventDefault();
	$(this).next('.section-content').slideToggle(400).end().parent('.block').toggleClass('content-visible');
  sectionTrigger.not(this).next('.section-content').slideUp(400);
  
	$(this).toggleClass('is-active');
  $('.block').not(this).removeClass('content-visible');
  sectionTrigger.not(this).removeClass('is-active');
});


}); /* End Document Ready */