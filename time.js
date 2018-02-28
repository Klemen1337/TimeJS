var TimeJS = {
    names: ["hour1","hour0","blink1","minute1","minute0","blink0","second1","second0"],
    divs: {},
    height: 0,
    width: 0,

    init: function (divName){
      var time = document.getElementById(divName);
    
      TimeJS.setup();
      setInterval(TimeJS.setTime, 1000);
    },

    setup: function(){
      // Append numbers
      function appendItems(rootDiv, amount){
        var innerDiv = document.createElement("div");
        innerDiv.className = "inner";
        rootDiv.appendChild(innerDiv);
        for(var i=0; i<amount; i++){
          var div = document.createElement("div");
          div.innerHTML = i;
          div.className = i;
          innerDiv.appendChild(div);
        }
      }
      
      // Append hours, minutes and seconds
      for(i=0; i<TimeJS.names.length; i++){
        var div = document.createElement("div");
        div.id = TimeJS.names[i];
        if(TimeJS.names[i] == "blink1" || TimeJS.names[i] == "blink0") div.innerHTML = "<div class='inner'>:</div>";
        else appendItems(div, 10);
        time.appendChild(div);
        TimeJS.divs[TimeJS.names[i]] = document.getElementById(TimeJS.names[i]);
      };

      TimeJS.setHeightAndWeight();
    },


    setHeightAndWeight: function(){
      // Set height and widht of the number
      TimeJS.divs.second0.getElementsByClassName("inner")[0].style.width = null;
      TimeJS.divs.second0.getElementsByClassName("inner")[0].style.height = null;
      TimeJS.divs.second0.style.width = null;
      TimeJS.divs.second0.style.height = null;
      var sizediv = TimeJS.divs.second0.getElementsByClassName("inner")[0].getElementsByTagName("div")[0];
      height = sizediv.offsetHeight;
      width = sizediv.offsetWidth;

      for (var key in TimeJS.divs) {
        TimeJS.divs[key].getElementsByClassName("inner")[0].style.height = height + "px";
        TimeJS.divs[key].getElementsByClassName("inner")[0].style.width = width + "px";
        TimeJS.divs[key].style.height = height + "px";
        TimeJS.divs[key].style.width = width + "px";
        if(key == "blink1" || key == "blink0") {
          TimeJS.divs[key].getElementsByClassName("inner")[0].style.width = width/2 + "px";
          TimeJS.divs[key].style.width = width/2 + "px";
        }
      }

      TimeJS.setTime();
    },
    

    setTime: function(){
      /*if(blink0.className == "blink"){
        blink0.className = "";
        blink1.className = "";
      } else {
        blink0.className = "blink";
        blink1.className = "blink";
      }*/

      var date = new Date();
      var second_0 = date.getSeconds()%10;
      var second_1 = parseInt(date.getSeconds()/10);
      var minute_0 = date.getMinutes()%10;
      var minute_1 = parseInt(date.getMinutes()/10);
      var hour_0 = date.getHours()%10;
      var hour_1 = parseInt(date.getHours()/10);

      TimeJS.divs.second0.getElementsByClassName("inner")[0].style.transform = "translateY(-" + second_0*height + "px)";
      TimeJS.divs.second1.getElementsByClassName("inner")[0].style.transform = "translateY(-" + second_1*height + "px)";
      
      TimeJS.divs.minute0.getElementsByClassName("inner")[0].style.transform = "translateY(-" + minute_0*height + "px)";
      TimeJS.divs.minute1.getElementsByClassName("inner")[0].style.transform = "translateY(-" + minute_1*height + "px)";
      
      TimeJS.divs.hour0.getElementsByClassName("inner")[0].style.transform = "translateY(-" + hour_0*height + "px)";
      TimeJS.divs.hour1.getElementsByClassName("inner")[0].style.transform = "translateY(-" + hour_1*height + "px)";
    }
    
    /*window.onresize = function(event) {
      console.log("RESIZE");
      setHeightAndWeight();
    };*/
};