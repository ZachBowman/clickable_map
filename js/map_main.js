// Main Map File
// Reads clickable polygons from a U.S. map and displays a popup div with custom contents, using Handlebars and jQuery.
// Zach Bowman 2014

// enumerated state abbreviations to correspond with array indices
var AL = 0,
    AK = 1,
    AZ = 2,
    AR = 3,
    CA = 4,
    CO = 5,
    CT = 6,
    DC = 7,
    DE = 8,
    FL = 9,
    GA = 10,
    HI = 11,
    ID = 12,
    IL = 13,
    IN = 14,
    IA = 15,
    KS = 16,
    KY = 17,
    LA = 18,
    ME = 19,
    MD = 20,
    MA = 21,
    MI = 22,
    MN = 23,
    MS = 24,
    MO = 25,
    MT = 26,
    NE = 27,
    NV = 28,
    NH = 29,
    NJ = 30,
    NM = 31,
    NY = 32,
    NC = 33,
    ND = 34,
    OH = 35,
    OK = 36,
    OR = 37,
    PA = 38,
    RI = 39,
    SC = 40,
    SD = 41,
    TN = 42,
    TX = 43,
    UT = 44,
    VT = 45,
    VA = 46,
    WA = 47,
    WV = 48,
    WI = 49,
    WY = 50;

var states = state_data();  // initialize an array of 50 states  (from state_data.js)

var welcome_center = true;  // changes to false once the user hovers over a state, popup moves to corner

var active_state = "none";  // holds the two-letter abbreviation for the state currently selected

////////////////////////////////////////////////////////////

$(document).ready (function ()
  {
  // load the handlebars template for the popup window
  var popup_template_script = $("#popup_template").html();
  var popup_template = Handlebars.compile (popup_template_script);
	  
  // display the welcome popup
  $("#welcome_popup").animate ({top: "200px"}, "slow");

  ////////////////////////////////////////////////////////////

  // when a state is clicked, populate the div and fade it in
  $(".state").click (function ()
    {
    if ($("#state_popup").css ("display") === "none")  // only fade in if it's not already showing
      {
      var clicked_state = $(this).attr ("id");  // get the id of the polygon (state) clicked

      active_state = clicked_state.toLowerCase();  // set the active state for the buzzquote link

      // use the id to find the state in the array, and send it's data to the html template
      var html = popup_template (states[eval(clicked_state)]);

      $("#state_popup").html (html);  // insert new html in the popup div

      $("#buzzlink_box").click (function ()  // add a click handler to the green buzzlink square after it's generated
        {
        window.location.href = "/auto?state" + active_state;
        var date = new Date();
        date.setTime (date.getTime() + (30 * 24 * 60 * 60 * 1000));
        var expire_date = date.toGMTString();
        document.cookie = "name=state; cookievalue=state" + active_state + "; expires=" + expire_date + "; path='/'";
        });

      $("#state_popup").fadeIn();
      }
    });

  ////////////////////////////////////////////////////////////

  // for states with multiple highlighted zones, make sure all zones highlight together
  $(".multiple").mouseover (function ()
    {
    var state_class = $(this).attr ("class");
    state_class = "." + state_class.substr (15, 17);
    $(state_class).css ("stroke", "rgb(0, 160, 0)");
    $(state_class).css ("fill", "rgba(128, 255, 128, .3)");
    });

  ////////////////////////////////////////////////////////////

  // turn off multi-zone highlighting
  $(".multiple").mouseout (function ()
    {
    var state_class = $(this).attr ("class");
    state_class = "." + state_class.substr (15, 17);
    $(state_class).css ("stroke", "none");
    $(state_class).css ("fill", "transparent");
    });

  ////////////////////////////////////////////////////////////

  // shrink the welcome div to an empty corner once a state is first hovered over
  $(".state").mouseover (function ()
    {
    if (welcome_center === true)
      {
      welcome_center = false;
      $("#welcome_popup").animate (
        {
        "top": "0px",
        "left": "590px",
        "right": "150px",
        "font-size": "13pt",
        "padding": "7px",
        "boxShadow": "6px 6px 5px rgba(0, 0, 0, .2)"
        }, 800);//"slow");
      }
    });

  ////////////////////////////////////////////////////////////

  // when the popup div is clicked, fade it out
  //$("#state_popup").click (function ()
  //  {
  //  $(this).fadeOut();
  //  });

  ////////////////////////////////////////////////////////////

  // fade out the state popup if the user clicks outside it
  $(document).mousedown (function (e)
    {
    if (!$("#state_popup").is (e.target)                  // if the click isn't on the div
        && $("#state_popup").has (e.target).length === 0) // if the click isn't on a child of the div
      {
      $("#state_popup").fadeOut();
      }
    });

  });
