//-------------------------------------------- //
//   "Used_in" :" Episode 13 Segement 6 " //
//--------------------------------------------//

var Logic = function(_ref) {
    var _thisObj = this;
    var controlObj = _ref;
    var _gJSONRefArr;
    //==============================================
    this.init = function() {
        viewObj = controlObj.getViewObj();
        _thisObj.loadView();
    };
    //
    this.setData = function(objJSONContent)
    {
        _gJSONRefArr = objJSONContent;
    }
    //
    this.loadView = function()
    {
        controlObj.executeView("func0()");
    }
    //==============================================
    this.executeLogic = function(_obj)
    {
        console.log(_obj);
        switch (_obj.type)
        {
            case "F0":
                controlObj.executeView("func1()");
                break;
            case "F1":
                controlObj.executeView("func2()");
                break;
            case "F2":
                if (_obj["click"] && _obj["correct"])
                    controlObj.executeView("func4()");
                else if ((_obj["click"]) && !(_obj["correct"]))
                    controlObj.executeView("func3()");
                else
                    controlObj.executeView("func2()");
                break;
            case "F3":

                controlObj.executeView("func2()");

                break;
            case "F4":
                if (_obj["exitCriteria"])
                    controlObj.executeView("func5()");
                else
                    controlObj.executeView("func2()");
                break;

            case "F5":
                controlObj.executeView("func6()");
                break;

            case "F6":
                if (_obj["throughTime"] < 2 || !(_obj["click"]))
                    controlObj.executeView("func7()");
                else if (_obj["throughTime"] >= 2 || _obj["click"])
                    controlObj.executeView("func8()");
                break;

            case "F7":
                if (_obj["click"])
                    controlObj.executeView("func8()");
                else if (!(_obj["click"]) && _obj["timeout"] >= 3)
                    controlObj.executeView("func6()");
                else if (!(_obj["click"]) && _obj["timeout"] < 3)
                    controlObj.executeView("func7()");
                break;

            case "F8":
                //controlObj.executeView("func27()");
                controlObj.executeView("func9()");
                break;

            case "F9":
                controlObj.executeView(_obj["goto"]);
                break;

            case "F10":
                controlObj.executeView("func12()");
                break;

            case "F11":
                if (_obj["click"] && _obj["correct"])
                    controlObj.executeView("func22()");
                else if ((_obj["click"] && !_obj["correct"]))
                    controlObj.executeView("func18()");
                else if (!_obj["click"])
                    controlObj.executeView("func12b()");
                else if (_obj["flag"])
                    controlObj.executeView("func16()");
                break;

            case "F12b":
                controlObj.executeView(_obj.goto);
                break;

            case "F12":
                if (_obj["click"] && _obj["correct"])
                    controlObj.executeView("func22()");
                else if ((_obj["click"] && !_obj["correct"]))
                    controlObj.executeView("func18()");
                else if (!_obj["click"])
                    controlObj.executeView("func12b()");
                else if (_obj["flag"])
                    controlObj.executeView("func16()");
                break;

            case "F13":
                if (_obj["click"] && _obj["correct"])
                    controlObj.executeView("func22()");
                else if ((_obj["click"] && !_obj["correct"]))
                    controlObj.executeView("func18()");
                else if (!_obj["click"])
                    controlObj.executeView("func12b()");
                break;

            case "F14":
                if (_obj["click"] && _obj["correct"])
                    controlObj.executeView("func22()");
                else if ((_obj["click"] && !_obj["correct"]))
                    controlObj.executeView("func18()");
                else if (!_obj["click"])
                    controlObj.executeView("func12b()");
                break;

            case "F15":
                if (_obj["errorCount"] == 1 && (_obj["wType"] == "vocab" || _obj["wType"] == "mostly"))
                    controlObj.executeView("func17()");
                else if (_obj["errorCount"] == 1 && (_obj["wType"] == "fact" || _obj["wType"] == "clue"))
                    controlObj.executeView("func18()");
                else if (_obj["errorCount"] >= 2 && (_obj["trial"]) <= 40)
                    controlObj.executeView("func20()");
                if ((_obj["trial"]) > 40)
                    controlObj.executeView("func16()");
                break;

            case "F16":
                loadNextSegment(_obj["progress"])
                break;
            case "F17":
                if (_obj["click"] && _obj["correct"] && !(_obj["unprompted"]))
                    controlObj.executeView("func17b()");
                else if (_obj["click"] && !(_obj["correct"]))
                    controlObj.executeView("func20()");
                else if (!(_obj["click"]))
                    controlObj.executeView("func11()");
                break;

            case "F17b":
                if (_obj["correctCounter"] == _obj["exitCriteria"] - 1)
                    controlObj.executeView("func22()");
                else
                    controlObj.executeView("func10()");
                break;

            case "F18":
                controlObj.executeView(_obj["goto"]);
                break;

            case "F20":
                controlObj.executeView("func11()");
                break;

            case "F21":
                controlObj.executeView("func11()");
                break;

            case "F22":
                controlObj.executeView(_obj["goto"]);
                break;

            case "F23":
                controlObj.executeView(_obj["goto"]);
                break;

            case "F24":
                controlObj.executeView("func25()");
                break;

            case "F25":
                controlObj.executeView("func26()");
                break;

            case "F26":
                if (_obj["click"])
                    controlObj.executeView("func8()");
                else if (!(_obj["click"]) && _obj["timeout"] >= 3)
                    controlObj.executeView("func25()");
                else if (!(_obj["click"]) && _obj["timeout"] < 3)
                    controlObj.executeView("func26()");
                break;

            case "F27":
                controlObj.executeView("func28()");
                break;

            case "F28":
                controlObj.executeView("func29()");
                break;

            case "F29":
                if (_obj["click"])
                    controlObj.executeView("func30()");
                else if (!(_obj["click"]) && _obj["timeout"] >= 3)
                    controlObj.executeView("func28()");
                else if (!(_obj["click"]) && _obj["timeout"] < 3)
                    controlObj.executeView("func29()");
                break;

            case "F30":
                controlObj.executeView("func9()");
                break;

            case "F31":
                controlObj.executeView("func33()");
                break;

            case "F32":
                if (_obj["click"] && _obj["correct"])
                    controlObj.executeView("func42()");
                else if ((_obj["click"] && !_obj["correct"]))
                    controlObj.executeView("func37()");
                else if (_obj["timeOut"])
                    controlObj.executeView("func33()");
                else if (_obj["flag"])
                    controlObj.executeView("func35()");
                break;

            case "F33":
                if (_obj["click"] && _obj["correct"])
                    controlObj.executeView("func42()");
                else if ((_obj["click"] && !_obj["correct"]))
                    controlObj.executeView("func37()");
                else if (_obj["timeOut"])
                    controlObj.executeView("func33()");
                else if (_obj["flag"] && _obj["visitCounter"] <= 1)
                    controlObj.executeView("func34()");
                break;

            case "F34":
                if (_obj["click"] && _obj["correct"])
                    controlObj.executeView("func42()");
                else if ((_obj["click"] && !_obj["correct"]))
                    controlObj.executeView("func37()");
                else if (_obj["timeOut"])
                    controlObj.executeView("func33()");
                break;

            case "F35":
                controlObj.executeView(_obj["goto"]);
                break;

            case "F36":
                if (_obj["click"] && _obj["correct"])
                    controlObj.executeView("func42()");
                else if ((_obj["click"] && !_obj["correct"]))
                    controlObj.executeView("func37()");
                else if (_obj["timeOut"])
                    controlObj.executeView("func33()");
                break;

            case "F37":
                controlObj.executeView(_obj["goto"]);
                break;


            case "F38":
                loadNextSegment(_obj["progress"]);
                break;

            case "F39":
                controlObj.executeView(_obj["goto"]);
                break;

            case "F40":
                controlObj.executeView("func32()");
                break;

            case "F41":
                controlObj.executeView("func32()");
                break;

            case "F42":
                controlObj.executeView(_obj["goto"]);
                break;

            case "F43":
                controlObj.executeView("func32()");
                break;

            case "F44":
                loadNextSegment(_obj["progress"]);
                break;



        }
    }

    function loadNextSegment(_obj)
    {
        console.log(_obj);
        controlObj.segmentComplete(_obj);
    }
};