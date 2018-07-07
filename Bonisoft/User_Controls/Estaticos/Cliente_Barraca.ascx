﻿<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Cliente_Barraca.ascx.cs" Inherits="Bonisoft.User_Controls.Cliente_Barraca" %>
<h2>Lista de Clientes Barracas</h2>

<asp:Label ID="lblMessage" runat="server" Text="" ForeColor="Red"></asp:Label>
<asp:GridView ID="gridClientes_Barraca" runat="server" ClientIDMode="Static" HorizontalAlign="Center" AutoGenerateColumns="False" ShowFooter="True"
    CssClass="table table-hover table-striped"
    DataKeyNames="Cliente_ID"
    OnRowCommand="gridClientes_Barraca_RowCommand"
    OnRowCancelingEdit="gridClientes_Barraca_RowCancelingEdit"
    OnRowEditing="gridClientes_Barraca_RowEditing"
    OnRowUpdating="gridClientes_Barraca_RowUpdating"
    OnRowDataBound="gridClientes_Barraca_RowDataBound"
    OnRowDeleting="gridClientes_Barraca_RowDeleting">

    <EmptyDataRowStyle ForeColor="Red" CssClass="table table-bordered" />
    <EmptyDataTemplate>
        ¡No hay clientes con los parámetros seleccionados!  
    </EmptyDataTemplate>

    <%--Paginador...--%>
    <PagerTemplate>
        <div class="row" style="margin-top: 20px;">
            <div class="col-lg-1" style="text-align: right;">
                <h5>
                    <asp:Label ID="MessageLabel" Text="Ir a la pág." runat="server" /></h5>
            </div>
            <div class="col-lg-1" style="text-align: left;">
                <asp:DropDownList ID="PageDropDownList" Width="50px" AutoPostBack="true" OnSelectedIndexChanged="PageDropDownList_SelectedIndexChanged" runat="server" CssClass="form-control" /></h3>
            </div>
            <div class="col-lg-10" style="text-align: right;">
                <h3>
                    <asp:Label ID="CurrentPageLabel" runat="server" CssClass="label label-warning" /></h3>
            </div>
        </div>
    </PagerTemplate>

    <Columns>
        <asp:BoundField DataField="Cliente_ID" HeaderText="ID" HtmlEncode="false" ReadOnly="true" />
        <asp:TemplateField HeaderText="Nombre">
            <EditItemTemplate>
                <asp:TextBox ID="txb13" runat="server" Text='<%# Bind("Nombre") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl13" runat="server" Text='<%# Bind("Nombre") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew13" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Razón Social">
            <EditItemTemplate>
                <asp:TextBox ID="txb14" runat="server" Text='<%# Bind("Razon_social") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl14" runat="server" Text='<%# Bind("Razon_social") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew14" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="RUT">
            <EditItemTemplate>
                <asp:TextBox ID="txb15" runat="server" Text='<%# Bind("RUT") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl15" runat="server" Text='<%# Bind("RUT") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew15" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Dirección">
            <EditItemTemplate>
                <asp:TextBox ID="txb16" runat="server" Text='<%# Bind("Direccion") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl16" runat="server" Text='<%# Bind("Direccion") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew16" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Depto">
            <EditItemTemplate>
                <asp:TextBox ID="txb20" runat="server" Text='<%# Bind("Depto") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl20" runat="server" Text='<%# Bind("Depto") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew20" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Teléfono">
            <EditItemTemplate>
                <asp:TextBox ID="txb17" runat="server" Text='<%# Bind("Telefono") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl17" runat="server" Text='<%# Bind("Telefono") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew17" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Dueño">
            <EditItemTemplate>
                <asp:TextBox ID="txb1" runat="server" Text='<%# Bind("Dueno_nombre") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl1" runat="server" Text='<%# Bind("Dueno_nombre") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew1" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Encargado leña">
            <EditItemTemplate>
                <asp:TextBox ID="txb3" runat="server" Text='<%# Bind("Encargado_lena_nombre") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl3" runat="server" Text='<%# Bind("Encargado_lena_nombre") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew3" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Encargado pagos">
            <EditItemTemplate>
                <asp:TextBox ID="txb5" runat="server" Text='<%# Bind("Encargado_pagos_nombre") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl5" runat="server" Text='<%# Bind("Encargado_pagos_nombre") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew5" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <%--<asp:TemplateField HeaderText="Supervisor leña">
            <EditItemTemplate>
                <asp:TextBox ID="txb7" runat="server" Text='<%# Bind("Supervisor_lena_nombre") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl7" runat="server" Text='<%# Bind("Supervisor_lena_nombre") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew7" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>--%>
        <asp:TemplateField HeaderText="Email">
            <EditItemTemplate>
                <asp:TextBox ID="txb23" runat="server" Text='<%# Bind("Email") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl23" runat="server" Text='<%# Bind("Email") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew23" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Nro cuenta">
            <EditItemTemplate>
                <asp:TextBox ID="txb24" runat="server" Text='<%# Bind("Nro_cuenta") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl24" runat="server" Text='<%# Bind("Nro_cuenta") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew24" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Comentarios">
            <EditItemTemplate>
                <asp:TextBox ID="txb22" runat="server" Text='<%# Bind("Comentarios") %>' CssClass="form-control" MaxLength="100"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl22" runat="server" Text='<%# Bind("Comentarios") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew22" runat="server" CssClass="form-control" MaxLength="100"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="">
            <ItemTemplate>
                <asp:LinkButton ID="lnkEdit" runat="server" Text="" CommandName="Edit" ClientIDMode="AutoID"
                    CommandArgument=''><span aria-hidden="true" class="btn btn-info btn-xs glyphicon glyphicon-pencil"></span></asp:LinkButton>
                <asp:LinkButton ID="lnkDelete" runat="server" Text="Delete" CommandName="Delete" ClientIDMode="AutoID"
                    OnClientClick='return confirm("Está seguro que desea borrar este registro?");'
                    CommandArgument=''><span aria-hidden="true" class="btn btn-danger btn-xs glyphicon glyphicon-remove"></span></asp:LinkButton>
            </ItemTemplate>
            <EditItemTemplate>
                <asp:LinkButton ID="lnkInsert" runat="server" Text="" CommandName="Update" ClientIDMode="AutoID"
                    CommandArgument=''><span aria-hidden="true" class="btn btn-success btn-xs glyphicon glyphicon-floppy-disk"></span></asp:LinkButton>
                <asp:LinkButton ID="lnkCancel" runat="server" Text="" CommandName="Cancel" ClientIDMode="AutoID"
                    CommandArgument=''><span aria-hidden="true" class="btn btn-warning btn-xs glyphicon glyphicon-ban-circle"></span></asp:LinkButton>
            </EditItemTemplate>
            <FooterTemplate>
                <asp:LinkButton ID="lnkInsert" runat="server" Text="" CommandName="InsertNew" ClientIDMode="AutoID"
                    CommandArgument=''><span aria-hidden="true" class="btn btn-success btn-xs glyphicon glyphicon-plus"></span></asp:LinkButton>
                <asp:LinkButton ID="lnkCancel" runat="server" Text="" CommandName="CancelNew" ClientIDMode="AutoID"
                    CommandArgument=''><span aria-hidden="true" class="btn btn-warning btn-xs glyphicon glyphicon-ban-circle"></span></asp:LinkButton>
            </FooterTemplate>
        </asp:TemplateField>
    </Columns>

</asp:GridView>
<asp:HiddenField ClientIDMode="Static" ID="hdnClientesCount_Barraca" runat="server" />

