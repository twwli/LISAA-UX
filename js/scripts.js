/* Change colors according to day time */

async function fetchSunTimes(lat, lon) {
    const response = await fetch('https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0&nocache=${noCache}');
    const data = await response.json();
    return {
        sunrise: new Date(data.results.sunrise).getUTCHours(),
        sunset: new Date(data.results.sunset).getUTCHours()
    };
}

async function updateColors(applyTransition = false) {
    const { sunrise, sunset } = await fetchSunTimes(48.8566, 2.3522);

    console.log('Sunrise:', sunrise, 'Sunset:', sunset); // Afficher le lever et le coucher du soleil

    let now = new Date();
    let currentHour = now.getUTCHours();
    let currentMinutes = now.getUTCMinutes();

    console.log('Current hour:', currentHour); // Afficher l'heure actuelle

    let adjustedHour = currentMinutes >= 45 ? currentHour + 1 : currentHour;
    const numberOfSegments = sunset - sunrise;
    const currentSegment = adjustedHour - sunrise;

    console.log('Current segment:', currentSegment); // Afficher le segment actuel

    const colors = [
      "#FBE4EE", /* Segment 0 */
      "#FBE4EE", /* Segment 1 */
      "#FDE7E2", /* Segment 2 */
      "#FDE7E2", /* Segment 3 */
      "#F4F0E5", /* Segment 4 */
      "#F4F0E5", /* Segment 5 */
      "#f8f8f8", /* Segment 6 */
      "#f8f8f8", /* Segment 7 */
      "#FFFFFF", /* Segment 8 */
      "FFFFFF", /* Segment 9 */
      "#FBF2EF", /* Segment 10 */
      "#FBF2EF", /* Segment 11 */
      "#FDE7E2", /* Segment 12 */
      "#FDE7E2", /* Segment 13 */
      "#FBE4EE" /* Segment 14 */
    ];
    
    /* const textColor = [
      "#000", 
      "#222", 
      "#444", 
      "#666", 
      "#888", 
      "#aaa", 
      "#ccc", 
      "#eee", 
      "#fff", 
      "#eee", 
      "#ddd", 
      "#ccc", 
      "#bbb", 
      "#aaa", 
      "#999"
    ]; */


    if (currentSegment >= 0 && currentSegment < colors.length) { // Assurez-vous que currentSegment est dans la plage valide
        document.body.style.backgroundColor = colors[currentSegment];
    } else {
        console.warn('Invalid segment:', currentSegment); // Si currentSegment est hors de portée, afficher un avertissement
    }
    
    /*if (currentSegment >= 0 && currentSegment < textColor.length) {
        document.body.style.color = textColor[currentSegment];
    } else {
        console.warn('Invalid segment:', currentSegment);
    } */
    
    let body = document.body;
    
    if (applyTransition) {
        body.style.transition = "background-color 900s, color 900s";
    }

    if (currentHour < sunrise || currentHour >= sunset) {
        //body.style.color = '#c9c3d1';
        body.style.backgroundColor = '#080014';
        body.classList.add('is-night');
        body.classList.remove('is-day');
    } else {
        //body.style.color = '#FF3C00';
        body.style.backgroundColor = colors[currentSegment];
        body.classList.add('is-day');
        body.classList.remove('is-night');
    }
}

// Mise à jour immédiate des couleurs
updateColors();

// Après la mise à jour initiale, appliquez la transition et définissez l'intervalle pour les mises à jour ultérieures
setTimeout(() => {
    updateColors(true);
    //setInterval(() => updateColors(true), 2700000); // 2700000ms = 45 minutes
    setInterval(() => updateColors(true), 60000); // 600000ms = 10 minutes
}, 100); // Délai de 100ms pour permettre au premier changement de couleur d'être appliqué sans transition










/* Clock */

/* Display Current Time */
let localTime = document.getElementById("local-time")

function displayTime() {
  const currentTime = new Date();
  
  const options = {
    hour: '2-digit', 
    minute: '2-digit'
  };
  
  localTime.innerHTML = currentTime.toLocaleTimeString(undefined, options);
}

displayTime();
setInterval(displayTime, 1000);



/* Slides */

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