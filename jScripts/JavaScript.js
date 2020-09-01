

var totalSeconds;
var playTimer;


//createCookie("GivhaMivtar", "0", 1);
//createCookie("TelElFool", "0", 1);
//createCookie("BeitIchsa", "0", 1);
//createCookie("NeviSamuel", "0", 1);
//createCookie("Bido", "0", 1);
//createCookie("GivhaHaradar", "0", 1);

function addPageCounter(num, station) {
    createCookie(station, num, 1)
}

function checkState(station, stationNum, qnum) {

  
        switch (readCookie(station)) {
            //case "0":
            //    // הישאר בדף הנוכחי
            //    break;
            case "1":
                // עבור לשאלה הבאה
                if (stationNum == "1") {
                    transferto('1.2trivia.html')
                }
                else if (stationNum == "2") {
                    transferto('2.1sort.html')
                }
                else if (stationNum == "3") {
                    transferto('‏‏3.1‏‏trivia.html')

                } else if (stationNum == "4") {
                    transferto('4.1‏‏sort')
                } else if (stationNum == "5") {
                    transferto('5.1sort.html')
                } else if (stationNum == "6") {
                    transferto('‏‏6.1sort.html')
                }

                break;
            case "2":
                // עבור לשתי שאלות קדימה
                if (stationNum == "1") {
                    transferto('‏‏1.3puzzle.html')
                }
                else if (stationNum == "2") {
                    transferto('‏2.3‏puzzle.html')
                }
                else if (stationNum == "3") {
                    transferto('‏3.3‏sort.html')

                } else if (stationNum == "4") {
                    transferto('4.3‏‏puzzle.html')
                } else if (stationNum == "5") {
                    transferto('5.3puzzle.html')
                } else if (stationNum == "6") {
                    transferto('6.3puzzle.html')
                }
                break;
            case "3":
                // עבור לשלוש שלאות קדימה (השאלה האחרונה
                if (stationNum == "1") {
                    transferto('‏1.4trivia.html')
                }
                else if (stationNum == "2") {
                    transferto('2.4‏‏‏‏complete.html')
                }
                else if (stationNum == "3") {
                    transferto('3.4‏‏complete.html')

                } else if (stationNum == "4") {
                    transferto('‏‏4.4trivia.html')
                } else if (stationNum == "5") {
                    transferto('5.4‏‏‏‏‏‏‏‏‏‏complete.html')
                } else if (stationNum == "6") {
                    transferto('‏‏6.4‏‏‏‏‏‏‏‏‏‏complete.html')
                }
                break;
            case "done":
                //סיימת את כל השאלות - חזור למפה
                //נראה לא נחוץ המקרה הזה
                transferto('Map.html')
                // code block
                break;
            default:
            // code block
        }
 
}


//switch (readCookie("")) {
//    case "0":
//        // הישאר בדף הנוכחי
//        break;
//    case "1":
//        // עבור לשאלה הבאה
//        break;
//    case "2":
//        // עבור לשתי שאלות קדימה
//        break;
//    case "3":
//        // עבור לשלוש שלאות קדימה (השאלה האחרונה
//        break;
//    case "4":
//        //סיימת את כל השאלות - חזור למפה
//        //נראה לא נחוץ המקרה הזה
//        createCookie("", "done", 1);
//        // code block
//        break;
//    default:
//    // code block
//}

//firstTimeGameStart();

//חשובבבבבבבבבבבבבב
//startTimer();


////document.getElementById("goldScore").innerHTML
//document.getElementById("silverScore").innerHTML
//document.getElementById("bronzeScore").innerHTML

function startTimer() {

    playTimer = setInterval(setTime, 1000);
}

