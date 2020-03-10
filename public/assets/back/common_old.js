$(function(){
   $(".searchInput").change(function(){
       $(this).closest('#searchForm').submit();
   }) 
});
function exportTableToCSV1(filename) {
    if(filename == undefined || filename == ''){
        filename = 'export-data.csv';
    }
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++){
            if($(cols[j]).hasClass("export-field")){
                row.push(cols[j].innerText.replace(",",""));
            }
        }
        csv.push(row.join(","));
    }
    downloadCSV(csv.join("\n"), filename);
}



function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    csv ="\ufeff"+csv;
    csvFile = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);

    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function successMsg(msg, callback){
    if(msg == undefined){
        msg = "The operation is successful";
    }
    $.gritter.add({
        title: 'Alert',
        text: msg,
        class_name: 'gritter-success'
    });
    if(callback != undefined){
        callback();
    }
    return;
    /*swal({
        title: "",
        text: msg,
        type: "success",
        showCancelButton: false,
        closeOnConfirm: true,
        showLoaderOnConfirm: false,
    }, function () {
        if(callback != undefined){
            callback();
        }
    });*/
}

function errorMsg(msg, callback){
    if(msg == undefined){
        msg = "The operation happen errors";
    }
    swal({
        title: "",
        text: msg,
        type: "error",
        showCancelButton: false,
        closeOnConfirm: true,
        showLoaderOnConfirm: false,
    }, function () {
        if(callback != undefined){
            callback();
        }
    });
}

function confirmMsg(msg, callback){
    if(msg == undefined){
        msg = "Do you sure this operation!";
    }
    swal({
        title: "",
        text: msg,
        type: "info",
        showCancelButton: true,
        closeOnConfirm: true,
        showLoaderOnConfirm: false,
    }, function () {
        if(callback != undefined){
            callback();
        }
    });
}

$(function(){
    $(".date-picker").datetimepicker({
        format: 'YYYY-MM-DD',
        widgetPositioning:{
            vertical:'bottom'
        },
        keepOpen:false,
        useCurrent: false,
    });
})

function noExitImg(obj){
    $(obj).attr("src",public_path+"assets/images/default_no_image.jpg");
}
$(function(){
    $("#cropFileInput").change(function(){
        if ( $(this)[0].files && $(this)[0].files[0] ) {
            var FR= new FileReader();
            FR.onload = function(e) {
                $($("#cropFileInput").attr("targetinput")).attr( "src", e.target.result);
                $($("#cropFileInput").attr("targetinput")+"_val").val(e.target.result);
                var ratio = $($("#cropFileInput").attr("targetinput")+"_img").attr("ratio");
                if(ratio == undefined){
                    ratio = 1;
                }
                createCropperBox(e.target.result,ratio, function(data){
                    $($("#cropFileInput").attr("targetinput")+"_img").attr( "src", data);
                    $($("#cropFileInput").attr("targetinput")+"_val").val(data);
                    $($("#cropFileInput").attr("targetinput")+"_img").parent().removeClass("hidden");
                    if($($("#cropFileInput").attr("targetinput")+"_img").hasClass("subProductImg")){
                        nextShowInsertImgBtn($($("#cropFileInput").attr("targetinput")+"_img")[0]);
                    }
                    $("#crop-dialog").modal("hide");
                });
                $("#crop-dialog").modal("show");

                clearFileDlgValue();
            };
            FR.readAsDataURL( $(this)[0].files[0] );
            /* $($(this).attr("targetinput")+"_file").val($(this)[0].files[0].name);
             var id = $($($("#commonFileDialog").attr("targetinput")+"_file")).attr("id");
             id = id.split("_img_file")[0];
             $("input[name='"+id+"']").val($(this)[0].files[0].name);*/
        }
    });

    initFace();
});

function initFace(){
    var height = $("aside.right-side").height();
    var height0 = $(window).height();
    if(height0 > height+50){
        $("aside.right-side").css("height", (height0-50)+"px");
    }
}

function onClickFilgDlg(targetInput){
    $("#cropFileInput").attr("targetinput", targetInput);
    $("#cropFileInput").click();
}

function clearFileDlgValue(){
    try{
        if($.browser.msie) { // ie 일때 input[type=file] init.
            $("#cropFileInput").replaceWith( $("#filename").clone(true) );
        }
    }catch(e){
        $("#cropFileInput").val("");
    }
}

function goBack() {
    var url = getPageUrl();
    if (url != "")
        location.href = getPageUrl();
    else
        self.location = document.referrer;
}

function getPageUrl() {
    var url = readCookie("pageUrl");
    if (url == null)
        url = "";
    return url;
}


function createCookie(name, value, days, Tdom) {
    var Tdom = (Tdom) ? Tdom : "/";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=" + Tdom;
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

function setSearchFormUrl(){
    if($("#searchForm").length > 0){
        var url = $("#searchForm").attr("action")+"?"+$("#searchFrm").serialize();
        setPageUrl(url);
    }
}

function setPageUrl(url) {
    createCookie("pageUrl", url);
}

$(function(){
    setSearchFormUrl();
});

function loading_start(){
    $("body").loading({message:'<img style = "width:60px;" src = "'+public_path+'assets/loading/loading.gif">'});
    $("body").loading('start');
}
function loading_stop(){
    $("body").loading('stop');
}