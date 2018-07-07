
$(document).ready(function () {

    $(".datepicker").datepicker({ dateFormat: 'dd-mm-yy' });
    load_tableSorter();
    updateCounts();
    load_quicksearch();
    
    $(".info-box").hover(function () {
        $(this).css("border-color", "#57c8da");
        $(this).parent().find("span").css("color", "#57c8da");
    }, function () {
        $(this).css("border-color", "darkgray");
        $(this).parent().find("span").css("color", "black");
    });

});

function load_tableSorter() {
    $("#gridCamiones").tablesorter();
    $("#gridChoferes").tablesorter();
    $("#gridClientes").tablesorter();
    $("#gridClientes_Barraca").tablesorter();
    $("#gridCuadrillas").tablesorter();
    $("#gridProveedores").tablesorter();
    $("#gridFleteros").tablesorter();
    $("#gridCargadores").tablesorter();
    $("#gridProcesadores").tablesorter();

    // P�gina Configuraci�n
    $("#gridInternos").tablesorter();
    $("#gridTipos").tablesorter();
    $("#gridFormas").tablesorter();
    $("#gridEjes").tablesorter();
    $("#gridUsuarios").tablesorter();
}

function load_quicksearch() {
    // Source: https://www.youtube.com/watch?v=Sy2J7cUv0QM
    var gridClientes = $("#gridClientes tbody tr");
    var gridClientes_Barraca = $("#gridClientes_Barraca tbody tr");
    var gridProveedores = $("#gridProveedores tbody tr");
    var gridCuadrillas = $("#gridCuadrillas tbody tr");
    var gridCargadores = $("#gridCargadores tbody tr");
    var gridCamiones = $("#gridCamiones tbody tr");
    var gridChoferes = $("#gridChoferes tbody tr");
    var gridFleteros = $("#gridFleteros tbody tr");
    var gridProcesadores = $("#gridProcesadores tbody tr");

    $("#txbSearch").quicksearch(gridClientes);
    $("#txbSearch").quicksearch(gridClientes_Barraca);
    $("#txbSearch").quicksearch(gridProveedores);
    $("#txbSearch").quicksearch(gridCuadrillas);
    $("#txbSearch").quicksearch(gridCargadores);
    $("#txbSearch").quicksearch(gridCamiones);
    $("#txbSearch").quicksearch(gridChoferes);
    $("#txbSearch").quicksearch(gridFleteros);
    $("#txbSearch").quicksearch(gridProcesadores);
}

$(document).on('click', ".info-box", function () {
    show_grid($(this));

    $(".info-box").css("background", "white");
    $(".info-box").css("border-color", "darkgray");
    $(".info-box").parent().find("span").css("color", "black");

    $(this).css("background", "lightblue");
    $(this).css("border-color", "#57c8da");
    $(this).parent().find("span").css("color", "#57c8da");
});

var prm = Sys.WebForms.PageRequestManager.getInstance();
if (prm !== null) {
    prm.add_endRequest(function (sender, e) {
        if (sender._postBackSettings.panelsToUpdate !== null) {
            updateCounts();
        }
    });
};

function updateCounts() {
    var clientes_count = $("#divContent #hdnClientesCount").val();
    var clientes_count_barraca = $("#divContent #hdnClientesCount_Barraca").val();
    var proveedores_count = $("#divContent #hdnProveedoresCount").val();
    var cuadrillas_count = $("#divContent #hdnCuadrillasCount").val();
    var camiones_count = $("#divContent #hdnCamionesCount").val();
    var choferes_count = $("#divContent #hdnChoferesCount").val();
    var fleteros_count = $("#divContent #hdnFleterosCount").val();
    var cargadores_count = $("#divContent #hdnCargadoresCount").val();
    var procesadores_count = $("#divContent #hdnProcesadoresCount").val();

    // P�gina Configuraci�n
    var internos_count = $("#divContent #hdnInternosCount").val();
    var tipos_count = $("#divContent #hdnTiposCount").val();
    var formas_count = $("#divContent #hdnFormaCount").val();
    var ejes_count = $("#divContent #hdnEjesCount").val();
    var hdnUsuarioCount = $("#divContent #hdnUsuarioCount").val();

    $("#divBoxClientes .info-box-number").text(clientes_count);
    $("#divBoxClientes_Barraca .info-box-number").text(clientes_count_barraca);
    $("#divBoxProveedores .info-box-number").text(proveedores_count);
    $("#divBoxCuadrillas .info-box-number").text(cuadrillas_count);
    $("#divBoxCamiones .info-box-number").text(camiones_count);
    $("#divBoxChoferes .info-box-number").text(choferes_count);
    $("#divBoxFleteros .info-box-number").text(fleteros_count);
    $("#divBoxCargadores .info-box-number").text(cargadores_count);
    $("#divBoxProcesadores .info-box-number").text(procesadores_count);

    // P�gina Configuraci�n
    $("#divBoxInternos .info-box-number").text(internos_count);
    $("#divBoxTipos .info-box-number").text(tipos_count);
    $("#divBoxFormas .info-box-number").text(formas_count);
    $("#divBoxEjes .info-box-number").text(ejes_count);
    $("#divBoxUsuarios .info-box-number").text(hdnUsuarioCount);
}

