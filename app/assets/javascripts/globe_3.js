function initialize() {
    var options = {atmosphere: true, center: [0, 0], zoom: 0};
    var earth = new WE.map('earth_div', options);
    WE.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
      minZoom: 0,
      maxZoom: 5,
      attribution: 'NASA'
    }).addTo(earth);
}

$(document).ready(function() {
    $("#but").on("click", function(event) {  // Select the Button
        event.preventDefault();
        index = $("#form").attr("z-index");
        if (parseInt(index) > 0) {
            $("#form").attr("z-index", "-1");
            $("#form").css("z-index", "-1");
        } else {
            $("#form").attr("z-index", "3");
            $("#form").css("z-index", "3");
        }
        });
        
    $("form").on("submit", function(event) {
        event.preventDefault();
        name = $(this).find("[name=firstname]").val();
        mood = $(this).find("[name=land]").val();
        console.log(name, mood)
    });
    // var pressTimer;
    $("#webgl").on("dblclick", function(event) {  // Select the Button
        event.preventDefault();
        $(".menu").css("left", (event.pageX-72) + "px");
        $(".menu").css("top", (event.pageY-64) + "px");
        index = $(".menu").css("z-index");
        if (parseInt(index) > 0) {
            $(".menu").css("z-index", "-1");
        } else {
            $(".menu").css("z-index", "10");
        }
        // pressTimer = window.setTimeout(function() {console.log("success");}, 1000);
        // console.log("success");
        // index = $("#form").css("z-index");
        // if (parseInt(index) > 0) {
        //     $("#form").css("z-index", "0");
        // } else {
        //     $("#form").css("z-index", "3");
        // }
        });
    // var pressTimer;
    
    // $("a").mouseup(function(){
    //   clearTimeout(pressTimer);
    //   // Clear timeout
    //   return false;
    // }).mousedown(function(){
    //   // Set timeout
    //   pressTimer = window.setTimeout(function() {},1000);
    //   return false; 
    // }); 
    var pointer = document.querySelector('.pointer');
    var maxX = window.innerHeight - pointer.clientWidth;
    var maxY = window.innerWidth - pointer.clientHeight;
    var oldX = maxX / 2;
    var oldY = maxY / 2;
    
    function handleOrientation(event) {
        var x = event.beta;
        var y = event.gamma;
        var newX = (oldX + x / 3); // change denominator to modify speed
        var newY = (oldY + y / 3); //change denominator to modify speed
        
        if (newX < 0) {newX = 0}
        if (newX > maxX) {newX = maxX}
        if (newY < 0) {newY = 0}
        if (newY > maxY) {newY = maxY}
        
        pointer.style.top = newX + "px";
        pointer.style.left = newY + "px";
        
        oldX = newX;
        oldY = newY;
    }
    
    window.addEventListener('deviceorientation', handleOrientation)
});

