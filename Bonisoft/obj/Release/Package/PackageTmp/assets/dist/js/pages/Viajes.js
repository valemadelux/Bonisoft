/**** Local variables ****/

var upAdd = '<%=upAdd.ClientID%>';
var upGridViajesEnCurso = '<%=upGridViajesEnCurso.ClientID%>';

var VIAJE_EN_CURSO_ID_SELECTED;
var VIAJE_ID_SELECTED;

/**** Extras variables ****/

$(document).ready(function () {

    $('.popbox').popbox();

    bindEvents();

    //loadClickRemoveButton_event();

    (function ($, window, document) {
        var panelSelector = '[data-perform="panel-collapse"]';

        $(panelSelector).each(function () {
            var $this = $(this),
            parent = $this.closest('.panel'),
            wrapper = parent.find('.panel-wrapper'),
            collapseOpts = { toggle: false };

            if (!wrapper.length) {
                wrapper =
                parent.children('.panel-heading').nextAll()
                .wrapAll('<div/>')
                .parent()
                .addClass('panel-wrapper');
                collapseOpts = {};
            }
            wrapper
            .collapse(collapseOpts)
            .on('hide.bs.collapse', function () {
                $this.children('i').removeClass('fa-minus').addClass('fa-plus');
            })
            .on('show.bs.collapse', function () {
                $this.children('i').removeClass('fa-plus').addClass('fa-minus');
            });
        });
        $(document).on('click', panelSelector, function (e) {
            e.preventDefault();
            var parent = $(this).closest('.panel');
            var wrapper = parent.find('.panel-wrapper');
            wrapper.collapse('toggle');

            if ($(this).children('i').hasClass('fa-minus')) {
                $(this).children('i').removeClass('fa-minus').addClass('fa-plus');
            } else {
                $(this).children('i').removeClass('fa-plus').addClass('fa-minus');
            }
        });
    }(jQuery, window, document));


    (function ($, window, document) {
        var panelSelector = '[data-perform="panel-dismiss"]';
        $(document).on('click', panelSelector, function (e) {
            e.preventDefault();
            var parent = $(this).closest('.panel');
            removeElement();

            function removeElement() {
                var col = parent.parent();
                parent.remove();
                col.filter(function () {
                    var el = $(this);
                    return (el.is('[class*="col-"]') && el.children('*').length === 0);
                }).remove();
            }
        });
    }(jQuery, window, document));   

});


// attach the event binding function to every partial update
Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function (evt, args) {
    bindEvents();
});

function loadInputDDL() {
    // Order options
    //var my_options = $("#modalAdd_ddlClientes_chzn");
    //my_options.sort(function (a, b) {
    //    if (a.text > b.text) return 1;
    //    else if (a.text < b.text) return -1;
    //    else return 0
    //})
    //$("#modalAdd_ddlClientes_chzn").empty().append(my_options);

    // Dropdownlist input
    $(".chzn-select").chosen();
    $(".chzn-select-deselect").chosen({ allow_single_deselect: true });
}

