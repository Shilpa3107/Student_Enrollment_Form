var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = "/api/irl";
var jpdbIML ="/api/iml";
var studDBName = "STUD-DB";
var studRelationName = "StudData";
var connToken = "90932765|-31949278686098333|90948455";

$("#roll").focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);

}

function getStudrollAsJsonObj(){
    var roll = $('#roll').val();
    var jsonStr = {
        id: roll
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#name").val(record.name);
    $("#cl").val(record.cl);
    $("#bd").val(record.bd);
    $("#add").val(record.add);
    $("#ed").val(record.ed);

}
function resetForm(){
    $("#roll").val(" ");
    $("#name").val(" ");
    $("#cl").val(" ");
    $("#bd").val(" ");
    $("#add").val(" ");
    $("#ed").val(" ");
    $("#roll").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#update").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#roll").focus();

}

function validateData(){
    var roll, name, cl, bd, add, ed;
    roll = $("#roll").val();
    name = $("#name").val();
    cl = $("#cl").val();
    bd = $("#bd").val();
    add = $("#add").val();
    ed = $("#ed").val();

    if(roll === ' '){
        alert("Roll-No is missing");
        $("#roll").focus();
        return " ";
    }
    if(name === ' '){
        alert("Name is missing");
        $("#name").focus();
        return " ";
    }
    if (cl === " "){
        alert("Class is missing");
        $("#cl").focus();
        return " ";
    }
    if (bd===" "){
        alert("Birth-date is missing");
        $("#bd").focus();
        return " ";
    }
    if (add===" "){
        alert("Address is missing");
        $("#add").focus();
        return " ";
    }
    if (ed===" "){
        alert("Enrollment-No is missing");
        $("#ed").focus();
        return " ";
    }
    var jsonStrObj = {
        roll: roll,
        name: name,
        cl: cl,
        bd: bd,
        add: add,
        ed: ed
    };
    return JSON.stringify(jsonStrObj);
}

function getStud(){
    var studrollJsonObj = getStudrollAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, studDBName, studRelationName, studrollJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj.status === 400){
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#name").focus();
    }
    else if(resJsonObj.status === 200){
        
        $("#roll").prop("disabled",true);
        fillData(resJsonObj);

        $("#update").prop("disabled",false);
        $("#reset").prop('disabled',false);
        $("#name").focus();
    }
}
function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj === ' '){
        return " ";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, studDBName, studRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#roll").focus();
}

function updateData(){
    $("#update").prop("disabled",true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, studDBName, studRelationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#roll").focus();
}