//timer 
function setTime() {


    getData();


    document.getElementById("seconds").innerHTML = pad(totalSeconds % 60);
    document.getElementById("minutes").innerHTML = pad(parseInt(totalSeconds / 60));
    if (totalSeconds == undefined) {
        totalSeconds = 0;
    } else {

        setData();
    }
}
function getData() {


    //קריאה להנדלר לדלות מידע על פרטי השחקן


    $.get("GetPdataHandler.ashx", {
        //get parameters
        myName: readCookie("playerName"),
    })
        .done(function (data) {
            
            //get success
            obj = JSON.parse(data);
            //console.log(data);
            totalSeconds = obj.playerData[0].TimeInSec + 1;
            document.getElementById("goldScore").innerHTML = obj.playerData[0].Pgold;
            document.getElementById("silverScore").innerHTML = obj.playerData[0].Psilver;
            document.getElementById("bronzeScore").innerHTML = obj.playerData[0].Pbronze;
            console.log("getData - done")
            setData();
        })
        .fail(function () {
            //get fail
            totalSeconds = 0;
        })


    //$.get("GetPdataHandler.ashx", {
    //    myName: readCookie("playerName")//sent players table
    //},
    //    function (data, status) {

    //        if (status == "success") {
    //            obj = JSON.parse(data);
    //            totalSeconds = obj.playerData[0].TimeInSec + 1;
    //            document.getElementById("goldScore").innerHTML = obj.playerData[0].Pgold;
    //            document.getElementById("silverScore").innerHTML = obj.playerData[0].Psilver;
    //            document.getElementById("bronzeScore").innerHTML = obj.playerData[0].Pbronze;
    //            setData();

    //        }
    //        else {
    //            totalSeconds = 0;
    //        }
    //    });


}

function setData() {
    //קריאה להנדלר לעדכן מידע על פרטי השחקן

    $.get("setHandler.ashx", {
        //get parameters
        myName: readCookie("playerName")
        , myMin: pad(parseInt(totalSeconds / 60))
        , mySec: pad(totalSeconds % 60)
        , myGold: document.getElementById("goldScore").innerHTML
        , mySilver: document.getElementById("silverScore").innerHTML
        , myBronze: document.getElementById("bronzeScore").innerHTML
        , allSec: totalSeconds
    })
        .done(function (data) {
            //get success   
            console.log(data);
        })
        .fail(function () {
            //get fail
        })



    //$.get("setHandler.ashx", {
    //    myName: readCookie("playerName")//sent players table
    //    , myMin: pad(parseInt(totalSeconds / 60))
    //    , mySec: pad(totalSeconds % 60)
    //    , myGold: document.getElementById("goldScore").innerHTML
    //    , mySilver: document.getElementById("silverScore").innerHTML
    //    , myBronze: document.getElementById("bronzeScore").innerHTML
    //},
    //    function (data, status) {

    //        if (status == "success") {

    //            //printing  the response in the console
    //            //console.log(data);

    //        }
    //    });

}


function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
}

function startTheGameBtn() {

    window.location.href = "map.html";
    //setInterval(setTime(), 1000);
};

function firstTimeGameStart() {
    //createCookie("goldCookie", "0", 1);
    //createCookie("silverCookie", "0", 1);
    //createCookie("bronzeCookie", "0", 1);
}


function HowToPlayOn() {
    document.getElementById("howToPlay").style.display = "block";
}

function HowToPlayOff() {
    document.getElementById("howToPlay").style.display = "none";
}

function aboutOn() {
    document.getElementById("about").style.display = "block";
}

function aboutOff() {
    document.getElementById("about").style.display = "none";
}




function transferto(location) {
    console.log('happenng');
    //setData();

    window.location.href = location;
    //createCookie("timer", totalSeconds, 1);


}



function transferToGender() {

    window.location.href = "chooseGender.htm";
};
function transferToMAvatar() {

    window.location.href = "mAvatarDesign.html";

};
function transferToFAvatar() {

    window.location.href = "fAvatarDesign.html";
};



function restrict_length(e, max) {
    if (e.value.length > max) { e.value = e.value.slice(0, max); }
}

function setFilterF() {
    document.getElementById('maleImg').style.filter = "grayscale(100%)";
    document.getElementById('femaleImg').style.filter = "grayscale(0%)";
    document.getElementById('Fbtn').style.visibility = "visible";
    document.getElementById('Mbtn').style.visibility = "hidden";
    document.getElementById('fGender').style.fontWeight = "bold"
    document.getElementById('mGender').style.fontWeight = "normal"

};
function setFilterM() {

    document.getElementById('femaleImg').style.filter = "grayscale(100%)";
    document.getElementById('maleImg').style.filter = "grayscale(0%)";
    document.getElementById('Fbtn').style.visibility = "hidden";
    document.getElementById('Mbtn').style.visibility = "visible";
    document.getElementById('fGender').style.fontWeight = "normal"
    document.getElementById('mGender').style.fontWeight = "bold"
};



