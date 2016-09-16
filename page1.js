window.onload = function() {
var btnclose = chrome.extension.getURL("btn-close.png");

var btnsetting = chrome.extension.getURL("btn-setting.png");

var bin = '<div id="wikifire_popup_main_div"><div id="wikifire_popup_contact"><form id="wikifire_form" action="#" method="post" id="form" ><img src="'+btnsetting+'" id="wikifire_img_setting" /><img src="'+btnclose+'" id="wikifire_img_close" /><div id="wikifire_fontsetting"><h3 class="wikifire_h3">Color: </h3><select class="wikifire_select" id="font_color"><option class="red" value="red"></option><option class="yellow" value="yellow" ></option><option class="blue" value="blue"></option></select><h3 class="wikifire_h3">Size: </h3><select class="wikifire_select" id="font_size"><option class="7px" value="10px">7 px</option><option class="8px" value="20px">8 px</option><option class="9px" value="30px">9 px</option><option class="10px" value="40px">10 px</option></select><h3 class="wikifire_h3">Family: </h3><select class="wikifire_select" id="font_family"><option value="Georgia">Georgia</option><option value="Arial">Arial</option><option value="Segoe UI">Segoe UI</option><option class="Times New Roman">Times New Roman</option></select></div><h1 class="wikifire_h1" id="wikifire_searched_word">Contact Us</h1><hr class="wikifire_hr"/><p id="replaceText"><span class="wikifire_span">Note : In this demo, we have stopped email sending functionality.</p></form></div></div>';


    $(document).ready(function() {
        tmpText = '';
        temp2 = 0;
        console.log("document ready");
//        var html = "<div id='aspire-content' style='display:none'></div>";
        $('body').append(bin);



  /*-------------setting part--------------------*/
        $( "#font_color" ).change(function() {
          var value1 = this.value;
          console.log(value1);  
          if(value1 == "red"){$("#replaceText").css({"color":"red"});}
          if(value1 == "green"){$("#replaceText").css({"color":"green"});}
          if(value1=="yellow"){$("#replaceText").css({"color":"yellow"});}
          if(value1 == "blue"){$("#replaceText").css({"color":"blue"});}
          
    });
        $( "#font_family" ).change(function() {
          var value1 = this.value;
          console.log(value1);  
          if(value1 == "Times New Roman"){$("#replaceText").css({"font-family":"Times New Roman"});}
          if(value1 == "Georgia"){$("#replaceText").css({"font-family":"Georgia"});}
          if(value1=="Serif"){$("#replaceText").css({"font-family":"Serif"});}
          if(value1 == "Segoe UI"){$("#replaceText").css({"font-family":"Segoe UI"});}
          if(value1 == "Arial"){$("#replaceText").css({"font-family":"Arial"});}
          
    });




      $( "#font_size" ).change(function() {
          var value1 = this.value;

          console.log(value1);  
          if(value1 == "10px"){$("#replaceText").css({"font-size":"10px"});}
          if(value1 == "20px"){$("#replaceText").css({"font-size":"20px"});}
          if(value1=="30px"){$("#replaceText").css({"font-size":"30px"});}
          if(value1=="40px"){$("#replaceText").css({"font-size":"40px"});}
           });


            $("#wikifire_img_close").click(function(){    
                    tmpText = "";       
                 document.getElementById('wikifire_popup_main_div').style.display = "none";                

            });

            $("#wikifire_img_setting").click(function(){ 

                   if (temp2 == 0) {
                   document.getElementById('wikifire_fontsetting').style.display = "block";
                   temp2 = 1;
                    }
                    else{
                        temp2 = 0;
                        document.getElementById('wikifire_fontsetting').style.display = "none";
                    }
                                 
            });

            /*---------------------setting part ends-----------------*/


                $(document).bind('mouseup', function(evt)
                {
                    if (window.getSelection)
                    {
                        tmpText = window.getSelection();
                    }
                    else if (document.getSelection)
                    {
                        tmpText = document.getSelection();
                    }
                    else if (document.selection)
                    {
                        tmpText = document.selection.createRange().text;
                    }
                    var temp = ""+tmpText;
                    var temp3 = $("#wikifire_searched_word").text();
                  //  console.log("temp3-->"+temp3 +"tmpText-->"+ tmpText);
                    if(temp3 == tmpText || tmpText == ""){
                            if ( tmpText == ""){
                            }
                            else{
                                 $("#wikifire_searched_word").replaceWith( '<h1 class="wikifire_h1" id="wikifire_searched_word">'+temp3+'</h1>' );
                                 console.log("Contact sted"+ temp3);
                            }
                        }
                    else{
                         
              $.ajax({
              url: "https://en.wikipedia.org/w/api.php",
              type: "GET",
              data:"format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + tmpText,
                  success: function(data)
                      {
                        console.log(JSON.stringify(data.query.pages));
                        var json_string = JSON.stringify(data.query.pages);
                        var parts = json_string.split("extract");
                        var answer = parts[1].substring(3, (parts[1].length) - 3);
                            document.getElementById('replaceText').innerHTML = answer;
                        if (answer !== undefined)
                        {
                            document.getElementById('wikifire_popup_main_div').style.display = "block";
                            console.log("------"+temp);
                            $("#wikifire_searched_word").replaceWith( '<h1 class="wikifire_h1" id="wikifire_searched_word">'+temp+'</h1>' );
                    //        console.log("teemp text sated " + tmpText)
                        }

                    }
             });
        }

    });

});

};