function bindEvents() {
    $(".datepicker").datepicker({ dateFormat: 'dd-mm-yy' });
    $("#tabsViajes").tabs();
    $("#tabsNotificaciones").tabs();
    $("#gridViajesEnCurso").tablesorter();
    $("#gridViajes").tablesorter();

    $("#gridViajesEnCurso tr").click(function () {
        VIAJE_EN_CURSO_ID_SELECTED = $(this).find(".hiddencol").html();
    });

    $("#gridViajes tr").click(function () {
        VIAJE_ID_SELECTED = $(this).find(".hiddencol").html();
    });

    $("#aTabsViajes_1").click(function () {
        $("#btnUpdateViajesEnCurso").click();
    });

    $("#aTabsViajes_2").click(function () {
        $("#btnUpdateViajes").click();
    });

    // Source: https://www.youtube.com/watch?v=Sy2J7cUv0QM
    var gridViajes = $("#gridViajes tbody tr");
    var gridViajesEnCurso = $("#gridViajesEnCurso tbody tr");
    $("#txbSearchViajesEnCurso").quicksearch(gridViajesEnCurso);
    $("#txbSearchViajes").quicksearch(gridViajes);

    $('#txbSearchViajesEnCurso').keydown(function () {
        var count = "Resultados: " + $('#gridViajesEnCurso tr:visible').length;
        $("#lblGridViajesEnCursoCount").text(count);
    });

    $('#txbSearchViajes').keydown(function () {
        var count = "Resultados: " + $('#gridViajes tr:visible').length;
        $("#lblGridViajesCount").text(count);
    });

    // Copiar texto din�micamente
    $("#notif_Mercaderia2").text($("#txbMercaderiaValorCliente").val());
    $("#txbMercaderiaValorCliente").keyup(function () {
        $("#notif_Mercaderia2").text(numberWithCommas(this.value));
    });

    $("#notif_Flete1").text($("#txb_pesada2Peso_neto").val());
    $("#txb_pesada2Peso_neto").keyup(function () {
        $("#notif_Mercaderia1").text(numberWithCommas(this.value));
        $("#notif_Flete1").text(numberWithCommas(this.value));
    });

    // Hacer c�lculo de Venta
    calcularPrecioVenta();

    // Permitir s�lo n�meros y punto
    $("#txbMercaderiaValorProveedor").keydown(function (event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || event.keyCode == 110 ||
            // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
    $("#txb_pesada1Peso_bruto").keydown(function (event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || event.keyCode == 110 ||
            // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
    $("#txb_pesada1Peso_neto").keydown(function (event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || event.keyCode == 110 ||
            // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
    $("#txb_pesada2Peso_bruto").keydown(function (event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || event.keyCode == 110 ||
            // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
    $("#txb_pesada2Peso_neto").keydown(function (event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || event.keyCode == 110 ||
            // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });

}

function copiarPesadas(isOrigen) {
    if (isOrigen === 1) {
        var txb_pesada2Lugar = $("#txb_pesada2Lugar").val();
        var txb_pesada2Fecha = $("#txb_pesada2Fecha").val();
        var txb_pesada2Peso_bruto = $("#txb_pesada2Peso_bruto").val();
        var txb_pesada2Peso_neto = $("#txb_pesada2Peso_neto").val();
        //var txb_pesada2Nombre = $("#txb_pesada2Nombre").val();

        $("#txb_pesada1Lugar").val(txb_pesada2Lugar);
        $("#txb_pesada1Fecha").val(txb_pesada2Fecha);
        $("#txb_pesada1Peso_bruto").val(txb_pesada2Peso_bruto);
        $("#txb_pesada1Peso_neto").val(txb_pesada2Peso_neto);
        //$("#txb_pesada1Nombre").val(txb_pesada2Nombre);

    } else {
        var txb_pesada1Lugar = $("#txb_pesada1Lugar").val();
        var txb_pesada1Fecha = $("#txb_pesada1Fecha").val();
        var txb_pesada1Peso_bruto = $("#txb_pesada1Peso_bruto").val();
        var txb_pesada1Peso_neto = $("#txb_pesada1Peso_neto").val();
        //var txb_pesada1Nombre = $("#txb_pesada1Nombre").val();

        $("#txb_pesada2Lugar").val(txb_pesada1Lugar);
        $("#txb_pesada2Fecha").val(txb_pesada1Fecha);
        $("#txb_pesada2Peso_bruto").val(txb_pesada1Peso_bruto);
        $("#txb_pesada2Peso_neto").val(txb_pesada1Peso_neto);
        //$("#txb_pesada2Nombre").val(txb_pesada1Nombre);
    }
}

function BorrarViajeEnCurso(viaje_ID) {

    $("#txbClave").val("");
    $("#txbClave").show();

    $('#dialog_borrarViaje p').text(hashMessages['Confirmacion']);
    $("#dialog_borrarViaje").dialog({
        open: {},
        resizable: false,
        height: 230,
        modal: true,
        buttons: {
            "Confirmar": function () {

                var userID = globalUserID;
                if (viaje_ID > 0 && userID != null && userID != "") {
                    var viajeID_str = viaje_ID.toString();

                    var txbClave = $("#txbClave").val();
                    if (txbClave != null && txbClave.length > 0) {

                    // Ajax call parameters
                        console.log("Ajax call: Viajes.aspx/BorrarViajeEnCurso. Params:");
                        console.log("viajeID_str, type: " + type(viajeID_str) + ", value: " + viajeID_str);
                        console.log("userID, type: " + type(userID) + ", value: " + userID);
                        console.log("txbClave, type: " + type(txbClave) + ", value: " + txbClave);
                    
                    // Check existen mercader�as
                    $.ajax({
                        type: "POST",
                        url: "Viajes.aspx/BorrarViajeEnCurso",
                        data: '{viajeID_str: "' + viajeID_str + '", userID: "' + userID + '", clave_str: "' + txbClave + '"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            var resultado = response.d;
                            switch (resultado) {
                                case 0: {
                                    // Error interno
                                    show_message_info('Error_Datos');
                                    break;
                                }
                                case 1: {
                                    // OK
                                    show_message_info('OK_BorrarViaje');

                                    //$(this).dialog("close");
                                    $("#dialog_borrarViaje").dialog("close");

                                    // Actualizar tabla
                                    //$("#btnUpdateViajesEnCurso").click();
                                    $('#aTabsViajes_1').click();

                                    break;
                                }
                                case 2: {
                                    // Error de clave
                                    show_message_info('Error_clave');
                                    break;
                                }
                                case 3: {
                                    // Error de usuario
                                    show_message_info('Error_usuario');
                                    break;
                                }
                            }

                            $("#txbClave").val("");

                        }, // end success
                        failure: function (response) {
                            show_message_info('Error_Datos');
                            $("#txbClave").val("");
                        }
                    }); // Ajax

                    } else {
                        show_message_info('IngresarClave');
                    }
                }
            },
            "Cancelar": function () {
                //$(this).dialog("close");
                $("#dialog_borrarViaje").dialog("close");
                $("#txbClave").val("");

                return false;
            }
        }
    }); 
}

function guardarPesadas(isOrigen) {

    var ok_continue = false;
    var hdn_notificaciones_viajeID = $("#hdn_notificaciones_viajeID");
    if (hdn_notificaciones_viajeID !== null && hdn_notificaciones_viajeID.val() !== null && hdn_notificaciones_viajeID.val().length > 0) {
        var viajeID_str = hdn_notificaciones_viajeID.val();

        // Ajax call parameters
        console.log("Ajax call: Viajes.aspx/Check_Mercaderias. Params:");
        console.log("viajeID_str, type: " + type(viajeID_str) + ", value: " + viajeID_str);

        // Check existen mercader�as
        $.ajax({
            type: "POST",
            url: "Viajes.aspx/Check_Mercaderias",
            data: '{viajeID_str: "' + viajeID_str + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var ok = response.d;
                if (ok) {
                    var txb_pesadaLugar = $("#txb_pesada1Lugar").val();
                    var txb_pesadaFecha = $("#txb_pesada1Fecha").val();
                    var txb_pesadaPeso_bruto = $("#txb_pesada1Peso_bruto").val();
                    var txb_pesadaPeso_neto = $("#txb_pesada1Peso_neto").val();
                    //var txb_pesadaNombre = $("#txb_pesada1Nombre").val();
                    var txb_pesadaComentarios = $("#txb_pesada1Comentarios").val();

                    var hdn_notificacionesPesadaID = "";

                    if (isOrigen === 1) {
                        txb_pesadaLugar = $("#txb_pesada1Lugar").val();
                        txb_pesadaFecha = $("#txb_pesada1Fecha").val();
                        txb_pesadaPeso_bruto = $("#txb_pesada1Peso_bruto").val();
                        txb_pesadaPeso_neto = $("#txb_pesada1Peso_neto").val();
                        //txb_pesadaNombre = $("#txb_pesada1Nombre").val();
                        txb_pesadaComentarios = $("#txb_pesada1Comentarios").val();

                        hdn_notificacionesPesadaID = $("#hdn_notificacionesPesadaID");

                    } else {
                        txb_pesadaLugar = $("#txb_pesada2Lugar").val();
                        txb_pesadaFecha = $("#txb_pesada2Fecha").val();
                        txb_pesadaPeso_bruto = $("#txb_pesada2Peso_bruto").val();
                        txb_pesadaPeso_neto = $("#txb_pesada2Peso_neto").val();
                        //txb_pesadaNombre = $("#txb_pesada2Nombre").val();
                        txb_pesadaComentarios = $("#txb_pesada2Comentarios").val();

                        hdn_notificacionesPesadaID = $("#hdn_notificacionesPesadaDestinoID");
                    }

                    if (hdn_notificacionesPesadaID !== null) {

                        var pesadaID_str = hdn_notificacionesPesadaID.val();

                        // Ajax call parameters
                        console.log("Ajax call: Viajes.aspx/GuardarPesadas. Params:");
                        console.log("viajeID_str, type: " + type(viajeID_str) + ", value: " + viajeID_str);
                        console.log("isOrigen, type: " + type(isOrigen) + ", value: " + isOrigen);
                        console.log("pesadaID_str, type: " + type(pesadaID_str) + ", value: " + pesadaID_str);
                        console.log("txb_pesadaLugar, type: " + type(txb_pesadaLugar) + ", value: " + txb_pesadaLugar);
                        console.log("txb_pesadaFecha, type: " + type(txb_pesadaFecha) + ", value: " + txb_pesadaFecha);
                        console.log("txb_pesadaPeso_bruto, type: " + type(txb_pesadaPeso_bruto) + ", value: " + txb_pesadaPeso_bruto);
                        console.log("txb_pesadaPeso_neto, type: " + type(txb_pesadaPeso_neto) + ", value: " + txb_pesadaPeso_neto);
                        //console.log("txb_pesadaNombre, type: " + type(txb_pesadaNombre) + ", value: " + txb_pesadaNombre);
                        console.log("txb_pesadaComentarios, type: " + type(txb_pesadaComentarios) + ", value: " + txb_pesadaComentarios);

                        $.ajax({
                            type: "POST",
                            url: "Viajes.aspx/GuardarPesadas",
                            data: '{viajeID_str: "' + viajeID_str + '",isOrigen: "' + isOrigen + '",pesadaID_str: "' + pesadaID_str + '",txb_pesadaLugar_str: "' + txb_pesadaLugar + '",txb_pesadaFecha_str: "' + txb_pesadaFecha + '", ' +
                                'txb_pesadaPeso_bruto_str: "' + txb_pesadaPeso_bruto + '",txb_pesadaPeso_neto_str: "' + txb_pesadaPeso_neto + '", txb_pesadaComentarios_str: "' + txb_pesadaComentarios + '"}',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (response) {
                                var resultado_1 = response.d;

                                resultado_1 = resultado_1.replace(/,/g, '.');

                                var resultado_2 = resultado_1.split("|");
                                var ok = resultado_2[0];
                                var precio_compra_str = resultado_2[1];

                                if (precio_compra_str !== null) {
                                    var precio_compra = TryParseFloat(precio_compra_str, 0);
                                    if (precio_compra > 0) {
                                        //var notif_lblPrecioCompra = $("label[id*='notif_lblPrecioCompra']");
                                        //if (notif_lblPrecioCompra !== null) {
                                        //    notif_lblPrecioCompra.text(precio_compra);
                                        //}
                                    }
                                }

                                var notif_lblPesoNeto = $(".notif_lblPesoNeto");
                                if (notif_lblPesoNeto !== null) {
                                    notif_lblPesoNeto.text(txb_pesadaPeso_neto);
                                }

                                if (ok === "True") {
                                    show_message_info('OK_Datos');
                                } else {
                                    show_message_info('Error_Datos');
                                }

                            }, // end success
                            failure: function (response) {
                                show_message_info('Error_Datos');

                            }
                        }); // Ajax
                    }

                } else {
                    show_message_info('Error_DatosMercaderias');
                }

            }, // end success
            failure: function (response) {
                show_message_info('Error_Datos');

            }
        }); // Ajax

    }
}

function guardarAmbasPesadas() {

    var ok_continue = false;
    var hdn_notificaciones_viajeID = $("#hdn_notificaciones_viajeID");
    if (hdn_notificaciones_viajeID !== null && hdn_notificaciones_viajeID.val() !== null && hdn_notificaciones_viajeID.val().length > 0) {
        var viajeID_str = hdn_notificaciones_viajeID.val();

            // Origen
            var txb_pesadaLugar1 = $("#txb_pesada1Lugar").val();
            var txb_pesadaFecha1 = $("#txb_pesada1Fecha").val();
            var txb_pesadaPeso_bruto1 = $("#txb_pesada1Peso_bruto").val();
            var txb_pesadaPeso_neto1 = $("#txb_pesada1Peso_neto").val();
            //var txb_pesadaNombre1 = $("#txb_pesada1Nombre").val();

            // Destino
            var txb_pesadaLugar2 = $("#txb_pesada2Lugar").val();
            var txb_pesadaFecha2 = $("#txb_pesada2Fecha").val();
            var txb_pesadaPeso_bruto2 = $("#txb_pesada2Peso_bruto").val();
            var txb_pesadaPeso_neto2 = $("#txb_pesada2Peso_neto").val();
            //var txb_pesadaNombre2 = $("#txb_pesada2Nombre").val();

            var txb_pesadaComentarios = $("#txb_pesadaComentarios").val();

            // Cambio "," por "." *** reemplazo ***
            txb_pesadaPeso_bruto1 = txb_pesadaPeso_bruto1.replace(/,/g, ".");
            txb_pesadaPeso_neto1 = txb_pesadaPeso_neto1.replace(/,/g, ".");
            txb_pesadaPeso_bruto2 = txb_pesadaPeso_bruto2.replace(/,/g, ".");
            txb_pesadaPeso_neto2 = txb_pesadaPeso_neto2.replace(/,/g, ".");

            // Ajax call parameters
            console.log("Ajax call: Viajes.aspx/GuardarPesadas. Params:");
            console.log("viajeID_str, type: " + type(viajeID_str) + ", value: " + viajeID_str);
            //console.log("isOrigen, type: " + type(isOrigen) + ", value: " + isOrigen);
            //console.log("pesadaID_str, type: " + type(pesadaID_str) + ", value: " + pesadaID_str);

            console.log("txb_pesadaLugar1, type: " + type(txb_pesadaLugar1) + ", value: " + txb_pesadaLugar1);
            console.log("txb_pesadaFecha1, type: " + type(txb_pesadaFecha1) + ", value: " + txb_pesadaFecha1);
            console.log("txb_pesadaPeso_bruto1, type: " + type(txb_pesadaPeso_bruto1) + ", value: " + txb_pesadaPeso_bruto1);
            console.log("txb_pesadaPeso_neto1, type: " + type(txb_pesadaPeso_neto1) + ", value: " + txb_pesadaPeso_neto1);
            //console.log("txb_pesadaNombre1, type: " + type(txb_pesadaNombre1) + ", value: " + txb_pesadaNombre1);

            console.log("txb_pesadaLugar2, type: " + type(txb_pesadaLugar2) + ", value: " + txb_pesadaLugar2);
            console.log("txb_pesadaFecha2, type: " + type(txb_pesadaFecha2) + ", value: " + txb_pesadaFecha2);
            console.log("txb_pesadaPeso_bruto2, type: " + type(txb_pesadaPeso_bruto2) + ", value: " + txb_pesadaPeso_bruto2);
            console.log("txb_pesadaPeso_neto2, type: " + type(txb_pesadaPeso_neto2) + ", value: " + txb_pesadaPeso_neto2);
            //console.log("txb_pesadaNombre2, type: " + type(txb_pesadaNombre2) + ", value: " + txb_pesadaNombre2);

            console.log("txb_pesadaComentarios, type: " + type(txb_pesadaComentarios) + ", value: " + txb_pesadaComentarios);

            // Mercader�a
            var txbMercaderiaValorProveedor = $("#txbMercaderiaValorProveedor").val();
            var ddlTipoLena = $("#ddlTipoLena").val();
            var txbMercaderia_Proveedor_Comentarios = $("#txbMercaderia_Proveedor_Comentarios").val();

            console.log("txbMercaderiaValorProveedor, type: " + type(txbMercaderiaValorProveedor) + ", value: " + txbMercaderiaValorProveedor);
            console.log("ddlTipoLena, type: " + type(ddlTipoLena) + ", value: " + ddlTipoLena);
            console.log("txbMercaderia_Proveedor_Comentarios, type: " + type(txbMercaderia_Proveedor_Comentarios) + ", value: " + txbMercaderia_Proveedor_Comentarios);

            $.ajax({
                type: "POST",
                url: "Viajes.aspx/GuardarPesadas2",
                data: '{viajeID_str: "' + viajeID_str + '",txb_pesadaLugar1: "' + txb_pesadaLugar1 + '",txb_pesadaFecha1: "' + txb_pesadaFecha1 + '", ' +
                    'txb_pesadaPeso_bruto1: "' + txb_pesadaPeso_bruto1 + '",txb_pesadaPeso_neto1: "' + txb_pesadaPeso_neto1 + '", ' +
                    'txb_pesadaLugar2: "' + txb_pesadaLugar2 + '",txb_pesadaFecha2: "' + txb_pesadaFecha2 + '", ' +
                    'txb_pesadaPeso_bruto2: "' + txb_pesadaPeso_bruto2 + '",txb_pesadaPeso_neto2: "' + txb_pesadaPeso_neto2 + '",txb_pesadaComentarios: "' + txb_pesadaComentarios + '", ' +
                'txbMercaderiaValorProveedor: "' + txbMercaderiaValorProveedor + '",ddlTipoLena: "' + ddlTipoLena + '", txbMercaderia_Proveedor_Comentarios: "' + txbMercaderia_Proveedor_Comentarios + '"}',

                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var resultado_1 = response.d;
                    var resultado_2 = resultado_1.split("|");
                    var ok = resultado_2[0];
                    var precio_compra_str = resultado_2[1];

                    if (precio_compra_str !== null) {
                        var precio_compra = TryParseFloat(precio_compra_str, 0);
                        if (precio_compra > 0) {
                            //var notif_lblPrecioCompra = $("label[id*='notif_lblPrecioCompra']");
                            //if (notif_lblPrecioCompra !== null) {
                            //    notif_lblPrecioCompra.text(precio_compra);
                            //}
                        }
                    }

                    if (ok === "True") {
                        show_message_info('OK_Datos');
                    } else {
                        show_message_info('Error_Datos');
                    }

                }, // end success
                failure: function (response) {
                    show_message_info('Error_Datos');

                }
            }); // Ajax
    }
}

function NuevoViaje() {

    var fecha1 = $("#modalAdd_txbFecha1").val();
    var fecha2 = $("#modalAdd_txbFecha2").val();
    var proveedor = $("#modalAdd_ddlProveedores").val();
    var cliente = $("#modalAdd_ddlClientes").val();
    var cliente_barraca = $("#modalAdd_ddlClientes_Barraca").val();
    var cargador = $("#modalAdd_ddlCargadores").val(); // Sobrenombre: Changadores / BD: Cuadrillas
    var lugar_carga = $("#modalAdd_txbLugarCarga").val();
    var fletero = $("#modalAdd_ddlFleteros").val();
    var camion = $("#modalAdd_ddlCamiones").val();
    var chofer = $("#modalAdd_ddlChoferes").val();
    var comentarios = $("#modalAdd_txbComentarios").val();

    var esBarraca = false;
    if ($('input[name=add_rad_cliente]:checked').val() == "barraca") {
        esBarraca = true;
    }

    // Ajax call parameters
    console.log("Ajax call: Viajes.aspx/NuevoViaje. Params:");
    console.log("fecha1, type: " + type(fecha1) + ", value: " + fecha1);
    console.log("fecha2, type: " + type(fecha2) + ", value: " + fecha2);
    console.log("proveedor, type: " + type(proveedor) + ", value: " + proveedor);
    console.log("cliente, type: " + type(cliente) + ", value: " + cliente);
    console.log("cliente_barraca, type: " + type(cliente_barraca) + ", value: " + cliente_barraca);
    console.log("cargador, type: " + type(cargador) + ", value: " + cargador);
    console.log("lugar_carga, type: " + type(lugar_carga) + ", value: " + lugar_carga);
    console.log("fletero, type: " + type(fletero) + ", value: " + fletero);
    console.log("camion, type: " + type(camion) + ", value: " + camion);
    console.log("chofer, type: " + type(chofer) + ", value: " + chofer);
    console.log("comentarios, type: " + type(comentarios) + ", value: " + comentarios);
    console.log("esBarraca, type: " + type(esBarraca) + ", value: " + esBarraca);

    $.ajax({
        type: "POST",
        url: "Viajes.aspx/NuevoViaje",
        data: '{fecha1: "' + fecha1 + '",fecha2: "' + fecha2 + '",proveedor: "' + proveedor +
            '",cliente: "' + cliente + '",cliente_barraca: "' + cliente_barraca + '",cargador: "' + cargador + '",lugar_carga: "' + lugar_carga + '",fletero: "' + fletero +
            '",camion: "' + camion + '",chofer: "' + chofer + '",comentarios: "' + comentarios + '",esBarraca: "' + esBarraca + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var ok = response.d;
            if (ok !== null && ok) {

                $('#dialog p').text(hashMessages['OK_ViajeNuevo']);
                $("#dialog").dialog({
                    open: {},
                    resizable: false,
                    height: 150,
                    modal: true,
                    buttons: {
                        "Aceptar": function () {
                            //$("#btnUpdateViajesEnCurso").click();
                            //$(this).dialog("close");

                            $('#aTabsViajes_1').click();
                            $("#dialog").dialog("close");

                            $.modal.close();
                            return true;
                        }
                    }
                });

            } else {
                show_message_info('Error_Datos');
            }

        }, // end success
        failure: function (response) {
            show_message_info('Error_Datos');

        }
    }); // Ajax

}

function DoCustomPost() {

    // Add Hdn Fields 
    var modalAdd_txbFecha1 = $("#modalAdd_txbFecha1").val();
    var modalAdd_txbFecha2 = $("#modalAdd_txbFecha2").val();
    var modalAdd_ddlProveedores = $("#modalAdd_ddlProveedores").val();
    var modalAdd_ddlClientes = $("#modalAdd_ddlClientes").val();
    var modalAdd_ddlCargadores = $("#modalAdd_ddlCargadores").val();
    var modalAdd_txbLugarCarga = $("#modalAdd_txbLugarCarga").val();
    var modalAdd_ddlFleteros = $("#modalAdd_ddlFleteros").val();
    var modalAdd_ddlCamiones = $("#modalAdd_ddlCamiones").val();
    var modalAdd_ddlChoferes = $("#modalAdd_ddlChoferes").val();
    var modalAdd_txbComentarios = $("#modalAdd_txbComentarios").val();

    $("#hdn_modalAdd_txbFecha1").val(modalAdd_txbFecha1);
    $("#hdn_modalAdd_txbFecha2").val(modalAdd_txbFecha2);
    $("#hdn_modalAdd_ddlProveedores").val(modalAdd_ddlProveedores);
    $("#hdn_modalAdd_ddlClientes").val(modalAdd_ddlClientes);
    $("#hdn_modalAdd_ddlCargadores").val(modalAdd_ddlCargadores);
    $("#hdn_modalAdd_txbLugarCarga").val(modalAdd_txbLugarCarga);
    $("#hdn_modalAdd_ddlFleteros").val(modalAdd_ddlFleteros);
    $("#hdn_modalAdd_ddlCamiones").val(modalAdd_ddlCamiones);
    $("#hdn_modalAdd_ddlChoferes").val(modalAdd_ddlChoferes);
    $("#hdn_modalAdd_txbComentarios").val(modalAdd_txbComentarios);

    // Edit Hdn Fields 
    var modalEdit_txbFecha1 = $("#modalEdit_txbFecha1").val();
    var modalEdit_txbFecha2 = $("#modalEdit_txbFecha2").val();
    var modalEdit_ddlProveedores = $("#modalEdit_ddlProveedores").val();
    var modalEdit_ddlClientes = $("#modalEdit_ddlClientes").val();
    var modalEdit_ddlCargadores = $("#modalEdit_ddlCargadores").val();
    var modalEdit_txbLugarCarga = $("#modalEdit_txbLugarCarga").val();
    var modalEdit_ddlFleteros = $("#modalEdit_ddlFleteros").val();
    var modalEdit_ddlCamiones = $("#modalEdit_ddlCamiones").val();
    var modalEdit_ddlChoferes = $("#modalEdit_ddlChoferes").val();
    var modalEdit_txbComentarios = $("#modalEdit_txbComentarios").val();

    $("#hdn_modalEdit_txbFecha1").val(modalEdit_txbFecha1);
    $("#hdn_modalEdit_txbFecha2").val(modalEdit_txbFecha2);
    $("#hdn_modalEdit_ddlProveedores").val(modalEdit_ddlProveedores);
    $("#hdn_modalEdit_ddlClientes").val(modalEdit_ddlClientes);
    $("#hdn_modalEdit_ddlCargadores").val(modalEdit_ddlCargadores);
    $("#hdn_modalEdit_txbLugarCarga").val(modalEdit_txbLugarCarga);
    $("#hdn_modalEdit_ddlFleteros").val(modalEdit_ddlFleteros);
    $("#hdn_modalEdit_ddlCamiones").val(modalEdit_ddlCamiones);
    $("#hdn_modalEdit_ddlChoferes").val(modalEdit_ddlChoferes);
    $("#hdn_modalEdit_txbComentarios").val(modalEdit_txbComentarios);
    
}

function DoPost_Pesadas() {

    // Hdn Fields - Pesada origen
    var txb_pesada1Lugar = $("#txb_pesada1Lugar").val();
    var txb_pesada1Fecha = $("#txb_pesada1Fecha").val();
    var txb_pesada1Peso_bruto = $("#txb_pesada1Peso_bruto").val();
    var txb_pesada1Peso_neto = $("#txb_pesada1Peso_neto").val();
    var txb_pesada1Nombre = $("#txb_pesada1Nombre").val();
    var txb_pesada1Comentarios = $("#txb_pesada1Comentarios").val();

    $("#hdn_modalNotificaciones_pesadas1_txbLugar").val(txb_pesada1Lugar);
    $("#hdn_modalNotificaciones_pesadas1_txbFecha").val(txb_pesada1Fecha);
    $("#hdn_modalNotificaciones_pesadas1_txbPesoBruto").val(txb_pesada1Peso_bruto);
    $("#hdn_modalNotificaciones_pesadas1_txbPesoNeto").val(txb_pesada1Peso_neto);
    $("#hdn_modalNotificaciones_pesadas1_txbNombre").val(txb_pesada1Nombre);
    $("#hdn_modalNotificaciones_pesadas1_txbComentarios").val(txb_pesada1Comentarios);

    // Hdn Fields - Pesada destino
    var txb_pesada2Lugar = $("#txb_pesada2Lugar").val();
    var txb_pesada2Fecha = $("#txb_pesada2Fecha").val();
    var txb_pesada2Peso_bruto = $("#txb_pesada2Peso_bruto").val();
    var txb_pesada2Peso_neto = $("#txb_pesada2Peso_neto").val();
    var txb_pesada2Nombre = $("#txb_pesada2Nombre").val();
    var txb_pesada2Comentarios = $("#txb_pesada2Comentarios").val();

    $("#hdn_modalNotificaciones_pesadas2_txbLugar").val(txb_pesada2Lugar);
    $("#hdn_modalNotificaciones_pesadas2_txbFecha").val(txb_pesada2Fecha);
    $("#hdn_modalNotificaciones_pesadas2_txbPesoBruto").val(txb_pesada2Peso_bruto);
    $("#hdn_modalNotificaciones_pesadas2_txbPesoNeto").val(txb_pesada2Peso_neto);
    $("#hdn_modalNotificaciones_pesadas2_txbNombre").val(txb_pesada2Nombre);
    $("#hdn_modalNotificaciones_pesadas2_txbComentarios").val(txb_pesada2Comentarios);

}

function guardarMercaderias() {

    // Hdn Fields - Pesada origen
    //var mercaderias_txbNew4 = $("#mercaderias_txbNew4").val();
    var mercaderias_txbNew5 = $("#mercaderias_txbNew5").val();
    var mercaderias_txbNew7 = $("#mercaderias_txbNew7").val();

    //$("#hdn_modalMercaderia_txbNew4").val(mercaderias_txbNew4);
    $("#hdn_modalMercaderia_txbNew5").val(mercaderias_txbNew5);
    $("#hdn_modalMercaderia_txbNew7").val(mercaderias_txbNew7);

}

function GetSelectedRow(lnk) {
    var mercaderias_txb4 = $("#mercaderias_txb4").val();
    var mercaderias_txb5 = $("#mercaderias_txb5").val();
    var mercaderias_txb6 = $("#mercaderias_txb6").val();
    var mercaderias_txb7 = $("#mercaderias_txb7").val();
    var mercaderias_ddlProcesador1 = $("#mercaderias_ddlProcesador1").val();
    
    $("#hdn_modalMercaderia_txb4").val(mercaderias_txb4);
    $("#hdn_modalMercaderia_txb5").val(mercaderias_txb5);
    $("#hdn_modalMercaderia_txb6").val(mercaderias_txb6);
    $("#hdn_modalMercaderia_txb7").val(mercaderias_txb7);
    $("#hdn_modalMercaderia_ddlProcesador1").val(mercaderias_ddlProcesador1);
}

function openNewWindows() {
    window.open("http://localhost:8083/Pages/Datos");
}

function showItems() {
    if (upAdd !== null) {
        //__doPostBack(upAdd, '');

        __doPostBack("<%=upAdd.UniqueID %>", "");
        //document.getElementById("<%=btnSubmit_upAdd.ClientID %>").click();
    }
}

function cargarDatos_PrecioVenta() {

    var hdn_notificaciones_viajeID = $("#hdn_notificaciones_viajeID");
    if (hdn_notificaciones_viajeID !== null && hdn_notificaciones_viajeID.val() !== null && hdn_notificaciones_viajeID.val().length > 0) {

        var viajeID_str = hdn_notificaciones_viajeID.val();

        // Ajax call parameters
        console.log("Ajax call: Viajes.aspx/Get_DatosVenta. Params:");
        console.log("viajeID_str, type: " + type(viajeID_str) + ", value: " + viajeID_str);

        // Obtengo datos de precio de venta
        $.ajax({
            type: "POST",
            url: "Viajes.aspx/Get_DatosVenta",
            data: '{viajeID_str: "' + viajeID_str + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                var datos = response.d;
                if (datos) {

                    /* ------------------------ OBTENGO DATOS ------------------------ */

                    datos = datos.replace(/,/g, '.');
                    
                    var datos_array = datos.split("|");
                    var precio_flete_str = datos_array[0];
                    var iva_str = datos_array[1];
                    var precio_descarga_str = datos_array[2];
                    var precio_mercaderia_str = datos_array[3];

                    /* ------------------------ OBTENGO CAMPOS ------------------------ */

                    // Datos Mercaderia
                    var notif_Mercaderia2 = $("#notif_Mercaderia2");
                    var notif_Mercaderia3 = $("#notif_Mercaderia3");

                    // Datos Flete
                    var notif_Flete2 = $("#notif_Flete2");
                    var notif_Flete3 = $("#notif_Flete3");
                    var notif_Flete4 = $("#notif_Flete4");
                    
                    // Datos Venta
                    var notif_Venta1 = $("label[id*=notif_Venta1]");
                    var notif_Venta2 = $("#notif_Venta2");
                    var notif_Venta3 = $("#notif_Venta3");

                    // Otros datos
                    var notif_lblPesoNeto = $(".notif_lblPesoNeto");
                    var txb_pesada1Peso_neto = $("#txb_pesada1Peso_neto");
                    var txb_pesada2Peso_neto = $("#txb_pesada2Peso_neto");

                    if (notif_Mercaderia2 !== null && notif_Mercaderia3 !== null && notif_Flete2 !== null && notif_Flete3 !== null && notif_Flete4 !== null && notif_Venta1 !== null && notif_Venta2 !== null 
                         && notif_Venta3 !== null && notif_lblPesoNeto !== null && txb_pesada1Peso_neto !== null && txb_pesada2Peso_neto !== null) {

                        /* ------------------------ SETEO DATOS ------------------------ */

                        // peso neto
                        var peso_neto_origen_str = txb_pesada1Peso_neto.val();
                        var peso_neto_destino_str = txb_pesada2Peso_neto.val();

                        var peso_neto_origen = TryParseFloat(peso_neto_origen_str, 0);
                        var peso_neto_destino = TryParseFloat(peso_neto_destino_str, 0);

                        // Si no tiene peso neto destino, tomo peso neto origen
                        if (peso_neto_destino === 0) {
                            peso_neto_destino = peso_neto_origen;
                        }
                        notif_lblPesoNeto.text(numberWithCommas(peso_neto_destino));

                        // Datos Mercaderia
                        notif_Mercaderia2.text(numberWithCommas(precio_mercaderia_str));

                        // Datos Flete
                        notif_Flete2.val(numberWithCommas(precio_flete_str));
                        notif_Flete3.val(numberWithCommas(iva_str));

                        // Datos Venta
                        notif_Venta2.val(numberWithCommas(precio_descarga_str));

                        /* ------------------------ CALCULO SUBTOTALES ------------------------ */

                        // Cambio "," por "."
                        precio_mercaderia_str = precio_mercaderia_str.replace(/,/g, ".");
                        precio_flete_str = precio_flete_str.replace(/,/g, ".");
                        iva_str = iva_str.replace(/,/g, ".");
                        precio_descarga_str = precio_descarga_str.replace(/,/g, ".");

                        // Parseo valores
                        var precioMercaderia = TryParseFloat(precio_mercaderia_str, 0);
                        var precioFlete = TryParseFloat(precio_flete_str, 0);
                        var IVA = TryParseInt(iva_str, 0);
                        var precioDescarga = TryParseFloat(precio_descarga_str, 0);

                        // Subtotal Mercaderia
                        var valor1 = peso_neto_destino * precioMercaderia;
                        valor1 = Math.round(valor1 * 100) / 100;                        
                        notif_Mercaderia3.text(numberWithCommas(valor1));

                        // Subtotal Flete
                        var valor2 = peso_neto_destino * precioFlete;
                        if (IVA > 0) {
                            var IVA_solo = valor2 * IVA / 100;
                            valor2 = valor2 + IVA_solo;
                        }
                        valor2 = Math.round(valor2 * 100) / 100;
                        notif_Flete4.text(numberWithCommas(valor2));

                        // Subtotal Venta
                        var valor3 = valor1 + valor2;
                        valor3 = Math.round(valor3 * 100) / 100;
                        notif_Venta1.text(numberWithCommas(valor3));

                        var valor4 = valor3 + precioDescarga;
                        valor4 = Math.round(valor4 * 100) / 100;
                        notif_Venta3.text(numberWithCommas(valor4));
                    }
                }

            }, // end success
            failure: function (response) {
                show_message_info('Error_Datos');

            }
        }); // Ajax

        //calcularPrecioVenta();
    }
}

function calcularPrecioVenta() {

    var ok_continue = false;

    var hdn_notificaciones_viajeID = $("#hdn_notificaciones_viajeID");
    if (hdn_notificaciones_viajeID !== null && hdn_notificaciones_viajeID.val() !== null && hdn_notificaciones_viajeID.val().length > 0) {

        var viajeID_str = hdn_notificaciones_viajeID.val();

        /* ------------------------ OBTENGO CAMPOS ------------------------ */

        // Datos Mercaderia
        //var notif_Mercaderia1 = $(".notif_lblPesoNeto").first();
        var notif_Mercaderia2 = $("#notif_Mercaderia2");
        var notif_Mercaderia3 = $("#notif_Mercaderia3");

        var notif_Mercaderia1 = $("#txb_pesada2Peso_neto");


        // Datos Flete
        var notif_Flete2 = $("#notif_Flete2");
        var notif_Flete3 = $("#notif_Flete3");
        var notif_Flete4 = $("#notif_Flete4");

        // Datos Venta
        var notif_Venta1 = $("label[id*=notif_Venta1]");
        var notif_Venta2 = $("#notif_Venta2");
        var notif_Venta3 = $("#notif_Venta3");

        // Otros datos

        if (notif_Mercaderia1 !== null && notif_Mercaderia2 !== null && notif_Mercaderia3 !== null && notif_Flete2 !== null && notif_Flete3 !== null && notif_Flete4 !== null && notif_Venta1 !== null && notif_Venta2 !== null
             && notif_Venta3 !== null) {

            /* ------------------------ SETEO DATOS ------------------------ */

            // peso neto
            //var peso_neto_destino_str = notif_Mercaderia1.text();
            var peso_neto_destino_str = notif_Mercaderia1.val();

            // Datos Mercaderia
            var precio_mercaderia_str = notif_Mercaderia2.text();

            // Datos Flete
            var precio_flete_str = notif_Flete2.val();
            var iva_str = notif_Flete3.val();

            // Datos Venta
            var precio_descarga_str = notif_Venta2.val();

            /* ------------------------ CALCULO SUBTOTALES ------------------------ */

            // Cambio "," por "."
            peso_neto_destino_str = peso_neto_destino_str.replace(/,/g, ".");
            precio_mercaderia_str = precio_mercaderia_str.replace(/,/g, ".");
            precio_flete_str = precio_flete_str.replace(/,/g, ".");
            iva_str = iva_str.replace(/,/g, ".");
            precio_descarga_str = precio_descarga_str.replace(/,/g, ".");

            // Parseo valores
            var peso_neto_destino = TryParseFloat(peso_neto_destino_str, 0);
            var precioMercaderia = TryParseFloat(precio_mercaderia_str, 0);
            var precioFlete = TryParseFloat(precio_flete_str, 0);
            var IVA = TryParseInt(iva_str, 0);
            var precioDescarga = TryParseFloat(precio_descarga_str, 0);

            // Subtotal Mercaderia
            var valor1 = peso_neto_destino * precioMercaderia;
            valor1 = Math.round(valor1 * 100) / 100;
            notif_Mercaderia3.text(numberWithCommas(valor1));

            // Subtotal Flete
            var valor2 = peso_neto_destino * precioFlete;
            if (IVA > 0) {
                var IVA_solo = valor2 * IVA / 100;
                valor2 = valor2 + IVA_solo;
            }
            valor2 = Math.round(valor2 * 100) / 100;
            notif_Flete4.text(numberWithCommas(valor2));

            // Subtotal Venta
            var valor3 = valor1 + valor2;
            valor3 = Math.round(valor3 * 100) / 100;
            notif_Venta1.text(numberWithCommas(valor3));

            var valor4 = valor3 + precioDescarga;
            valor4 = Math.round(valor4 * 100) / 100;
            notif_Venta3.text(numberWithCommas(valor4));

        }
    }
}

function ModificarViaje_1(viajeID) {

    if (viajeID > 0) {
        var viajeID_str = viajeID.toString();

        var hdn_editViaje_viajeID = $("#hdn_editViaje_viajeID");
        if (hdn_editViaje_viajeID !== null) {
            hdn_editViaje_viajeID.val(viajeID_str);

            // Ajax call parameters
            console.log("Ajax call: Viajes.aspx/ModificarViaje_1. Params:");
            console.log("viajeID_str, type: " + type(viajeID_str) + ", value: " + viajeID_str);

            $.ajax({
                type: "POST",
                url: "Viajes.aspx/ModificarViaje_1",
                data: '{viajeID_str: "' + viajeID_str + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var datos = response.d;
                    if (datos) {

                        datos = datos.replace(/,/g, '.');

                        var datos_array = datos.split("|");
                        var fecha1 = datos_array[0];
                        var fecha2 = datos_array[1];
                        var proveedor = datos_array[2];
                        var cliente = datos_array[3];
                        var cargador = datos_array[4];
                        var lugar_carga = datos_array[5];
                        var fletero = datos_array[6];
                        var camion = datos_array[7];
                        var chofer = datos_array[8];
                        var comentarios = datos_array[9];
                        var esBarraca = datos_array[10];

                        //$("#modalEdit_txbFecha1").val(moment(fecha1, "DD-MM-YYYY").format("DD-MM-YYYY"));
                        //$("#modalEdit_txbFecha2").val(moment(fecha2, "DD-MM-YYYY").format("DD-MM-YYYY"));

                        $("#modalEdit_txbFecha1").val(fecha1);
                        $("#modalEdit_txbFecha2").val(fecha2);
                        $("#modalEdit_txbComentarios").val(comentarios);

                        $(".modalEdit_ddlProveedores").val(proveedor).trigger("liszt:updated");
                        $(".modalEdit_ddlCargadores").val(cargador).trigger("liszt:updated");
                        $(".modalEdit_txbLugarCarga").val(lugar_carga).trigger("liszt:updated");
                        $(".modalEdit_ddlFleteros").val(fletero).trigger("liszt:updated");
                        $(".modalEdit_ddlCamiones").val(camion).trigger("liszt:updated");
                        $(".modalEdit_ddlChoferes").val(chofer).trigger("liszt:updated");

                        if (esBarraca != "1") {
                            $('#editModal_rad_cliente_1').prop("checked", true);
                            $('.modalEdit_ddlClientes_Barraca').val('').prop('disabled', true).trigger('liszt: updated');
                            $('.modalEdit_ddlClientes').val('').prop('disabled', false).trigger('liszt: updated');
                        } else {
                            $('#editModal_rad_cliente_2').prop("checked", true);
                            $('.modalEdit_ddlClientes_Barraca').val('').prop('disabled', false).trigger('liszt: updated');
                            $('.modalEdit_ddlClientes').val('').prop('disabled', true).trigger('liszt: updated');
                        }
                        $(".chzn-select").trigger("liszt:updated");

                        $('#editModal').modal('show');

                    } else {
                        show_message_info('Error_Datos');
                    }

                }, // end success
                failure: function (response) {
                    show_message_info('Error_Datos');
                }
            }); // Ajax

        }
    }
}

function ModificarViaje_2() {

    var hdn_editViaje_viajeID = $("#hdn_editViaje_viajeID");
    if (hdn_editViaje_viajeID !== null && hdn_editViaje_viajeID.val() !== null && hdn_editViaje_viajeID.val().length > 0) {
        var viajeID_str = hdn_editViaje_viajeID.val();

        var fecha1 = $("#modalEdit_txbFecha1").val();
        var fecha2 = $("#modalEdit_txbFecha2").val();
        var proveedor = $("#modalEdit_ddlProveedores").val();
        var cliente = $("#modalEdit_ddlClientes").val();
        var cliente_barraca = $("#modalEdit_ddlClientes_Barraca").val();
        var cargador = $("#modalEdit_ddlCargadores").val();
        var lugar_carga = $("#modalEdit_txbLugarCarga").val();
        var fletero = $("#modalEdit_ddlFleteros").val();
        var camion = $("#modalEdit_ddlCamiones").val();
        var chofer = $("#modalEdit_ddlChoferes").val();
        var comentarios = $("#modalEdit_txbComentarios").val();

        var esBarraca = false;
        if ($('input[name=edit_rad_cliente]:checked').val() == "barraca") {
            esBarraca = true;
        }

        // Ajax call parameters
        console.log("Ajax call: Viajes.aspx/ModificarViaje_2. Params:");
        console.log("viajeID_str, type: " + type(viajeID_str) + ", value: " + viajeID_str);
        console.log("fecha1, type: " + type(fecha1) + ", value: " + fecha1);
        console.log("fecha2, type: " + type(fecha2) + ", value: " + fecha2);
        console.log("proveedor, type: " + type(proveedor) + ", value: " + proveedor);
        console.log("cliente, type: " + type(cliente) + ", value: " + cliente);
        console.log("cargador, type: " + type(cargador) + ", value: " + cargador);
        console.log("lugar_carga, type: " + type(lugar_carga) + ", value: " + lugar_carga);
        console.log("fletero, type: " + type(fletero) + ", value: " + fletero);
        console.log("camion, type: " + type(camion) + ", value: " + camion);
        console.log("chofer, type: " + type(chofer) + ", value: " + chofer);
        console.log("comentarios, type: " + type(comentarios) + ", value: " + comentarios);
        console.log("esBarraca, type: " + type(esBarraca) + ", value: " + esBarraca);

        $.ajax({
            type: "POST",
            url: "Viajes.aspx/ModificarViaje_2",
            data: '{viajeID_str: "' + viajeID_str + '",fecha1: "' + fecha1 + '",fecha2: "' + fecha2 + '",proveedor: "' + proveedor +
                '",cliente: "' + cliente + '",cliente_barraca: "' + cliente_barraca + '",cargador: "' + cargador + '",lugar_carga: "' + lugar_carga + '",fletero: "' + fletero +
                '",camion: "' + camion + '",chofer: "' + chofer + '",comentarios: "' + comentarios + '",esBarraca: "' + esBarraca + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var ok = response.d;
                if (ok !== null && ok) {

                    $('#dialog p').text(hashMessages['OK_Datos']);
                    $("#dialog").dialog({
                        open: {},
                        resizable: false,
                        height: 150,
                        modal: true,
                        buttons: {
                            "Aceptar": function () {
                                //$("#btnUpdateViajesEnCurso").click();
                                //$(this).dialog("close");

                                $('#aTabsViajes_1').click();
                                $("#dialog").dialog("close");

                                $.modal.close();
                                return true;
                            }
                        }
                    });

                    //// Actualizar datos
                    //var selected_row = $(".hiddencol").filter(':contains("' + clienteID_str + '")');
                    //if (selected_row !== null) {
                    //    selected_row.click();
                    //}

                } else {
                    show_message_info('Error_Datos');
                }

            }, // end success
            failure: function (response) {
                show_message_info('Error_Datos');

            }
        }); // Ajax
    }
}


function FinDelViaje_2(viajeID) {

    $('#dialog p').text(hashMessages['Confirmacion']);
    $("#dialog").dialog({
        open: {},
        resizable: false,
        height: 150,
        modal: true,
        buttons: {
            "Confirmar": function () {

                if (viajeID > 0) {
                    var viajeID_str = viajeID.toString();

                //var hdn_notificaciones_viajeID = $("#hdn_notificaciones_viajeID");
                //if (hdn_notificaciones_viajeID !== null && hdn_notificaciones_viajeID.val() !== null && hdn_notificaciones_viajeID.val().length > 0) {
                //    var viajeID_str = hdn_notificaciones_viajeID.val();

                    // Ajax call parameters
                    console.log("Ajax call: Viajes.aspx/FinDelViaje. Params:");
                    console.log("viajeID_str, type: " + type(viajeID_str) + ", value: " + viajeID_str);

                    $.ajax({
                        type: "POST",
                        url: "Viajes.aspx/FinDelViaje",
                        data: '{viajeID_str: "' + viajeID_str + '"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            var result = response.d;
                            switch (result) {
                                case 0: {
                                    show_message_info('Error_Datos');
                                    break;
                                }

                                case 1: {
                                    show_message_info('OK_FINViaje');
                                    setTimeout("location.reload(true);", 1000);
                                    break;
                                }

                                case 2: {
                                    show_message_info('Error_DatosMercaderias');
                                    break;
                                }

                                case 3: {
                                    show_message_info('Error_DatosPesadas');
                                    break;
                                }

                                case 4: {
                                    show_message_info('Error_DatosPrecioVenta');
                                    break;
                                }
                            }

                        }, // end success
                        failure: function (response) {
                            show_message_info('Error_Datos');

                        }
                    }); // Ajax
                }

            },
            "Cancelar": function () {
                //$(this).dialog("close");
                $("#dialog").dialog("close");
                return false;
            }
        }
    }); // Ajax
}




function FinDelViaje() {

    $('#dialog p').text(hashMessages['Confirmacion']);
    $("#dialog").dialog({
        open: {},
        resizable: false,
        height: 150,
        modal: true,
        buttons: {
            "Confirmar": function () {

                var hdn_notificaciones_viajeID = $("#hdn_notificaciones_viajeID");
                if (hdn_notificaciones_viajeID !== null && hdn_notificaciones_viajeID.val() !== null && hdn_notificaciones_viajeID.val().length > 0) {
                    var viajeID_str = hdn_notificaciones_viajeID.val();

                    // Ajax call parameters
                    console.log("Ajax call: Viajes.aspx/FinDelViaje. Params:");
                    console.log("viajeID_str, type: " + type(viajeID_str) + ", value: " + viajeID_str);

                    $.ajax({
                        type: "POST",
                        url: "Viajes.aspx/FinDelViaje",
                        data: '{viajeID_str: "' + viajeID_str + '"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            var result = response.d;
                            switch (result) {
                                case 0: {
                                    show_message_info('Error_Datos');
                                    break;
                                }

                                case 1: {
                                    show_message_info('OK_FINViaje');
                                    setTimeout("location.reload(true);", 1000);
                                    break;
                                }

                                case 2: {
                                    show_message_info('Error_DatosMercaderias');
                                    break;
                                }

                                case 3: {
                                    show_message_info('Error_DatosPesadas');
                                    break;
                                }

                                case 4: {
                                    show_message_info('Error_DatosPrecioVenta');
                                    break;
                                }
                            }

                        }, // end success
                        failure: function (response) {
                            show_message_info('Error_Datos');

                        }
                    }); // Ajax
                }

            },
            "Cancelar": function () {
                //$(this).dialog("close");
                $("#dialog").dialog("close");
                return false;
            }
        }
    }); // Ajax
}

function GuardarPrecioVenta() {

    guardarAmbasPesadas();
    calcularPrecioVenta();

    var hdn_notificaciones_viajeID = $("#hdn_notificaciones_viajeID").val();
    var notif_Flete2 = $("#notif_Flete2").val();
    var notif_Venta2 = $("#notif_Venta2").val();
    var notif_Flete3 = $("#notif_Flete3").val();
    var txb_pesada2Peso_neto = $("#txb_pesada2Peso_neto").val();
    var mercaderiaValorCliente_str = $("#txbMercaderiaValorCliente").val();
    var txbMercaderia_Cliente_Comentarios = $("#txbMercaderia_Cliente_Comentarios").val();

    // Check viaje
    if (hdn_notificaciones_viajeID !== null && hdn_notificaciones_viajeID.length > 0) {

        // Check datos pesadas
        if (txb_pesada2Peso_neto !== null && txb_pesada2Peso_neto.length > 0) {

            // Check existe c�lculo
            var notif_Venta3 = $("#notif_Venta3");
            if (notif_Venta3 !== null) {
                var precio_venta_str = notif_Venta3.text();
                if (precio_venta_str !== null && precio_venta_str !== "" && precio_venta_str !== "0") {

                    // Check datos venta
                    if (notif_Flete2 !== null && notif_Flete2.length > 0 &&
                    notif_Venta2 !== null && notif_Venta2.length > 0 &&
                    notif_Flete3 !== null && notif_Flete3.length > 0) {

                        var viajeID = hdn_notificaciones_viajeID;

                        var precioFlete_str = notif_Flete2;
                        var precioDescarga_str = notif_Venta2;
                        var IVA_str = notif_Flete3;

                        if (precio_venta_str !== "" && precio_venta_str !== "0") {

                            // Cambio "," por "."
                            precioFlete_str = precioFlete_str.replace(/,/g, ".");
                            precioDescarga_str = precioDescarga_str.replace(/,/g, ".");
                            precio_venta_str = precio_venta_str.replace(/,/g, ".");
                            mercaderiaValorCliente_str = mercaderiaValorCliente_str.replace(/,/g, ".");

                            // Ajax call parameters
                            console.log("Ajax call: Viajes.aspx/GuardarPrecioVenta. Params:");
                            console.log("viajeID, type: " + type(viajeID) + ", value: " + viajeID);
                            console.log("precioFlete_str, type: " + type(precioFlete_str) + ", value: " + precioFlete_str);
                            console.log("precioDescarga_str, type: " + type(precioDescarga_str) + ", value: " + precioDescarga_str);
                            console.log("IVA_str, type: " + type(IVA_str) + ", value: " + IVA_str);
                            console.log("precio_venta_str, type: " + type(precio_venta_str) + ", value: " + precio_venta_str);
                            console.log("mercaderiaValorCliente_str, type: " + type(mercaderiaValorCliente_str) + ", value: " + mercaderiaValorCliente_str);
                            console.log("txbMercaderia_Cliente_Comentarios, type: " + type(txbMercaderia_Cliente_Comentarios) + ", value: " + txbMercaderia_Cliente_Comentarios);

                            $.ajax({
                                type: "POST",
                                url: "Viajes.aspx/GuardarPrecioVenta",
                                data: '{viajeID: "' + viajeID + '",precioFlete_str: "' + precioFlete_str + '",precioDescarga_str: "' + precioDescarga_str + '", ' +
                                    'IVA_str: "' + IVA_str + '",mercaderiaValorCliente_str: "' + mercaderiaValorCliente_str + '",mercaderia_Cliente_Comentarios: "' + txbMercaderia_Cliente_Comentarios + '", precio_venta_str: "' + precio_venta_str + '"}',
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (response) {
                                    var precio_venta = response.d;
                                    if (precio_venta !== null) {
                                        show_message_info('OK_Datos');

                                        $("#btnUpdateViajesEnCurso").click();
                                        $.modal.close();
                                    }

                                }, // end success
                                failure: function (response) {
                                    alert(response.d);
                                }
                            });
                        }
                        else {
                            show_message_info('Error_DatosPrecioVenta');
                        }
                    } // venta
                    else {
                        show_message_info('Error_DatosPrecioVenta');
                    }

                }
                else {
                    show_message_info('Error_DatosPrecioVenta');
                }

            } // pesadas
            else {
                show_message_info('Error_DatosPesadas');
            }
        } // viaje
        else {
            show_message_info('Error_DatosPrecioVenta');
        }

    }
}

/**** Event: OnClick Load on click event remove button (btnRemoveElement) ****/
//function loadClickRemoveButton_event() {
//    var btnRemoveElement = $("#btnBorrar");
//    btnRemoveElement.bind("click", function () {
//        if (!$('#btnBorrar').hasClass("opened")) {

//            $('.popbox3').popbox3();
//            $(".box3.popbox3").show("highlight", 700);
//            $('#txbConfirmRemoveElement').focus();
//            $('#btnBorrar').addClass("opened");

//            // Popup re-location
//            $(".popbox3").position({
//                my: "left top",
//                at: "left bottom",
//                of: "#btnBorrar"
//            });

//            var btn_width = (parseInt(btnBorrar.css("width"), 10) / 2) + 2;

//            // X and Y Axis
//            $("#divPopbox3").offset({ left: $("#divPopbox3").offset().left + btn_width });
//            $("#divPopbox3").offset({ top: $("#divPopbox3").offset().top + 5 });

//        } else {
//            $(".box3.popbox3").hide(200);
//            $('#btnBorrar').removeClass("opened");
//        }
//    });
//}

function confirmar_borrarViajeEnCurso() {

    var btnBorrar = $("#btnBorrar");
    if (btnBorrar != null) {
        if (!btnBorrar.hasClass("opened")) {
            $(".msg-box.popbox").show("highlight", 700);
            $('#txbConfirmRemoveElement').focus();
            btnBorrar.addClass("opened");

            // Popup re-location
            $(".popbox").position({
                my: "left top",
                at: "left bottom",
                of: "#btnBorrar"
            });

            var btn_width = (parseInt(btnBorrar.css("width"), 10) / 2) + 2;

            // X and Y Axis
            $("#divPopbox").offset({ left: $("#divPopbox").offset().left + btn_width });
            $("#divPopbox").offset({ top: $("#divPopbox").offset().top + 5 });

        } else {
            //$(".msg-box.popbox").hide(200);
            btnBorrar.removeClass("opened");
        }
    }

}

function volverAEnCurso(viajeID) {

    if (viajeID > 0) {
        var viajeID_str = viajeID.toString();

        $('#dialog p').text(hashMessages['ConfirmacionVolverAEnCurso']);
        $("#dialog").dialog({
            open: {},
            resizable: false,
            height: 150,
            modal: true,
            buttons: {
                "Confirmar": function () {

                    // Ajax call parameters
                    console.log("Ajax call: Viajes.aspx/VolverAEnCurso. Params:");
                    console.log("viajeID_str, type: " + type(viajeID_str) + ", value: " + viajeID_str);

                    $.ajax({
                        type: "POST",
                        url: "Viajes.aspx/VolverAEnCurso",
                        data: '{viajeID_str: "' + viajeID_str + '"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            var result = response.d;
                            
                            // OK
                            show_message_info('OK_VolverAEnCurso');

                            //$(this).dialog("close");
                            $("#dialog").dialog("close");

                            //setTimeout("$('#btnUpdateViajes').click();", 1000);
                            $('#aTabsViajes_1').click();

                        }, // end success
                        failure: function (response) {
                            show_message_info('Error_Datos');

                        }
                    }); // Ajax

                },
                "Cancelar": function () {
                    //$(this).dialog("close");
                    $("#dialog").dialog("close");
                    return false;
                }
            }
        });

    }

}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode == 188)
        return false;

    return true;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