function show_grid(element) {
    //Find the box parent
    var table_name = element.find(".info-box-text").text();
    if (table_name !== null) {

        var firstWord = table_name.substr(0, table_name.indexOf(' '));
        if (firstWord !== null && firstWord !== "") {
            table_name = firstWord;
        }

        $(".divTables").hide();
        switch (table_name.toLowerCase()) {
            case "clientes_particulares": {
                $("#divClientes").show();
                break;
            }
            case "clientes_barracas": {
                $("#divClientes_Barraca").show();
                break;
            }
            case "proveedores": {
                $("#divProveedores").show();
                break;
            }
            case "changadores": {
                $("#divCuadrillas").show();
                break;
            }
            case "camiones": {
                $("#divCamiones").show();
                break;
            }
            case "choferes": {
                $("#divChoferes").show();
                break;
            }
            case "fleteros": {
                $("#divFleteros").show();
                break;
            }
            case "cargadores": {
                $("#divCargadores").show();
                break;
            }
            case "procesadores": {
                $("#divProcesadores").show();
                break;
            }

            // P�gina Configuraci�n
            case "internos": {
                $("#divInternos").show();
                break;
            }
            case "tipos": {
                $("#divTipos").show();
                break;
            }
            case "formas": {
                $("#divFormas").show();
                break;
            }
            case "ejes": {
                $("#divEjes").show();
                break;
            }
            case "usuarios": {
                $("#divUsuarios").show();
                break;
            }
        }
    }

}

function setlblTableActive(name) {
    $("#lblTableActive").text(name);
}

function setTabActive(tabID) {
    $("div .tables").removeClass("box-active");
    $("div #" + tabID).addClass("box-active");

    var title = $("div #" + tabID + " .info-box-text").text();
    setlblTableActive(title);

    var count = $("div #" + tabID + " .info-box-number").text();
	$("#lblResultados").text(count);
}

function sidebar_action() {
	$("body").toggleClass('sidebar-collapse').toggleClass('sidebar-expanded-on-hover');
}

function box_collapse(element) {
      //Find the box parent
      var box = element.parents(".box").first();
      //Find the body and the footer
      var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
      if (!box.hasClass("collapsed-box")) {
        //Convert minus into plus
        element.children(":first")
            .removeClass("fa-minus")
            .addClass("fa-plus");
        //Hide the content
        box_content.slideUp(500, function () {
          box.addClass("collapsed-box");
        });
      } else {
        //Convert plus into minus
        element.children(":first")
            .removeClass("fa-plus")
            .addClass("fa-minus");
        //Show the content
        box_content.slideDown(500, function () {
          box.removeClass("collapsed-box");
        });
      }
}

$(document).on('click', ".btn-box-tool", function () {
    box_collapse($(this));
    load_tableSorter();

});

var QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();

// http://www.itorian.com/2013/02/jquery-ajax-get-and-post-calls-to.html
$("#txbSearchTable").on('input', function() {

    var url = "/Camiones/Search";
    var search = $(this).val();
    $.post(url, { Search: search }, function (data) {
        $("#msg").html(data);
    });

    //alert($(this).val());

});

    // maybe check the value is more than n chars or whatever
    //$.ajax({
    //    url: <%= Url.Action("txbSearchTable", "Camiones") %> + '/' + this.val(), // path to ajax request
    //    dataType: "html", // probably
    //    success: updateContainerWithResults
    //});

function updateContainerWithResults(data) {
    $("#resultsContainerElement").html(data);
}

