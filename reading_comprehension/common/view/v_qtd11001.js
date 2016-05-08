var View = function(_ref, _logicObj) {
    var controlObj = _ref;
    var _thisObj = this;
    var logicObj = _logicObj;
    var noOfPages = 0;
    //var currStimuli = 0
    var currentAudio;
    var elem = [];
    var wrapperDiv;
    var sentenceDiv = [];
    var picDiv = [];
    var curFrame
    var prevFrame;
    var manifest;
    var current = 0;
    var paraDiv, qtnDiv, picDiv, ansDiv;
    var totalStimuli;
    var customData;
    var pageCanvas, starBurstCanvas, glowCanvas, pencilCanvas;
    var wordDiv = [];
    var mainWordDiv = [];
    var fishThroughTime = 0;
    var F12ThroughTime = 0;
    var clickedDiv;
    var currentQuestion = 0;
    var unPrompted = true;
    var ansClickedId = 0;
    var twoSec = false;
    var func7TimeOut = 0;
    var totalTrials = 0;
    var jsflPicDiv = [];
    //TEMP CHANGE    
    var randomSelected = 0;
    var prvsSelected;
    var jsflPicCanvas;
    var flgConsec = false;
    //TEMP CHANGE
    var iconExitCriteria = {fact: 0, clue: 0};
    var questionExitCriteria = {mostly: 0, fact: 0, clue: 0, vocab: 0};
    var questionPool = [];
    var randomArr = [0, 1, 2, 3];
    var clickedDataId;
    var counters = {mostly: 0, fact: 0, clue: 0, vocab: 0};
    var fishBgAnimObj = [
        {
            "name": "waterImgs0003.png",
            "height": 553
        },
        {
            "name": "waterImgs0002.png",
            "height": 569
        },
        {
            "name": "waterImgs0001.png",
            "height": 569
        }
    ];
    var LMS = {
        noCorrectCount: 0,
        noTotalTapsCount: 0,
        noMissesCount: 0,
        noTimeOutCount: 0,
    };
    var timerCB;
    var pageNo = 1
    var onTurnComplete = false
    var paraDiv;
    // var piecePlaced=0
    //

    //==========================================================================================================
    //============================Compulsory Part to be added in all the view files=============================
    var _gJSONRefArr = [];
    var contentObj = controlObj.getContentObj();
    var viewDataObj = new ViewPreloader(controlObj, _thisObj);
    //
    viewDataObj.addExternalJS("turn.js");
    function addCSS()
    {
        var path = "css";
        var style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = cssPath;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
//==================
    this.show = function()
    {
        $(wrapperDiv).show();
    }
//==================
    this.preBuildVidTemplete = function()
    {

    }
//==================
    this.deleteObj = function()
    {
        viewDataObj.removeMedia();
        viewDataObj.removeJsonImages()
        _thisObj.hide();
        $(wrapperDiv).remove();
    }
//==================
    this.hide = function()
    {
        $(wrapperDiv).hide();
    }
//==================
    this.preinit = function()
    {
        _thisObj.preBuildVidTemplete();
        createWrapperDiv();
        manifest = viewDataObj.getLocalManifestConfigData();
        ////////console.log.log.log("view ....... ")
        makeHTML();
        this.hide();
    }
//==================
    function createWrapperDiv()
    {
        $(wrapperDiv).remove();
        wrapperDiv = document.createElement('div');
        $(wrapperDiv).appendTo($('#myframe'));
        $(wrapperDiv).css({
            "position": "absolute",
            "left": "0px",
            "top": "0px"
        })
    }
//===================
    this.onload = function()
    {
        controlObj.onload();
    }
//===================
    this.initiateVideo = function() {

    }
//===================
    this.setData = function(objJSONContent) {
        _gJSONRefArr = objJSONContent;
        customData = viewDataObj.getLocalManifestConfigData()["customData"];
        totalStimuli = contentObj["segData"]["stimulus"].length;
        for (var i in contentObj["segData"]["stimulus"]["phases"]) {

            if (i < 2)
            {
                for (var j in contentObj["segData"]["stimulus"]["phases"][i]["blocks"]) {

                    for (var k in  contentObj["segData"]["stimulus"]["phases"][i]["blocks"][j]["sets"]) {
// console.log(contentObj["segData"]["stimulus"]["phases"][i]["blocks"][j]["sets"][k]);

                        for (var question in contentObj["segData"]["stimulus"]["phases"][i]["blocks"][j]["sets"][k]["question"])
                        {
                            contentObj["segData"]["stimulus"]["phases"][i]["blocks"][j]["sets"][k]["question"][question] = value(contentObj["segData"]["stimulus"]["phases"][i]["blocks"][j]["sets"][k]["question"][question]);
                        }

                        for (var paragraph in contentObj["segData"]["stimulus"]["phases"][i]["blocks"][j]["sets"][k]["paragraph"])
                        {
                            contentObj["segData"]["stimulus"]["phases"][i]["blocks"][j]["sets"][k]["paragraph"][paragraph] = value(contentObj["segData"]["stimulus"]["phases"][i]["blocks"][j]["sets"][k]["paragraph"][paragraph]);
                        }

                        for (var answers in contentObj["segData"]["stimulus"]["phases"][i]["blocks"][j]["sets"][k]["answers"])
                        {
                            contentObj["segData"]["stimulus"]["phases"][i]["blocks"][j]["sets"][k]["answers"][answers] = value(contentObj["segData"]["stimulus"]["phases"][i]["blocks"][j]["sets"][k]["answers"][answers]);
                        }
//console.table(contentObj["segData"]["stimulus"]["phases"][i]["blocks"][j]["sets"][k]);
                    }
                }
            }
            else {

                for (var j in contentObj["segData"]["stimulus"]["phases"][i]["sets"]) {
                    for (var question in contentObj["segData"]["stimulus"]["phases"][i]["sets"][j]["question"])
                    {
                        contentObj["segData"]["stimulus"]["phases"][i]["sets"][j]["question"][question] = value(contentObj["segData"]["stimulus"]["phases"][i]["sets"][j]["question"][question]);
                    }

                    for (var paragraph in contentObj["segData"]["stimulus"]["phases"][i]["sets"][j]["paragraph"])
                    {
                        contentObj["segData"]["stimulus"]["phases"][i]["sets"][j]["paragraph"][paragraph] = value(contentObj["segData"]["stimulus"]["phases"][i]["sets"][j]["paragraph"][paragraph]);
                    }

                    for (var answers in contentObj["segData"]["stimulus"]["phases"][i]["sets"][j]["answers"])
                    {
                        contentObj["segData"]["stimulus"]["phases"][i]["sets"][j]["answers"][answers] = value(contentObj["segData"]["stimulus"]["phases"][i]["sets"][j]["answers"][answers]);
                    }
//console.table(contentObj["segData"]["stimulus"]["phases"][i]["sets"][j]);
                }

            }
        }

    }
//===================
    this.init = function() {
    }
//===================


//=======================Compulsory Part to be added in all the view files ends here========================

    var checkDiv;
    function returnPicObject()
    {
        for (var i in contentObj["segData"]["jsflPicProp"])
        {
            if (contentObj["segData"]["jsflPicProp"][i].type == clickedDataId)
            {
                return contentObj["segData"]["jsflPicProp"][i];
                break;
            }
        }
    }
    function returnPicDiv()
    {
        var selectedObj = contentObj["segData"]["jsflPicProp"][randomArr[randomSelected]];
        ////////console.log.log.log(jsflPicDiv)		 
        for (var i in jsflPicDiv)
        {
            if ($(jsflPicDiv[i]).attr("data-id") == selectedObj["type"])
            {
                return jsflPicDiv[i];
            }
        }

    }
    function activateAnswer(bool)
    {
        if (bool)
        {
            $(".ans li").off(mouseEvents['release'], ansClicked).on(mouseEvents['release'], ansClicked).css("cursor", "pointer");
        }
        else
        {
            $(".ans li").off(mouseEvents['release'], ansClicked).css("cursor", "default");
        }
    }
    function ansClicked()
    {
        clickedDiv = $(this);
        ansClickedId = $(this).attr("data-id")
        if ($(this).attr("class") == "correct")
        {

            executeLogic({type: curFrame, click: true, correct: true});
        }
        else
        {
            executeLogic({type: curFrame, click: true, correct: false});
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function nextParagraph()
    {
        unPrompted = true;
        makeParagraphDiv();
        makeQuestionDiv();
        makeAnswerDiv();
        showStimulus(true);
    }
    function fishBgAnim(startFrame, endFrame)
    {
        var currentFrame = startFrame;
        var fishFrame = 1;
        var topRate = 10;
        var topLimit = 569;
        controlObj.setTimer("interval", 0.1, function() {
            elem["fishBgCanvas"].width = elem["fishBgCanvas"].width;
            var image = new Image();
            var nextFrame = 0;
            if (topRate >= topLimit)
            {

                topRate = 1;
                currentFrame++;
                (currentFrame > endFrame) ? (currentFrame = startFrame) : null;
            }

            topRate = topRate + 10;
            elem["fishBgCanvas_ctx"].beginPath();
            image.src = viewDataObj.getJsonImage(fishBgAnimObj[currentFrame - 1]["name"]).src;
            elem["fishBgCanvas_ctx"].drawImage(image, 0, 0 + topRate);
            elem["fishBgCanvas_ctx"].closePath();
            elem["fishBgCanvas_ctx"].beginPath();
            (currentFrame == endFrame) ? nextFrame = 0 : nextFrame = currentFrame;
            image.src = viewDataObj.getJsonImage(fishBgAnimObj[nextFrame]["name"]).src;
            elem["fishBgCanvas_ctx"].drawImage(image, 0, topRate - fishBgAnimObj[nextFrame].height + 8);
            elem["fishBgCanvas_ctx"].closePath();
            drawFishAnim("yellow", fishFrame);
            drawFishAnim("orange", fishFrame);
            fishFrame++;
            (fishFrame > 6) ? fishFrame = 1 : null;
        }, true);
    }
    function drawFishAnim(type, frame, isGlow)
    {
        if (type == "yellow")
        {
            elem["yellowFish"].width = elem["yellowFish"].width;
            var image = new Image();
            if (curFrame == "F7" || curFrame == "F26")
            {
                var fishImage = new Image();
                fishImage.src = viewDataObj.getJsonImage("glowFish.png").src;
                elem["yellowFish_ctx"].beginPath();
                elem["yellowFish_ctx"].drawImage(fishImage, 0, 0);
                elem["yellowFish_ctx"].closePath();
            }
            image.src = viewDataObj.getJsonImage("yellowFish000" + frame + ".png").src;
            elem["yellowFish_ctx"].drawImage(image, globalResizeCalc(20), globalResizeCalc(20));
        }
        else if (type == "orange")
        {
            elem["orangeFish"].width = elem["orangeFish"].width;
            var image = new Image();
            if (curFrame == "F7" || curFrame == "F26")
            {
                var fishImage = new Image();
                fishImage.src = viewDataObj.getJsonImage("glowFish.png").src;
                elem["orangeFish_ctx"].beginPath();
                elem["orangeFish_ctx"].drawImage(fishImage, 0, 0);
                elem["orangeFish_ctx"].closePath();
            }

            image.src = viewDataObj.getJsonImage("orangFish000" + frame + ".png").src;
            elem["orangeFish_ctx"].drawImage(image, globalResizeCalc(20), globalResizeCalc(20));
        }
    }
    function stopInterval()
    {
        controlObj.stopAnim("interval");
    }
    var _phase = 0;
    function makeHTML()
    {
        elem["stage"] = document.createElement('div');
        var bgImage = manifest["customData"]["bgImages"]["name"];
        $(elem["stage"]).css({
            "id": "stage",
            "position": "absolute",
            "left": "0px",
            "top": "0px",
            "background-image": "url(" + viewDataObj.getJsonImage(bgImage).src + ")",
            "background-position": "-429px 17px",
            "background-repeat": "no-repeat",
            "width": globalResizeCalc(1024) + "px",
            "height": globalResizeCalc(744) + "px"
        }).appendTo(wrapperDiv);
        jsflPicCanvas = createElement("canvas", "jsflPicCanvas", 0, 0, 1024, 744, $(elem["stage"]));
        $(jsflPicCanvas).hide();
        starBurstCanvas = createElement("canvas", "starBurstCanvas", 0, 0, 215, 215, wrapperDiv);
        $(starBurstCanvas).hide();
        elem["glowCanvas"] = document.createElement('canvas');
        elem["glowCanvas_ctx"] = elem["glowCanvas"].getContext("2d");
        elem["glowCanvas"].width = globalResizeCalc(210);
        elem["glowCanvas"].height = globalResizeCalc(194);
        $(elem["glowCanvas"]).css({
            "z-index": 0
        }).appendTo($(elem["stage"]));
        $(elem["glowCanvas"]).hide();
        elem["fishBgCanvas"] = document.createElement('canvas');
        elem["fishBgCanvas_ctx"] = elem["fishBgCanvas"].getContext("2d");
        elem["fishBgCanvas"].width = globalResizeCalc(240);
        elem["fishBgCanvas"].height = globalResizeCalc(569);
        $(elem["fishBgCanvas"]).css({
            "position": "absolute",
            "left": "31px",
            "top": "43px"
        }).appendTo($(elem["stage"]));
        elem["yellowFish"] = document.createElement('canvas');
        elem["yellowFish_ctx"] = elem["yellowFish"].getContext("2d");
        elem["yellowFish"].width = globalResizeCalc(101);
        elem["yellowFish"].height = globalResizeCalc(101);
        $(elem["yellowFish"]).css({
            "position": "absolute",
            "left": "143px",
            "top": "286px"
        }).addClass("fish").appendTo($(elem["stage"]));
        elem["orangeFish"] = document.createElement('canvas');
        elem["orangeFish_ctx"] = elem["orangeFish"].getContext("2d");
        elem["orangeFish"].width = globalResizeCalc(101);
        elem["orangeFish"].height = globalResizeCalc(101);
        $(elem["orangeFish"]).css({
            "position": "absolute",
            "left": "65px",
            "top": "286px"
        }).addClass("fish").appendTo($(elem["stage"]));
        $(elem["fishBgCanvas"]).show();
        ////////console.log.log.log(contentObj)        
        currentQuestion = getRandomInt(0, contentObj["segData"]["stimulus"].length - 1);
        ////////console.log.log.log("currentQuestion : ", currentQuestion)
        paraDiv = new Object();
        paraDiv = document.createElement("div");
        qtnDiv = new Object();
        qtnDiv = document.createElement("div");
        for (var i = 0; i < 4; i++)
        {
            jsflPicDiv[i] = document.createElement("div");
        }

        drawPicJsfl();
        makeJsflPicDiv();
        showPicture(false);
        // questionPool = contentObj["segData"]["stimulus"];
        questionPool = contentObj["segData"]["stimulus"]["phases"][_phase]["blocks"];
        makeAnswerDiv();
    }

    function activatePic(bool)
    {
        if (bool)
        {
            $(".picDiv").off(mouseEvents['release'], picClicked).on(mouseEvents['release'], picClicked).css("cursor", "pointer");
        }
        else
        {

            $(".picDiv").off(mouseEvents['release'], picClicked).css("cursor", "default");
        }
    }

    function activatePic1(bool)
    {
        if (bool)
        {
            $(".picDiv").off(mouseEvents['release'], picClicked1).on(mouseEvents['release'], picClicked1).css("cursor", "pointer");
        }
        else
        {

            $(".picDiv").off(mouseEvents['release'], picClicked1).css("cursor", "default");
        }
    }
    function activateFish(bool)
    {
        if (bool)
        {
            $(".fish").off(mouseEvents['release'], fishClicked).on(mouseEvents['release'], fishClicked).css("cursor", "pointer");
        }
        else
        {
            $(".fish").off(mouseEvents['release'], fishClicked).css("cursor", "default");
        }
    }
    function fishClicked()
    {
        controlObj.stopAnim("globalTimer");
        activateFish(false);
        func7TimeOut = 0;
        $(this).addClass("pi1");
        $(elem["yellowFish"]).hasClass("pi1") ? $(elem["orangeFish"]).addClass("pi2") : $(elem["yellowFish"]).addClass("pi2");
        starBurst($(this), "circle", function() {
            executeLogic({type: curFrame, click: true});
        });
    }

    function fishAnim(_fish, dir)
    {
        var pos = getOffset($("." + _fish))
        var topValue = pos["offset"].y;
        topValue = topValue + dir * 20 * (-1);
        $("." + _fish).animate({"top": topValue}, 1500);
    }

    var audNo = 0;
    function playAudArr(_audArr, _cb)
    {
        if (audNo < _audArr.length)
        {
            currentAudio = _audArr[audNo];
            viewDataObj.playAudio(currentAudio, function() {
                audNo++;
                playAudArr(_audArr);
            }, 0.25);
        }
        else
        {
            _cb ? _cb() : null;
        }
    }

    var zeroCounter = 0;
    var oneCounter = 0;
    var _divID;
    var isClickedCorrect = false;
    var isClickedWithin2sec = false;
    var isbeforeFunc5 = true;
    function picClicked()
    {
        controlObj.stopAnim("globalTimer");
        controlObj.stopAnim("pause60Sec");
        controlObj.stopAnim("pause2Sec");

        activatePic(false);
        _divID = $(this).attr("data-id");


        if (!isbeforeFunc5) {

            console.log("isClickedWithin2sec    ",isClickedWithin2sec)

            if (!isClickedWithin2sec)
            {
                executeLogic({type: curFrame, flag: true, visitCounter: func33Counter});
            } else {
                isClickedWithin2sec=false;
                if (_divID == currentClickedID)
                {
                    ////////console.log.log.log("correct ..");
                    isClickedCorrect = true;
                    zeroCounter = 2;
                    oneCounter = 2
//            if (currentClicked == 1)
//            {
//                oneCounter++;
//            }
//            else
//            {
//                zeroCounter++;
//            }
                    iconExitCriteria[_divID]++;
                    starBurst($(this), "box");
                    executeLogic({type: curFrame, click: true, correct: true});
                }
                else
                {
                    isClickedCorrect = false;
                    zeroCounter = 0;
                    oneCounter = 0;
                    executeLogic({type: curFrame, click: true, correct: false});
                }

            }

        } else {
            if (_divID == currentClickedID)
            {
                ////////console.log.log.log("correct ..");
                isClickedCorrect = true;
                zeroCounter = 2;
                oneCounter = 2
//            if (currentClicked == 1)
//            {
//                oneCounter++;
//            }
//            else
//            {
//                zeroCounter++;
//            }
                iconExitCriteria[_divID]++;
                starBurst($(this), "box");
                executeLogic({type: curFrame, click: true, correct: true});
            }
            else
            {
                isClickedCorrect = false;
                zeroCounter = 0;
                oneCounter = 0;
                executeLogic({type: curFrame, click: true, correct: false});
            }

        }

    }

    function picClicked1()
    {
        var _id = $(this).attr("data-id");
        var _selectedSetType = contentObj["segData"]["stimulus"]["phases"][_phase]["blocks"][_currentBlockNo]["sets"][_currentSetNo]["type"];
        if (_id == _selectedSetType)
        {
            console.log("correct ...");
            executeLogic({type: curFrame, click: true, correct: true});
        }
        else
        {
            console.log("incorrect ...");
            executeLogic({type: curFrame, click: true, correct: false});
        }
    }
    function returnCorrectDiv(_div)
    {
        for (var i = 0; i < 4; i++)
        {
            var _type = contentObj["segData"]["jsflPicProp"][i]["type"];
            if (_type == _div)
            {
                return jsflPicDiv[i];
            }
        }
    }
    function highlightCorrectAns(_div)
    {
        var pos = getOffset($(returnCorrectDiv(_div)));
        var centerX = pos.offset.x + pos.prop.width / 2 - elem["glowCanvas"].width / 2//$(_this).offset().left + $(_this).outerWidth()/2;
        var centerY = pos.offset.y + pos.prop.height / 2 - elem["glowCanvas"].height / 2//$(_this).offset().top + $(_this).outerHeight()/2;

        $(elem["glowCanvas"]).show().css({
            position: "absolute",
            left: centerX,
            top: centerY
        });
        elem["glowCanvas_ctx"].drawImage(viewDataObj.getJsonImage("glow.png"), 0, 0);
    }
    function makeParagraphDiv()
    {
        var html = "";
        $(paraDiv).css({
            "font-family": customData["paraDiv"].fontFamily,
            "font-size": customData["paraDiv"].fontSize + "em",
            "left": customData["paraDiv"].left + "px",
            "top": customData["paraDiv"].top + "px",
            "position": "absolute",
            "display": "inline-block",
            "width": customData["paraDiv"].width,
            "height": customData["paraDiv"].height,
            "word-spacing": customData["paraDiv"].wordSpacing + "px",
            "line-height": customData["paraDiv"].lineHeight + "px",
            "cursor": "default"
        }).attr({"id": "paraDiv"}).appendTo($(elem["stage"]));
        //console.table(questionPool[_currentBlockNo]["sets"][_currentSetNo]);

        var dataDecider = "";
        if (_phase <= 1)
        {
            dataDecider = questionPool[_currentBlockNo]["sets"][_currentSetNo]["paragraph"];
        }
        else {
            dataDecider = questionPool[_currentSetNo]["paragraph"];
        }

        for (var i = 0; i < dataDecider.length; i++)
        {
            html += dataDecider[i] + " ";
        }

        for (var j = 0; j < questionPool[_currentSetNo]["location"].length; j++) {
            if (html.toLowerCase().indexOf(questionPool[_currentSetNo]["location"][j].toLowerCase()) != (-1)) {
                var resultStr = "<span class='locationOfAnswer'>" + questionPool[_currentSetNo]["location"][j] + "</span>"
                html = html.replace(questionPool[_currentSetNo]["location"][j], resultStr);
            }
        }
        $(paraDiv).html(html);
    }

    function makeQuestionDiv()
    {
        $(qtnDiv).css({
            "font-family": customData["qtnDiv"].fontFamily,
            "width": customData["qtnDiv"].width + "px",
            "height": customData["qtnDiv"].height,
            "margin-top": customData["qtnDiv"].marginTop,
            "font-style": customData["qtnDiv"].fontStyle,
            "font-weight": "bold",
            "cursor": "default"
        }).attr({"id": "qtnDiv"}).appendTo($(paraDiv));
        var dataDecider = "";
        if (_phase <= 1)
        {
            dataDecider = questionPool[_currentBlockNo]["sets"][_currentSetNo]["question"][0];
        }
        else {
            dataDecider = questionPool[_currentSetNo]["question"][0];
        }

        var html = dataDecider;
        $(qtnDiv).html(html);
    }

    function makePictureDiv()
    {
        $(picDiv).css({
            "left": customData["picDiv"].left + "px",
            "top": customData["picDiv"].top + "px",
            "position": "absolute",
            "display": "inline-block",
            "background-image": "url(" + viewDataObj.getJsonImage(customData["picDiv"].imgSrc).src + ")",
            "width": customData["picDiv"].width,
            "height": customData["picDiv"].height,
            "cursor": "default"
        }).attr({"id": "picDiv"}).appendTo($(elem["stage"])).hide();
    }

    function makeAnswerDiv()
    {
        $(paraDiv).append("<ul class='ans'></ul>");
        var html = "";
        var dataDecider = "";
        if (_phase <= 1)
        {
            dataDecider = contentObj["segData"]["stimulus"]["phases"][_phase]["blocks"][_currentBlockNo]["sets"][_currentSetNo]["answers"];
        }
        else {
            dataDecider = questionPool[_currentSetNo]["answers"];
        }

        for (var i = 0; i < dataDecider.length; i++)
        {
            var opt = dataDecider[i];
            var _higlight = questionPool[_currentSetNo]["higlight"]
            if (i == _higlight)
            {
                html += '<li data-id="' + i + '" class="correct"><span class="img" style="background-image:url(' + viewDataObj.getJsonImage("circle1.png").src + ');"></span><div><span class="onlyAns">' + opt + '</span></div></li>';
            }
            else
            {
                html += '<li data-id="' + i + '"><span class="img" style="opacity:0.5 ; background-image:url(' + viewDataObj.getJsonImage("circle.png").src + ');"></span><div style="opacity:0.5;">' + opt + '</div></li>';
            }
        }
        $(".ans").html(html);
        attachCss();
    }
    function selectQuestion()
    {
        var avlblQuestion = [];
        for (var i in questionPool)
        {
            console.log(questionPool[i].hasOwnProperty("correct"), (questionPool[i]["correct"]))
            if (!(questionPool[i].hasOwnProperty("correct")) && !(questionPool[i]["correct"]))
            {
                avlblQuestion.push(i);
            }
        }
        currentQuestion = avlblQuestion[Math.floor(Math.random() * avlblQuestion.length)];
    }
    function attachCss()
    {
        $('head').append('<style>.ans li.disable span{opacity:0.5;}.ans li div {float: left;width:525px; font-family: Times new roman; padding: 4px 18px 0 2px;line-height: 28px;letter-spacing: 0.6px;}\n\
        ul.ans{margin: 20px 0 0 2px;padding: 0;}ul.ans li span.img{background-repeat: no-repeat;display: inline-block;width: 33px;height: 34px;float: left;margin: 0px 22px 0 -5px; top: 6px;position:relative;}ul.ans li span{background-repeat: no-repeat;display: inline-block;width: 29px;height: 28px;float: left;margin: 0px 22px 0 -5px; top: 6px;position:relative;} .ans li {clear: both;margin: 4px;list-style: none;padding: 0 0 5px 0; float:left;}.question {font-family: Times_New_Roman;line-height: 29px;margin: 119px 0 0 84px;width: 300px;}.pic {width: 82px;height: 75px;float: left;background-repeat: no-repeat;margin-right: 32px;}.underline{border-bottom: green solid 7px;}\n\
        .onlyAns{display: inline-block!important;width: auto!important;padding-bottom: 3px;margin: 5px 0px 1px -2px!important;line-height:0.3em}.disable{opacity:0.5;}</style>');
    }

    function value(d) {
        var val = '';
        for (var i in _gJSONRefArr) {

            if (_gJSONRefArr[i].ref == d) {
                val = _gJSONRefArr[i].value;
                break;
            }
        }
        return val;
    }

    function pageAnim(_direction, _cb)
    {
////////////console.log.log.log( _cb)
        var show = false

        var obj = customData["animations"]["pageTurn"][_direction]//["offset"][index];
        $(pageCanvas).show();
        viewDataObj.showAnim("object1", obj["startFrame"], obj["endFrame"], obj["jsfl"], pageCanvas, function(e) {
            ////////////////////console.log.log.log(e);
            if (e > 8 && !show)
            {
                show = true
                if (curFrame == 'F8' || curFrame == 'F9')
                {
                    $(rewardCanvas).hide()
                    $(rewardDiv).hide()
                    hideSentence()

                }
                if (curFrame == "F2")
                {
                    showWord(true)
                }
//                
//                if(curFrame == "F4")
//                {
//                    rewardAnim("in")
//                }
            }
        }, function() {

            if (curFrame == 'F9')
            {
                executeLogic({type: curFrame});
            }
            //if (_direction == "out")

            // $(pageCanvas).hide();
            _cb ? _cb() : null;
        }, false, false);
        currentAudio = "ab_audio_96"
        viewDataObj.playAudio(currentAudio, function() {
        }, 0.1, true)

    }
    function showGlow(bool)
    {
        if (bool)
        {
            var pos = getOffset($(returnPicDiv()));
            var centerX = pos.offset.x + pos.prop.width / 2 - elem["glowCanvas"].width / 2//$(_this).offset().left + $(_this).outerWidth()/2;
            var centerY = pos.offset.y + pos.prop.height / 2 - elem["glowCanvas"].height / 2//$(_this).offset().top + $(_this).outerHeight()/2;

            $(elem["glowCanvas"]).show().css({
                position: "absolute",
                left: centerX,
                top: centerY
            });
            elem["glowCanvas_ctx"].drawImage(viewDataObj.getJsonImage("glow.png"), 0, 0);
        }
        else
        {
            elem["glowCanvas"].width = elem["glowCanvas"].width;
        }



    }

    function showPicture(bool)
    {
//////console.log.log.log("showPicture", bool)
        if (bool)
        {
            $(".picDiv").show();
            $(jsflPicCanvas).show();
        }
        else
        {
            if (!checkIconCriteria())
            {
                $(".picDiv").hide();
                $(jsflPicCanvas).hide();
            }
        }
    }
    function makeJsflPicDiv()
    {

//shuffle(randomArr);
        var arr = [];
        if (exitCriteria)
        {
            arr = contentObj["segData"]["jsflPicDivProp1"];
        }
        else
        {
            arr = contentObj["segData"]["jsflPicDivProp"];
        }
        for (var i = 0; i < arr.length; i++)
        {
            $(jsflPicDiv[i]).css({
                "left": arr[randomArr[i]].left,
                "top": arr[randomArr[i]].top + "px",
                "position": "absolute",
                "display": "inline-block",
                "width": arr[randomArr[i]].width,
                "height": arr[randomArr[i]].height,
                "cursor": "default"
            }).addClass("picDiv").attr({"data-id": contentObj["segData"]["jsflPicProp"][i]["type"]}).appendTo($(elem["stage"]));
        }

    }
    var isFirstTym = true;
    function drawPicJsfl(anim, _cb)
    {
        ////////console.log.log.log(anim,_cb)
        var completeCount = 0;
        var box;
        var _arr = new Array();
        if (isFirstTym)
        {
            $(jsflPicCanvas).css({
                "position": "absolute",
                "left": 0,
                "top": 0
            });
        } else {

        }

        var box = contentObj["segData"]["jsflPicProp"];
        ////////console.log.log.log(box)
        if (typeof anim == "undefined")
        {
            shuffle(randomArr);
        }

        for (var i in box) {
            ////////console.log.log.log(i)		
            var jsflName = box[i]["jsflName"];
            ////////console.log.log.log("jsflName     ",jsflName)
            var startFrame = 1;
            var endFrame = 1;
            if (typeof anim != "undefined")
            {
                if (currentClicked == 1)
                {
                    var _temp = 0;
                }
                else
                {
                    var _temp = 1;
                }
                var selectedObj = contentObj["segData"]["jsflPicProp"][_temp];
                if (selectedObj["type"] == box[i]["type"])
                {
                    startFrame = box[i].startFrame;
                    endFrame = box[i].endFrame;
                }
                else
                {
                    startFrame = 1;
                    endFrame = 1;
                }

            }
            else
            {
                startFrame = 1;
                endFrame = 1;
            }
            var arr = []

            if (isFirstTym) {

                if (checkIconCriteria())
                {
                    arr = contentObj["segData"]["jsflPicDivProp1"];
                }
                else
                {
                    arr = contentObj["segData"]["jsflPicDivProp"];
                }
            }
            else {
                arr = contentObj["segData"]["jsflPicDivProp"];
            }



            var left = arr[randomArr[i]].left;
            var top = arr[randomArr[i]].top;
            _arr[i] = {
                "startFrame": startFrame,
                "endFrame": endFrame,
                "loop": false,
                "json": jsflName,
                "xoff": left,
                "yoff": top,
                "lastFrame": true,
                "progress": function(_c, e) {
                    //////////console.log.log.log(_c,e);
                },
                "complete": function() {
                    ////////console.log.log.log("complete")
                    completeCount++;
                    if (completeCount == box.length)
                    {
                        isFirstTime = true;
                    }
                }
            };
        }

        ////////console.log.log.log(_arr.length);
        $(jsflPicCanvas).show();
        jsflPicCanvas.width = jsflPicCanvas.width;
        //////console.log.log.log(_arr);
        controlObj.stopAnim("showJsfl1");
        viewDataObj.addGroup("showJsfl1", jsflPicCanvas, _arr, function() {
            (typeof _cb != "undefined") ? _cb() : null;
            //////console.log.log.log("completed");
        });
        viewDataObj.playGroup("showJsfl1");
    }
    function selectEg()
    {

        /* prvsSelected=randomSelected;
         randomSelected = randomArr[Math.floor(Math.random() * randomArr.length)];  
         ////////console.log.log.log(randomSelected)
         if(prvsSelected!=-1 && prvsSelected==randomSelected)
         {
         if(flgConsec)
         {
         var newArray = [];
         var index = randomArr.indexOf(randomSelected);
         newArray = randomArr.splice(index, 1)
         randomSelected = randomArr[Math.floor(Math.random() * randomArr.length)];
         randomArr.push(prvsSelected);
         flgConsec=false;
         }
         else
         {
         flgConsec=true;
         }
         
         }  
         ////////console.log.log.log(flgConsec) */
    }

    function playjsflAudio(_cb)
    {
        if (customData["jsflPicProp"][current].hasOwnProperty("audio"))
        {
            currentAudio = getAudRef(customData["jsflPicProp"][current]["audio"]);
            viewDataObj.playAudio(currentAudio, function() {
                //_cb?_cb():null;
            });
        }
    }
    function shuffle(o) {
//////console.log.log.trace();
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
            ;
        return o;
    }
    function showJsfl(bool, cb)
    {
        if (bool)
        {
            $(jsflPicCanvas).show();
            for (var i = 0; i < contentObj["segData"]["stimulus"].length; i++)
            {
                $(jsflPicDiv[i]).show();
            }
            cb ? cb() : null;
        }
        else
        {
            for (var i = 0; i < contentObj["segData"]["stimulus"].length; i++)
            {
                $(jsflPicDiv[i]).hide();
            }
            $(jsflPicCanvas).fadeOut(400, function() {
                cb ? cb() : null;
            });
        }
    }
    function activateJsfl(bool)
    {
        if (bool)
        {
            for (var i = 0; i < contentObj["segData"]["stimulus"].length; i++)
            {
                $(jsflPicDiv[i]).off(mouseEvents['release'], jsflClickedFn).on(mouseEvents['release'], jsflClickedFn).css("cursor", "pointer");
            }
        }
        else
        {
            for (var i = 0; i < contentObj["segData"]["stimulus"].length; i++)
            {
                $(jsflPicDiv[i]).off(mouseEvents['release'], jsflClickedFn).css("cursor", "default");
            }
        }
    }

    function jsflClickedFn()
    {
        LMS.noCorrectCount++;
        LMS.noTotalTapsCount++;
        activateJsfl(false);
        controlObj.stopAnim("globalTimer");
        if ($(this).attr("data-id") == current)
        {
            starBurst(this);
            executeLogic({type: curFrame, click: true, correct: true});
        }
        else
        {
            executeLogic({type: curFrame, click: true, correct: false});
        }
    }

    function setClass()
    {
        $('.addClick').css({
            "border-bottom": "solid " + globalResizeCalc(5) + "px #000000",
            "display": "inline-block",
            "line-height": 52 + "px"
        })
    }

    function showSentence()
    {
        $(sentenceDiv[current]).show()
//        currentAudio = getObjByAttr("ref", contentObj["require"]["view"]["stimulus"][current]['animAudio'], _gJSONRefArr)["audRef"]
//        viewDataObj.playAudio(currentAudio, function () {
//            if (counters.f4 > 1)
//            {
//                executeLogic({type: curFrame, firstTime: false})
//            }
//            else
//            {
//                executeLogic({type: curFrame, firstTime: true})
//            }
//
//        })
    }
    function showUnderline(bool)
    {
        var underlineWords = "";
        if (bool)
        {
            var words = contentObj["segData"]["stimulus"][currentQuestion]["answer"];
            for (var i in words)
            {
                if (words[i].hasOwnProperty("shortCorrect"))
                {
                    underlineWords = value(words[i].ref);
                    break;
                }
            }
            if (underlineWords != "")
            {
                $("#paraDiv:contains('" + underlineWords + "')").html(function(_, html) {
                    var pattern = new RegExp("\\b(" + underlineWords + ")\\b");
                    return  html.replace(pattern, '<span class="underline">$1</span>')
                });
                $(".onlyAns").addClass("underline");
            }

        }
        else
        {
            $(".onlyAns").removeClass("underline");
            $("#paraDiv span").removeClass("underline");
        }
    }
    function hideSentence(cb)
    {
////////////console.log.log.log( $(sentenceDiv[current]),"hide")
        $(sentenceDiv[current]).fadeOut(400, function() {
            cb ? cb() : null;
        });
    }

    function getAudRef(val)
    {
        var _Obj = getObjByAttr("ref", val, _gJSONRefArr);
        return _Obj["audRef"];
    }
    function checkIconCriteria()
    {
        var flgCnt = 0;
        for (var i in iconExitCriteria)
        {
            if (iconExitCriteria[i] > 0)
            {
                flgCnt++;
            }
        }
        if (flgCnt == 4)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    function checkQuestionCriteria()
    {
        var total = 0;
        for (var i in questionExitCriteria)
        {
            total = total + questionExitCriteria[i];
        }
        return total;
    }
    function func0()
    {
        updateCurrentFrame('F0')
        cTime.startTimer();
        _thisObj.show()
        executeLogic({type: curFrame})
    }

    function func1()
    {
        prevFrame = curFrame
        updateCurrentFrame('F1')

        currentAudio = "sb_audio_1681";
        viewDataObj.playAudio(currentAudio, function() {
            // selectEg();
            executeLogic({type: curFrame});
        }, 0.5)

    }
    var isFirstTime = true;
    var tempAudio;
    var currentClicked;
    var currentClickedID;
    var prevRand;
    var prevClicked;
    var repeatCounter = 0;
    function func2()
    {

        prevFrame = curFrame
        updateCurrentFrame('F2');
        ////////console.log.log.log("func 2   ........ " , prevFrame)
        showPicture(true);
        currentAudio = "sb_audio_449";
        if (prevFrame == "F4")
        {
            drawPicJsfl();
            makeJsflPicDiv();
        }
        viewDataObj.playAudio(currentAudio, function() {
            if (isFirstTime)
            {

                //reArrangeAll();
                var _rand = getRandomInt(0, 1);
                if (_rand == 1)
                {
                    currentAudio = "sb_audio_1701"; // clue word
                    currentClicked = 1;
                    currentClickedID = "clue";
                }
                else
                {
                    currentAudio = "sb_audio_1700"; // facts
                    currentClicked = 0;
                    currentClickedID = "fact";
                }
                if (prevClicked == currentClicked)
                {
                    repeatCounter++;
                    if (repeatCounter == 2)
                    {
                        if (currentClicked == 1)
                        {
                            currentClicked = 0;
                            currentAudio = "sb_audio_1700";
                            currentClickedID = "fact";
                        }
                        else
                        {
                            currentClicked = 1;
                            currentAudio = "sb_audio_1701";
                            currentClickedID = "clue";
                        }
                        prevClicked = currentClicked;
                        repeatCounter = 0;
                    }
                }
                prevClicked = currentClicked
                tempAudio = currentAudio;
                //////console.log.log.log(currentClicked , currentClickedID)
            }
            viewDataObj.playAudio(tempAudio, function() {
                activatePic(true);
                setTimer(5, function() {
                    isFirstTime = false;
                    LMS.noTimeOutCount++;
                    executeLogic({type: curFrame});
                });
            });
        });
    }
    function reArrangeAll()
    {
////////console.log.log.log("re arrange all")
//shuffle(randomArr);
        for (var i = 0; i < 4; i++)
        {
            $("picDiv").css({
                "left": contentObj["segData"]["jsflPicDivProp"][randomArr[i]]["left"],
                "top": contentObj["segData"]["jsflPicDivProp"][randomArr[i]]["top"],
                "width": contentObj["segData"]["jsflPicDivProp"][randomArr[i]]["width"],
                "height": contentObj["segData"]["jsflPicDivProp"][randomArr[i]]["height"],
            });
        }
    }

    function  func3()
    {
        prevFrame = curFrame
        updateCurrentFrame('F3');
        currentAudio = "wb_audio_40"; // oops
        viewDataObj.playAudio(currentAudio, function() {
            highlightCorrectAns(currentClickedID)
            currentAudio = "sb_audio_1683"; // this is
            viewDataObj.playAudio(currentAudio, function() {
                if (currentClicked == 1)
                {
                    currentAudio = "sb_audio_1701"; // clue word
                }
                else
                {
                    currentAudio = "sb_audio_1700"; // facts
                }
                viewDataObj.playAudio(currentAudio, function() {
                    HideGlow();
                    showPicture(false);
                    //makeJsflPicDiv();
                    drawPicJsfl(undefined, function() {
                        makeJsflPicDiv();
                        executeLogic({type: curFrame, exitCriteria: false});
                    });
                });
            }, 0.25);
        }, 0.5);
    }
    function HideGlow()
    {
        $(elem["glowCanvas"]).hide()
    }
    var exitCriteria = false;
    function  func4()
    {
        console.log("currentClicked     ", currentClicked);
        prevFrame = curFrame
        updateCurrentFrame('F4');
        currentAudio = "wb_audio_123"; // yes
        viewDataObj.playAudio(currentAudio, function() {

            if (currentClicked == 0) {
                currentAudio = "sb_audio_1700";
            } else if (currentClicked == 1) {
                currentAudio = "sb_audio_1701";
            }

            viewDataObj.playAudio(currentAudio, function() {
                drawPicJsfl(true, function() {
                    if (zeroCounter >= 2 && oneCounter >= 2)
                    {
                        exitCriteria = true;
                    }
                    else
                    {
                        exitCriteria = false;
                    }
                    showPicture(false);
                    executeLogic({type: curFrame, exitCriteria: exitCriteria});
                });
            }, 0.25);
        });
    }
    function func5()
    {
        prevFrame = curFrame
        updateCurrentFrame('F5');
        currentAudio = "sb_audio_1685"; // good job
        viewDataObj.playAudio(currentAudio, function() {
            currentAudio = "sb_audio_160"; // lets work with q n a
            viewDataObj.playAudio(currentAudio, function() {
                isbeforeFunc5 = false;
                executeLogic({type: curFrame});
            });
        });
    }

    function func6()
    {
        prevFrame = curFrame
        updateCurrentFrame('F6');
        isClickedWithin2sec = false;
        questionPool = contentObj["segData"]["stimulus"]["phases"][_phase]["blocks"];
        func7TimeOut = 0;
        $(elem["stage"]).animate({
            "background-position-x": '-261px',
            "background-position-y": '17px'
        }, {duration: 600});
        var img = new Image();
        img.src = viewDataObj.getJsonImage("box1.png").src;
        $(jsflPicCanvas).show();
        $(jsflPicCanvas).animate({
            "left": "252px",
            "top": "319px",
            "width": "722px",
            "height": "551px"
        }, {duration: 600});
        controlObj.setTimer("delay", 0.6, function() {
            fishBgAnim(1, 3);
            makeJsflPicDiv();
        });
        fishThroughTime++;
        currentAudio = "sb_audio_1711"; // get ready for the race
        viewDataObj.playAudio(currentAudio, function() {
            executeLogic({type: curFrame, throughTime: fishThroughTime, click: false});
        });
    }

    function func7()
    {
        prevFrame = curFrame
        updateCurrentFrame('F7');
        makeJsflPicDiv();
        currentAudio = "sb_audio_1686"; // who u want to be
        viewDataObj.playAudio(currentAudio, function() {
            activateFish(true);
            setTimer(5, function() {
                func7TimeOut++;
                executeLogic({type: curFrame, timeout: func7TimeOut, click: false});
            });
        });
    }

    function func8()
    {
        prevFrame = curFrame
        updateCurrentFrame('F8');
        currentAudio = "sb_audio_1687";
        viewDataObj.playAudio(currentAudio, function() {
            currentAudio = "sb_audio_1688";
            viewDataObj.playAudio(currentAudio, function() {
                executeLogic({type: curFrame});
            }, 0.5);
        }, 0.25);
    }
    function func9()
    {
        prevFrame = curFrame
        updateCurrentFrame('F9');
        $(".jsflPicCanvas").show();
        _phase = 2;
        questionPool = contentObj["segData"]["stimulus"]["phases"][_phase]["sets"];
        shuffleSets();
        makeParagraphDiv();
        makeQuestionDiv();
        makeAnswerDiv();
        if (_phase <= 1)
        {
            executeLogic({type: curFrame, goto: "func10()"});
        } else {
            executeLogic({type: curFrame, goto: "func31()"});
        }

    }
    function func10()
    {
        prevFrame = curFrame
        updateCurrentFrame('F10');
        currentAudio = "sb_audio_1689";
        viewDataObj.playAudio(currentAudio, function() {
            currentAudio = "sb_audio_17000";
            viewDataObj.playAudio(currentAudio, function() {
                executeLogic({type: curFrame});
            }, .5);
        }, .5);
    }

    var globalTimerCounter = 0;
    function func11() {
        prevFrame = curFrame
        updateCurrentFrame('F11');
        if (isClickedCorrect)
        {
            //_currentSetNo++;
        } else {
            questionPool[_currentBlockNo]["sets"].push(questionPool[_currentBlockNo]["sets"].shift());
            _currentBlockNo++;
            if (_currentBlockNo > (questionPool.length - 1))
            {
                _currentBlockNo = 0;
            }

            shuffleSets();
        }

        $(".jsflPicCanvas").show();
        drawPicJsfl();
        makeJsflPicDiv();
        makeParagraphDiv();
        makeQuestionDiv();
        makeAnswerDiv();
        currentClickedID = questionPool[_currentBlockNo]["sets"][_currentSetNo]["type"];
        currentAudio = "sb_audio_216";
        viewDataObj.playAudio(currentAudio, function() {
            activatePic(true);
            controlObj.setTimer("pause2Sec", 2, function() {
                controlObj.stopAnim("pause2Sec");
                if (isClickedWithin2sec)
                {
                    executeLogic({type: curFrame, flag: isClickedWithin2sec});
                }
            });
            controlObj.setTimer("pause60Sec", 60, function() {
                controlObj.stopAnim("pause60Sec");
                globalTimerCounter++;
                executeLogic({type: curFrame});
            }, false);
        });
    }

    function func12()
    {
        prevFrame = curFrame
        updateCurrentFrame('F12');
        isFirstTym = false;
        currentClickedID = questionPool[_currentBlockNo]["sets"][_currentSetNo]["type"];

        currentAudio = "sb_audio_4505";
        viewDataObj.playAudio(currentAudio, function() {
            currentAudio = "sb_audio_1692";
            viewDataObj.playAudio(currentAudio, function() {
                activatePic(true);
                controlObj.setTimer("pause2Sec", 2, function() {
                    controlObj.stopAnim("pause2Sec");
                    if (isClickedWithin2sec)
                    {
                        executeLogic({type: curFrame, flag: isClickedWithin2sec});
                    }
                });
                controlObj.setTimer("pause60Sec", 60, function() {
                    controlObj.stopAnim("pause60Sec");
                    globalTimerCounter++;
                    executeLogic({type: curFrame});
                }, false);
            }, 0.5);
        }, 0.5);
    }
    function func12b()
    {
        prevFrame = curFrame
        updateCurrentFrame('F12b');
        if (globalTimerCounter % 2 == 0)
        {
            executeLogic({type: curFrame, goto: "func14()"});
        }
        else
        {
            executeLogic({type: curFrame, goto: "func13()"});
        }
    }
    function func13()
    {
        prevFrame = curFrame
        updateCurrentFrame('F13');
        currentAudio = "sb_audio_14501"; // remember
        viewDataObj.playAudio(currentAudio, function() {
            currentAudio = "sb_audio_1708"; // if d same word

            viewDataObj.playAudio(currentAudio, function() {
                currentAudio = "sb_audio_1710"; // when r diff words in para
                viewDataObj.playAudio(currentAudio, function() {

                    controlObj.setTimer("pause60Sec", 60, function() {
                        globalTimerCounter++;
                        controlObj.stopAnim("pause60Sec");
                        executeLogic({type: curFrame});
                    }, false);
                });
            });
        });
    }
    function func14()
    {
        prevFrame = curFrame
        updateCurrentFrame('F14');
        currentAudio = "sb_audio_4505"; // did we have to find
        viewDataObj.playAudio(currentAudio, function() {
            currentAudio = "sb_audio_1692"; // click on the picture
            viewDataObj.playAudio(currentAudio, function() {

                controlObj.setTimer("pause60Sec", 60, function() {
                    globalTimerCounter++;
                    controlObj.stopAnim("pause60Sec");
                    executeLogic({type: curFrame});
                }, false);
            }, .5);
        });
    }

    function func16()
    {
        prevFrame = curFrame
        updateCurrentFrame('F16');
        console.log("inside func16");
    }

    function func17()
    {
        prevFrame = curFrame
        updateCurrentFrame('F17');
        console.log("inside func17");
    }

    function func18()
    {
        prevFrame = curFrame
        updateCurrentFrame('F18');
        isClickedWithin2sec = false;
        _currentSetNo = 0;

        var pi1Top = getOffset($(".pi1"));
        var pi2Top = getOffset($(".pi2"));
        if (pi1Top.offset.top == pi2Top.offset.top)
        {
            fishAnim("pi1", -1);
            fishAnim("pi2", 1);
        } else if (pi1Top.offset.top < pi2Top.offset.top) {
            fishAnim("pi2", 1);
        }

        currentAudio = "wb_audio_40";
        viewDataObj.playAudio(currentAudio, function() {
            if (_divID == "fact" || _divID == "clue") {
                executeLogic({type: curFrame, goto: "func20()"});
            } else if (_divID == "mostly" || _divID == "vocab") {
                executeLogic({type: curFrame, goto: "func21()"});
            }
        });
    }

    function func19()
    {
        prevFrame = curFrame
        updateCurrentFrame('F19');
        console.log("inside func19");
    }

    function func20()
    {
        prevFrame = curFrame
        updateCurrentFrame('F20');
        console.log("inside func20");
        highlightLocation();
        if (questionPool[_currentBlockNo]["sets"][_currentSetNo]["type"] == "fact") {
            currentAudio = "sb_audio_1695";
            viewDataObj.playAudio(currentAudio, function() {

                currentAudio = "sb_audio_4511";
                viewDataObj.playAudio(currentAudio, function() {
                    executeLogic({type: curFrame});
                });
            }, 0.25);
        } else if (questionPool[_currentBlockNo]["sets"][_currentSetNo]["type"] == "clue") {
            currentAudio = "sb_audio_4513";
            viewDataObj.playAudio(currentAudio, function() {

                currentAudio = "sb_audio_4510";
                viewDataObj.playAudio(currentAudio, function() {
                    executeLogic({type: curFrame});
                });
            }, 0.25);
        }

    }

    function func21()
    {
        prevFrame = curFrame
        updateCurrentFrame('F21');
        console.log("inside func21");
        highlightLocation();
        if (questionPool[_currentBlockNo]["sets"][_currentSetNo]["type"] == "fact") {
            currentAudio = "sb_audio_1708";
            viewDataObj.playAudio(currentAudio, function() {
                executeLogic({type: curFrame});
            }, 0.25);
        } else if (questionPool[_currentBlockNo]["sets"][_currentSetNo]["type"] == "clue") {
            currentAudio = "sb_audio_1710";
            viewDataObj.playAudio(currentAudio, function() {
                executeLogic({type: curFrame});
            }, 0.25);
        }
    }


    function highlightLocation() {
        $(".locationOfAnswer, .onlyAns").css({"background-color": "#FFE7B9",
            "box-shadow": "0 12px 15px -6px #FFE7B9"
        });
    }

    function func22()
    {
        prevFrame = curFrame
        updateCurrentFrame('F22');
        isClickedWithin2sec = false;
        console.log("inside func22");
        fishAnim("pi1", 1);
        fishAnim("pi2", -1);
        currentAudio = "wb_audio_123"; //yes
        viewDataObj.playAudio(currentAudio, function() {

            if (questionPool[_currentBlockNo]["sets"][_currentSetNo]["type"] == "fact") {
                currentAudio = "sb_audio_17011";
                viewDataObj.playAudio(currentAudio, function() {
                    playSoFragment(function() {
                        currentAudio = "sb_audio_1714";
                        viewDataObj.playAudio(currentAudio, function() {
                            criteriaCheker();
                        }, 0.25);
                    })

                }, 0.25);
            } else if (questionPool[_currentBlockNo]["sets"][_currentSetNo]["type"] == "clue") {
                currentAudio = "sb_audio_4512";
                viewDataObj.playAudio(currentAudio, function() {

                    playSoFragment(function() {
                        currentAudio = "sb_audio_1705";
                        viewDataObj.playAudio(currentAudio, function() {
                            criteriaCheker();
                        }, 0.25);
                    })

                }, 0.25);
            }

        });
        function playSoFragment(_cb) {

            currentAudio = "sb_audio_17012";
            viewDataObj.playAudio(currentAudio, function() {
                _cb();
            });
        }
    }

    var isPhaseCriteriaMet = false;
    function criteriaCheker() {

        _currentSetNo++;
        if (_currentSetNo == 4) {
            isPhaseCriteriaMet = true;
        }

        if (_currentSetNo > (questionPool[_currentBlockNo]["sets"].length - 1))
        {
            _currentSetNo = 0;
        }

        if (!isPhaseCriteriaMet && _currentSetNo == 3)
        {
            console.log("criteriaCheker 1");
            executeLogic({type: curFrame, goto: "func23()"});
        }
        else if (!isPhaseCriteriaMet && _currentSetNo < 3)
        {
            console.log("criteriaCheker 2");
            executeLogic({type: curFrame, goto: "func11()"});
        } else if (isPhaseCriteriaMet && _phase == 0)
        {
            console.log("criteriaCheker 3");
            _phase++;
            isPhaseCriteriaMet = false;
            executeLogic({type: curFrame, goto: "func24()"});
        } else if (isPhaseCriteriaMet && _phase == 1)
        {
            console.log("criteriaCheker 4");
            _phase++;
            isPhaseCriteriaMet = false;
            executeLogic({type: curFrame, goto: "func27()"});
        }
    }

    function func23()
    {
        prevFrame = curFrame
        updateCurrentFrame('F23');
        console.log("inside func23");
        clearEverything();
        currentAudio = "ab_audio_168";
        viewDataObj.playAudio(currentAudio, function() {

            currentAudio = "sb_audio_1699";
            viewDataObj.playAudio(currentAudio, function() {
                executeLogic({type: curFrame, goto: "func11()"});
            });
        });
    }

    clearEverything = function() {
        $(paraDiv).html(" ");
        $(qtnDiv).html(" ");
        $(".ans").html(" ");
        $(".jsflPicCanvas").hide();
    };
    function func24()
    {
        prevFrame = curFrame
        updateCurrentFrame('F24');
        console.log("inside func24");
        clearEverything();
        $(".pi1").animate({"top": "24px"}, 1700, function() {
        });
        currentAudio = "ab_audio_169";
        viewDataObj.playAudio(currentAudio, function() {

            currentAudio = "sb_audio_2818";
            viewDataObj.playAudio(currentAudio, function() {
                executeLogic({type: curFrame});
            });
        });
    }

    function func25()
    {
        prevFrame = curFrame
        updateCurrentFrame('F25');
        console.log("inside func25");
        currentAudio = "sb_audio_17014";
        viewDataObj.playAudio(currentAudio, function() {
            questionPool = contentObj["segData"]["stimulus"]["phases"][_phase]["blocks"];
            executeLogic({type: curFrame});
        }, .5);
    }

    function func26()
    {
        prevFrame = curFrame
        updateCurrentFrame('F26');
        console.log("inside func26");
        $(".fish").css({"top": "286px"});
        drawFishAnim("orange", 1);
        drawFishAnim("yellow", 1);
        makeJsflPicDiv();
        currentAudio = "sb_audio_1686"; // who u want to be
        viewDataObj.playAudio(currentAudio, function() {
            activateFish(true);
            setTimer(5, function() {
                func7TimeOut++;
                executeLogic({type: curFrame, timeout: func7TimeOut, click: false});
            });
        });
    }

    function func27()
    {
        prevFrame = curFrame
        updateCurrentFrame('F27');
        console.log("inside func27");
        _phase = 2;
        clearEverything();
        $(".pi1").animate({"top": "24px"}, 1700, function() {
        });
        currentAudio = "ab_audio_169";
        viewDataObj.playAudio(currentAudio, function() {

            currentAudio = "ab_audio_106";
            viewDataObj.playAudio(currentAudio, function() {

                currentAudio = "sb_audio_17015";
                viewDataObj.playAudio(currentAudio, function() {
                    executeLogic({type: curFrame});
                }, .25);
            });
        });
    }

    function func28()
    {
        prevFrame = curFrame
        updateCurrentFrame('F28');
        console.log("inside func28");
        questionPool = contentObj["segData"]["stimulus"]["phases"][_phase]["sets"];
        currentAudio = "sb_audio_17016"; //this is the final race
        viewDataObj.playAudio(currentAudio, function() {

            currentAudio = "sb_audio_1864"; //get ready
            viewDataObj.playAudio(currentAudio, function() {
                executeLogic({type: curFrame});
            });
        }, .5);
    }

    function func29()
    {
        prevFrame = curFrame
        updateCurrentFrame('F29');
        console.log("inside func29");
        $(".fish").css({"top": "286px"});
        drawFishAnim("orange", 1);
        drawFishAnim("yellow", 1);

        currentAudio = "sb_audio_1686"; // who u want to be
        viewDataObj.playAudio(currentAudio, function() {
            activateFish(true);
            setTimer(5, function() {
                func7TimeOut++;
                executeLogic({type: curFrame, timeout: func7TimeOut, click: false});
            });
        });
    }

    function func30()
    {
        prevFrame = curFrame
        updateCurrentFrame('F30');
        console.log("inside func30");
        currentAudio = "sb_audio_1687";
        viewDataObj.playAudio(currentAudio, function() {
            currentAudio = "sb_audio_1688";
            viewDataObj.playAudio(currentAudio, function() {
                executeLogic({type: curFrame});
            }, 0.5);
        }, 0.25);
    }


    var phase3PresentationCounter = 0;
    function func31()
    {
        prevFrame = curFrame;
        updateCurrentFrame('F31');
        console.log("inside func31");
        $(".jsflPicCanvas").show();
        isFirstTym = false;
        currentClickedID = questionPool[_currentSetNo]["type"];
        drawPicJsfl();
        makeJsflPicDiv();
        phase3PresentationCounter++;

        currentAudio = "sb_audio_17000";
        viewDataObj.playAudio(currentAudio, function() {
            executeLogic({type: curFrame});
        }, 0.5);
    }

    function func32()
    {
        _currentSetNo++;
        if (_currentSetNo > (questionPool.length - 1))
        {
            _currentSetNo = 0;
        }
        currentClickedID = questionPool[_currentSetNo]["type"];
        prevFrame = curFrame
        updateCurrentFrame('F32');
        console.log("inside func32");

        clearEverything();
        $(".jsflPicCanvas").show();
        drawPicJsfl();
        makeJsflPicDiv();
        makeParagraphDiv();
        makeQuestionDiv();
        makeAnswerDiv();

        var doAudioArr = ["sb_audio_1690", "sb_audio_215", "sb_audio_216"];
        shuffle(doAudioArr);

        currentAudio = doAudioArr[0];
        viewDataObj.playAudio(currentAudio, function() {
            //executeLogic({type: curFrame});

            activatePic(true);
    
        controlObj.setTimer("pause2Sec", 2, function() {
            controlObj.stopAnim("pause2Sec");
            isClickedWithin2sec = true;
        });

            controlObj.setTimer("pause60Sec", 60, function() {
                controlObj.stopAnim("pause60Sec");
                globalTimerCounter++;
                executeLogic({type: curFrame,timeOut:true});
            }, false);

        }, 0.1);

    }

    var func33Counter = 0;
    function func33()
    {
        prevFrame = curFrame
        updateCurrentFrame('F33');
        console.log("inside func33");
        func33Counter++;
        currentAudio = "sb_audio_4505";
        viewDataObj.playAudio(currentAudio, function() {
            currentAudio = "sb_audio_1692";
            viewDataObj.playAudio(currentAudio, function() {
                activatePic(true);

                controlObj.setTimer("pause2Sec", 2, function() {
            controlObj.stopAnim("pause2Sec");
            isClickedWithin2sec = true;
        });

                controlObj.setTimer("pause60Sec", 60, function() {
                    controlObj.stopAnim("pause60Sec");
                    globalTimerCounter++;
                    executeLogic({type: curFrame,timeOut:true});
                }, false);
            }, 0.5);
        }, 0.5);
    }


    function func34()
    {
        prevFrame = curFrame
        updateCurrentFrame('F34');
        console.log("inside func34");

        $(".jsflPicCanvas").hide();
        activatePic(false);

        currentAudio = "sb_audio_1693";
        viewDataObj.playAudio(currentAudio, function() {

            isClickedWithin2sec=true;
            $(".jsflPicCanvas").show();
            activatePic(true);

            controlObj.setTimer("pause60Sec", 60, function() {
                controlObj.stopAnim("pause60Sec");
                globalTimerCounter++;
                executeLogic({type: curFrame,timeOut:true});
            }, false);

        });
    }

    var func35Counter = 0;
    function func35()
    {
        prevFrame = curFrame
        updateCurrentFrame('F35');
        console.log("inside func35");

        isClickedWithin2sec=true;
        func35Counter++;
        if (func35Counter % 2 == 0)
        {
            executeLogic({type: curFrame, goto: "func36()"});
        }
        else
        {
            executeLogic({type: curFrame, goto: "func34()"});
        }
    }

    function func36()
    {
        prevFrame = curFrame
        updateCurrentFrame('F36');
        console.log("inside func36");

        $(".jsflPicCanvas").hide();
        activatePic(false);

        currentAudio = "sb_audio_2512";
        viewDataObj.playAudio(currentAudio, function() {

            $(".jsflPicCanvas").show();
            activatePic(true);

            controlObj.setTimer("pause60Sec", 60, function() {
                controlObj.stopAnim("pause60Sec");
                globalTimerCounter++;
                executeLogic({type: curFrame,timeOut:true});
            }, false);
        });
    }

    var phase3ErrHolder = {fact: 0, clue: 0, mostly: 0, vocab: 0};
    function func37()
    {
        prevFrame = curFrame
        updateCurrentFrame('F37');
        console.log("inside func37");
        isClickedWithin2sec = false;
        phase3ErrHolder[_divID] += 1;

        var pi1Top = getOffset($(".pi1"));
        var pi2Top = getOffset($(".pi2"));

        if (pi1Top.offset.top > pi2Top.offset.top) {
            fishAnim("pi1", -1);
        }

        questionPool.push(questionPool.shift());

        currentAudio = "wb_audio_40";
        viewDataObj.playAudio(currentAudio, function() {

            currentAudio = "sb_audio_760";
            viewDataObj.playAudio(currentAudio, function() {
                if (phase3ErrHolder[_divID] == 1)
                {
                    executeLogic({type: curFrame, goto: "func39()"});
                } else if (phase3ErrHolder[_divID] >= 2 && phase3PresentationCounter <= 20)
                {
                    executeLogic({type: curFrame, goto: "func41()"});
                } else if (phase3PresentationCounter > 20) {
                    executeLogic({type: curFrame, goto: "func38()"});
                }
            }, 0.1);
        }, 0.2);

    }

    function func38()
    {
        prevFrame = curFrame
        updateCurrentFrame('F38');
        console.log("inside func38");

        clearEverything();

        currentAudio = "sb_audio_1703";
        viewDataObj.playAudio(currentAudio, function() {
            currentAudio = "sb_audio_1704";
            viewDataObj.playAudio(currentAudio, function() {
                executeLogic({type: curFrame}); //Exit episode
            }, 0.1);
        }, 0.5);
    }

    function func39()
    {
        prevFrame = curFrame
        updateCurrentFrame('F39');
        console.log("inside func39");

        if (_divID == "fact" || _divID == "clue") {
            executeLogic({type: curFrame, goto: "func40()"});
        } else if (_divID == "mostly" || _divID == "vocab") {
            executeLogic({type: curFrame, goto: "func41()"});
        }

    }


    function func40()
    {
        prevFrame = curFrame
        updateCurrentFrame('F40');
        console.log("inside func40");

        highlightLocation();
        if (questionPool[_currentSetNo]["type"] == "fact") {
            currentAudio = "sb_audio_1695";
            viewDataObj.playAudio(currentAudio, function() {

                currentAudio = "sb_audio_4511";
                viewDataObj.playAudio(currentAudio, function() {
                    executeLogic({type: curFrame});
                });
            }, 0.25);
        } else if (questionPool[_currentSetNo]["type"] == "clue") {
            currentAudio = "sb_audio_4513";
            viewDataObj.playAudio(currentAudio, function() {

                currentAudio = "sb_audio_4510";
                viewDataObj.playAudio(currentAudio, function() {
                    executeLogic({type: curFrame});
                });
            }, 0.25);
        }

    }

    function func41()
    {
        prevFrame = curFrame
        updateCurrentFrame('F41');
        console.log("inside func41");

        highlightLocation();
        if (questionPool[_currentSetNo]["type"] == "fact") {
            currentAudio = "sb_audio_1708";
            viewDataObj.playAudio(currentAudio, function() {
                executeLogic({type: curFrame});
            }, 0.25);
        } else if (questionPool[_currentSetNo]["type"] == "clue") {
            currentAudio = "sb_audio_1710";
            viewDataObj.playAudio(currentAudio, function() {
                executeLogic({type: curFrame});
            }, 0.25);
        }

    }

    function func42()
    {
        prevFrame = curFrame
        updateCurrentFrame('F42');
        console.log("inside func42");

        isClickedWithin2sec = false;
        fishAnim("pi1", 1);
        fishAnim("pi2", -1);

        typeCounter[questionPool[_currentSetNo]["type"]] += 1;

        currentAudio = "wb_audio_123"; //yes
        viewDataObj.playAudio(currentAudio, function() {

            if (questionPool[_currentSetNo]["type"] == "fact") {

                currentAudio = "sb_audio_1714";
                viewDataObj.playAudio(currentAudio, function() {
                    phase3CriteriaChecker();
                }, 0.25);

            } else if (questionPool[_currentSetNo]["type"] == "clue") {

                currentAudio = "sb_audio_1705";
                viewDataObj.playAudio(currentAudio, function() {
                    phase3CriteriaChecker();
                }, 0.25);
            }

        });
    }

    var typeCounter = {fact: 0, clue: 0};
    var isAnytypeClrd = false;
    function phase3CriteriaChecker() {
        console.log("inside phase3CriteriaChecker");
        console.log("typercounter     ", typeCounter);

        if (typeCounter[questionPool[_currentSetNo]["type"]] == 2 && !isAnytypeClrd) {
            first: for (var i in questionPool) {
                second: for (var k in questionPool) {
                    if (questionPool[k]["type"] == _divID)
                    {
                        isAnytypeClrd = true;
                        questionPool.splice(k, 1);
                        i = 0;
                        break second;
                    }
                }
            }

            var gotoSetter = "func32()";
            for (var i in typeCounter)
            {
                if (typeCounter[i] == 1) {
                    gotoSetter = "func43()";
                }
            }

            executeLogic({type: curFrame, goto: gotoSetter});
        } else {

            if (isAnytypeClrd) {
                if (typeCounter[questionPool[_currentSetNo]["type"]] <= 1) {
                    executeLogic({type: curFrame, goto: "func43()"});   //learner has not met criteria & is 1 away from meeting it
                } else {
                    executeLogic({type: curFrame, goto: "func44()"});  //learner has met criteria
                }
            } else {
                executeLogic({type: curFrame, goto: "func32()"});  //learner has not met criteria and needs more than one more correct
            }

        }


    }


    function func43()
    {
        prevFrame = curFrame
        updateCurrentFrame('F43');
        console.log("inside func43");
        clearEverything();
        currentAudio = "ab_audio_168";
        viewDataObj.playAudio(currentAudio, function() {

            currentAudio = "sb_audio_1699";
            viewDataObj.playAudio(currentAudio, function() {
                executeLogic({type: curFrame});
            });
        });
    }

    function func44()
    {
        prevFrame = curFrame
        updateCurrentFrame('F44');
        console.log("inside func44");
        clearEverything();

        currentAudio = "ab_audio_169";
        viewDataObj.playAudio(currentAudio, function() {

            currentAudio = "ab_audio_106";
            viewDataObj.playAudio(currentAudio, function() {

                currentAudio = "sb_audio_17015";
                viewDataObj.playAudio(currentAudio, function() {
                    executeLogic({type: curFrame});
                }, .25);
            });
        });

    }



    var _currentBlockNo = 0;
    var _currentSetNo = 0;
    function shuffleSets()
    {
        if (_phase <= 1)
            return shuffle(contentObj["segData"]["stimulus"]["phases"][_phase]["blocks"][_currentBlockNo]["sets"]);
        else
            return shuffle(contentObj["segData"]["stimulus"]["phases"][_phase]["sets"]);
    }

    function randomIntFromInterval(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function generateQuestion()
    {
        console.log("generateQuestion")
        var _parentDiv = document.createElement("div");
        var _paragraphDiv = document.createElement("div");
        $(_paragraphDiv).css({
            "left": 0 + "px",
            "top": 0 + "px",
            "border": "1px solid red"
        });
        $(_parentDiv).css({
            "left": 0 + "px",
            "top": 0 + "px",
            "height": "500px",
            "width": "500px",
            "border": "1px solid red"
        });
        $(_parentDiv).appendTo($(elem["stage"]));
        $(_paragraphDiv).appendTo(_parentDiv);
        _paraContent = contentObj["segData"]["stimulus"]["phases"][_phase]["blocks"][0]["sets"][0].paragraph[0];
        $(_paragraphDiv).html(value(_paraContent));
        console.log(value(_paraContent), _paraContent)
    }

    function starBurst(_this, type, _cb)
    {
        var pos = getOffset($(_this));
        if (type == "box")
        {
            starBurstCanvas.width = globalResizeCalc(245);
            starBurstCanvas.height = globalResizeCalc(223);
        }
        else
        {
            starBurstCanvas.width = globalResizeCalc(207);
            starBurstCanvas.height = globalResizeCalc(202);
        }

        var centerX = pos.offset.x + pos.prop.width - 148 / 2 - starBurstCanvas.width / 2//$(_this).offset().left + $(_this).outerWidth()/2;
        var centerY = pos.offset.y + pos.prop.height / 2 - starBurstCanvas.height / 2//$(_this).offset().top + $(_this).outerHeight()/2;


        var obj;
        if (type == "box")
        {
            obj = customData["animations"]["starBurst"]["type"]["box"];
            $(starBurstCanvas).show().css({
                left: centerX,
                top: centerY
            });
        }
        else
        {
            obj = customData["animations"]["starBurst"]["type"]["circle"];
            $(starBurstCanvas).show().css({
                left: centerX + 18,
                top: centerY - 5
            });
        }

        viewDataObj.showAnim("intro", obj["startFrame"], obj["endFrame"], obj["jsfl"], starBurstCanvas, function() {
        }, function() {
            $(starBurstCanvas).hide();
            _cb ? _cb() : null;
        }, false);
    }
//=========================================================================

    function setTimer(_delay, _cb) {
////////////////////console.log.log.log(_cb)
        controlObj.stopAnim("globalTimer");
        controlObj.setTimer("globalTimer", _delay, function() {
            ////////////////////console.log.log.log("inside timer");
            LMS.noTimeOutCount++;
            _cb()
            //timer();
        }, false);
    }



    function updateCurrentFrame(_f)
    {
        curFrame = _f;
        trace(_f);
        viewDataObj.stopAudio(currentAudio)
    }

    function executeLogic(_obj)
    {
        controlObj.executeLogic(_obj)
    }
    this.executeView = function(_obj)
    {
        eval(_obj);
    }
}
;
