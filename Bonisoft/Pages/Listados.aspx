﻿<%@ Page Title="Listados" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Listados.aspx.cs" Inherits="Bonisoft.assets.dist.js.pages.Listados" %>

<%@ Register Src="~/User_Controls/Estaticos/Clientes.ascx" TagPrefix="uc1" TagName="Clientes" %>
<%@ Register Src="~/User_Controls/Estaticos/Cliente_Barraca.ascx" TagPrefix="uc1" TagName="Cliente_Barraca" %>
<%@ Register Src="~/User_Controls/Estaticos/Proveedores.ascx" TagPrefix="uc1" TagName="Proveedores" %>
<%@ Register Src="~/User_Controls/Estaticos/Cuadrillas.ascx" TagPrefix="uc1" TagName="Cuadrillas" %>
<%@ Register Src="~/User_Controls/Estaticos/Camiones.ascx" TagPrefix="uc1" TagName="Camiones" %>
<%@ Register Src="~/User_Controls/Estaticos/Choferes.ascx" TagPrefix="uc1" TagName="Choferes" %>
<%@ Register Src="~/User_Controls/Estaticos/Fleteros.ascx" TagPrefix="uc1" TagName="Fleteros" %>
<%@ Register Src="~/User_Controls/Estaticos/Cargadores.ascx" TagPrefix="uc1" TagName="Cargadores" %>
<%@ Register Src="~/User_Controls/Estaticos/Procesadores.ascx" TagPrefix="uc1" TagName="Procesadores" %>
<%@ Register Src="~/User_Controls/Configuracion/Tipo_lena.ascx" TagPrefix="uc1" TagName="Tipos" %>
<%@ Register Src="~/User_Controls/Configuracion/Formas_pago.ascx" TagPrefix="uc1" TagName="Formas" %>
<%@ Register Src="~/User_Controls/Configuracion/Camion_ejes.ascx" TagPrefix="uc1" TagName="Ejes" %>

<asp:Content ID="Content2" ContentPlaceHolderID="HeadContent" runat="server">

    <!-- STYLES EXTENSION -->

    <!-- Theme style -->
    <link rel="stylesheet" href="/assets/dist/css/pages/InfoBoxes.min.css" />
    <link rel="stylesheet" href="/assets/dist/css/pages/Datos.css" />

    <!-- AdminLTE Skins. Choose a skin from the css/skins
     folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="/assets/dist/css/skins/_all-skins.min.css">
    <!-- iCheck -->
    <link rel="stylesheet" href="/assets/plugins/iCheck/flat/blue.css">
    <!-- Morris chart -->
    <link rel="stylesheet" href="/assets/plugins/morris/morris.css">
    <!-- jvectormap -->
    <link rel="stylesheet" href="/assets/plugins/jvectormap/jquery-jvectormap-1.2.2.css">
    <!-- Date Picker -->
    <link rel="stylesheet" href="/assets/plugins/datepicker/datepicker3.css">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="/assets/plugins/daterangepicker/daterangepicker.css">
    <!-- bootstrap wysihtml5 - text editor -->
    <link rel="stylesheet" href="/assets/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->