function mclick(e) {

    for (i = 1; i < 10; i++) {
        //var myChild = document.getElementById("img" + i);
        //var myDiv = document.getElementById("m" + i);
        //if (myChild != null) {
            document.getElementById(i).style.backgroundColor = "transparent ";
            //myDiv.removeChild(myChild);
            
        //}
    }
    var myId = e.target.id;
    //var img = document.createElement("img");
    //img.src = "images/CheckMark.png";
    //img.className = "c-chekmark";
    //img.id = "img" + myId;
    //var src = document.getElementById("m" + myId);
    //src.appendChild(img);
    document.getElementById(myId).style.backgroundColor = "var(--main-green)";

    document.getElementById("chosenAvatarImg").src = "images/male/2x/" + myId + ".png";
    var avatarImgSrc = "/images/male/1x/asset " + myId + ".png";


    createCookie("avatarImg", avatarImgSrc, 1);

    //call to handler

    $.get("setImageHandler.ashx", {
        //get parameters
        myName: readCookie("playerName")//sent player name
        , myPic: avatarImgSrc
    })
        .done(function (data) {
            //get success
            console.log(data);
        })
        .fail(function () {
            //get fail
        })



    $.get("‏‏setImageHandler.ashx", {
        myName: readCookie("playerName")//sent player name
        , myPic: avatarImgSrc
    },
        function (data, status) {

            if (status == "success") {

                //printing  the response in the console
                console.log(data);
            }
        });


    document.getElementById("finishAvatar").style.display = "block";
}

function fclick(e) {

    for (i = 1; i < 10; i++) {
        //var myChild = document.getElementById("img" + i);
        //var myDiv = document.getElementById("f" + i);

        //if (myChild != null) {
            document.getElementById(i).style.backgroundColor = "transparent";
            //myDiv.removeChild(myChild);
           
        //}
    }
    var myId = e.target.id;
    //var img = document.createElement("img");
    //img.src = "images/CheckMark.png";
    //img.className = "c-chekmark";
    //img.id = "img" + myId;
    //var src = document.getElementById("f" + myId);
    //src.appendChild(img);

    document.getElementById(myId).style.backgroundColor = "var(--main-green)";


    document.getElementById("chosenAvatarImg").src = "images/female/2x/" + myId + ".png";

    var avatarImgSrc = "images/female/1x/asset " + myId + ".png";
    createCookie("avatarImg", avatarImgSrc, 1);
    //call to handler

    $.get("setImageHandler.ashx", {
        //get parameters
        myName: readCookie("playerName")//sent player name
        , myPic: avatarImgSrc
    })
        .done(function (data) {
            //get success
            console.log(data);
        })
        .fail(function () {
            //get fail
        })


    $.get("‏‏setImageHandler.ashx", {
        myName: readCookie("playerName")//sent player name
        , myPic: avatarImgSrc
    },
        function (data, status) {

            if (status == "success") {

                //printing  the response in the console
                console.log(data);
            }
        });


    document.getElementById("finishAvatar").style.display = "block";

}



function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

function openLargeImg() {
    document.getElementById("bigPicDiv").style.visibility = "visible";
}

function closeLargeImg() {

    document.getElementById("bigPicDiv").style.visibility = "hidden";
}

function addScore(mistakes) {
    if (mistakes == 0) {
        document.getElementById("goldScore").innerHTML = (parseInt(document.getElementById("goldScore").innerHTML) + 1).toString();
    }
    else if (mistakes == 1) {
        document.getElementById("silverScore").innerHTML = (parseInt(document.getElementById("silverScore").innerHTML) + 1).toString();
    }
    else {
        document.getElementById("bronzeScore").innerHTML = (parseInt(document.getElementById("bronzeScore").innerHTML) + 1).toString();
    }
    setData();
}

//// Get the modal
//var modal = document.getElementById("myModal");

//// Get the image and insert it inside the modal - use its "alt" text as a caption
//var img = document.getElementById("myImg");
//var modalImg = document.getElementById("img01");
//var captionText = document.getElementById("caption");
//img.onclick = function () {
//    modal.style.display = "block";
//    modalImg.src = this.src;
//    captionText.innerHTML = this.alt;
//}

//// Get the <span> element that closes the modal
//var span = document.getElementsByClassName("close")[0];

//// When the user clicks on <span> (x), close the modal
//span.onclick = function () {
//    modal.style.display = "none";
//}