</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="SubbodyContent" runat="server">

    <!-- PAGE SCRIPTS -->
    <!-- Morris.js charts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="/assets/plugins/morris/morris.min.js"></script>
    <!-- Sparkline -->
    <script src="/assets/plugins/sparkline/jquery.sparkline.min.js"></script>
    <!-- jvectormap -->
    <script src="/assets/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
    <script src="/assets/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
    <!-- jQuery Knob Chart -->
    <script src="/assets/plugins/knob/jquery.knob.js"></script>
    <!-- daterangepicker -->
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js"></script>--%>
    <script src="/assets/dist/js/moment.js"></script>
    <script src="/assets/plugins/daterangepicker/daterangepicker.js"></script>
    <!-- datepicker -->
    <script src="/assets/plugins/datepicker/bootstrap-datepicker.js"></script>
    <!-- Bootstrap WYSIHTML5 -->
    <script src="/assets/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
    <!-- Slimscroll -->
    <script src="/assets/plugins/slimScroll/jquery.slimscroll.min.js"></script>
    <!-- FastClick -->
    <script src="/assets/plugins/fastclick/fastclick.js"></script>
    <!-- AdminLTE App -->
    <script src="/assets/dist/js/app.min.js"></script>
    <!-- AdminLTE for demo purposes -->
    <script src="/assets/dist/js/demo.js"></script>
    <script src="/assets/dist/js/jquery.quicksearch.js"></script>

    <!-- Page JS -->
    <script src="/assets/dist/js/pages/Listados.js"></script>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper1">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>Listados        
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Inicio</a></li>
                <li class="active">Listados</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">

            <!-- =========================================================== -->

            <div class="box box-default">
                <div class="box-header with-border" style="padding-bottom: 0;">

                    <div class="row">
                        <div class="col-md-9">
                            <asp:Button ID="backButton" runat="server" Text="Volver" CssClass="btn btn-info pull-left" OnClientClick="JavaScript:window.history.back(1);return false;" />
                            <h3 class="box-title">
                                <label id="lblTableActive" style="font-weight: normal;"></label>
                            </h3>
                        </div>

                        <div class="col-md-2 pull-right" style="margin-right: 10px;">
                            <form action="#" method="get" class="sidebar-form" style="display: block !important; width: 100%;">
                                <div class="input-group ">
                                    <input type="text" id="txbSearch" name="q" class="form-control" placeholder="Buscar...">
                                    <span class="input-group-btn">
                                        <button type="button" name="search" id="search-btn" class="btn btn-flat">
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <div id="divContent">

                                    <div class="divTables" id="divClientes" style="display: none;">
                                        <asp:UpdatePanel ID="upClientes" runat="server">
                                            <ContentTemplate>
                                                <uc1:Clientes runat="server" ID="Clientes" />
                                            </ContentTemplate>
                                        </asp:UpdatePanel>
                                    </div>
                                    <div class="divTables" id="divClientes_Barraca" style="display: none;">
                                        <asp:UpdatePanel ID="upClientes_Barraca" runat="server">
                                            <ContentTemplate>
                                                <uc1:Cliente_Barraca runat="server" ID="Clientes_Barraca" />
                                            </ContentTemplate>
                                        </asp:UpdatePanel>
                                    </div>
                                    <div class="divTables" id="divProveedores" style="display: none;">
                                        <asp:UpdatePanel ID="upProveedores" runat="server">
                                            <ContentTemplate>
                                                <uc1:Proveedores runat="server" ID="Proveedores" />
                                            </ContentTemplate>
                                        </asp:UpdatePanel>
                                    </div>
                                    <div class="divTables" id="divCuadrillas" style="display: none;">
                                        <asp:UpdatePanel ID="upCuadrillas" runat="server">
                                            <ContentTemplate>
                                                <uc1:Cuadrillas runat="server" ID="Cuadrillas" />
                                            </ContentTemplate>
                                        </asp:UpdatePanel>
                                    </div>
                                    <div class="divTables" id="divCamiones" style="display: none;">
                                        <asp:UpdatePanel ID="upCamiones" runat="server">
                                            <ContentTemplate>
                                                <uc1:Camiones runat="server" ID="Camiones" />
                                            </ContentTemplate>
                                        </asp:UpdatePanel>
                                    </div>
                                    <div class="divTables" id="divChoferes" style="display: none;">
                                        <asp:UpdatePanel ID="upChoferes" runat="server">
                                            <ContentTemplate>
                                                <uc1:Choferes runat="server" ID="Choferes" />
                                            </ContentTemplate>
                                        </asp:UpdatePanel>
                                    </div>
                                     <div class="divTables" id="divFleteros" style="display: none;">
                                        <asp:UpdatePanel ID="upFleteros" runat="server">
                                            <ContentTemplate>
                                                <uc1:Fleteros runat="server" ID="Fleteros" />
                                            </ContentTemplate>
                                        </asp:UpdatePanel>
                                    </div>
                                     <div class="divTables" id="divCargadores" style="display: none;">
                                        <asp:UpdatePanel ID="upCargadores" runat="server">
                                            <ContentTemplate>
                                                <uc1:Cargadores runat="server" ID="Cargadores" />
                                            </ContentTemplate>
                                        </asp:UpdatePanel>
                                    </div>
                                    <div class="divTables" id="divProcesadores" style="display: none;">
                                        <asp:UpdatePanel ID="upProcesadores" runat="server">
                                            <ContentTemplate>
                                                <uc1:Procesadores runat="server" ID="Procesadores" />
                                            </ContentTemplate>
                                        </asp:UpdatePanel>
                                    </div>
                                    

                                    <div class="divTables" id="divTipos" style="display: none;">
                                        <asp:UpdatePanel ID="upTipos" runat="server">
                                            <ContentTemplate>
                                                <uc1:Tipos runat="server" ID="Tipos" />
                                            </ContentTemplate>
                                        </asp:UpdatePanel>
                                    </div>
                                    <div class="divTables" id="divFormas" style="display: none;">
                                        <asp:UpdatePanel ID="upFormas" runat="server">
                                            <ContentTemplate>
                                                <uc1:Formas runat="server" ID="Formas" />
                                            </ContentTemplate>
                                        </asp:UpdatePanel>
                                    </div>
                                    <div class="divTables" id="divEjes" style="display: none;">
                                        <asp:UpdatePanel ID="upEjes" runat="server">
                                            <ContentTemplate>
                                                <uc1:Ejes runat="server" ID="Ejes" />
                                            </ContentTemplate>
                                        </asp:UpdatePanel>
                                    </div>

                                </div>
                            </div>

                            <!-- /.form-group -->
                        </div>
                        <!-- /.col -->
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->
                </div>
                <!-- /.box-body -->
            </div>



            <!-- =========================================================== -->
        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->



</asp:Content>
