﻿<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Camiones.ascx.cs" Inherits="Bonisoft.Pages.Camiones1" %>
<h2>Lista de Camiones</h2>

<asp:Label ID="lblMessage" runat="server" Text="" ForeColor="Red"></asp:Label>
<asp:GridView ID="gridCamiones" runat="server" ClientIDMode="Static" HorizontalAlign="Center" AutoGenerateColumns="False" ShowFooter="True"
    CssClass="table table-hover table-striped"
    DataKeyNames="Camion_ID"
    OnRowCommand="gridCamiones_RowCommand"
    OnRowCancelingEdit="gridCamiones_RowCancelingEdit"
    OnRowEditing="gridCamiones_RowEditing"
    OnRowUpdating="gridCamiones_RowUpdating"
    OnRowDataBound="gridCamiones_RowDataBound"
    OnRowDeleting="gridCamiones_RowDeleting">

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
        <asp:BoundField DataField="Camion_ID" HeaderText="ID" HtmlEncode="false" ReadOnly="true" />
        <asp:TemplateField HeaderText="Matrícula camión">
            <EditItemTemplate>
                <asp:TextBox ID="txb1" runat="server" Text='<%# Bind("Matricula_camion") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl1" runat="server" Text='<%# Bind("Matricula_camion") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew1" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Matrícula zorra">
            <EditItemTemplate>
                <asp:TextBox ID="txb2" runat="server" Text='<%# Bind("Matricula_zorra") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl2" runat="server" Text='<%# Bind("Matricula_zorra") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew2" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Ejes">
            <EditItemTemplate>
                <asp:DropDownList ID="ddlEjes1" runat="server" CssClass="form-control" />
            </EditItemTemplate>
            <ItemTemplate>
                <asp:LinkButton ID="lbl3" runat="server" CommandName="View" Text='<%# Bind("Ejes_ID") %>'></asp:LinkButton>
            </ItemTemplate>
            <FooterTemplate>
                <asp:DropDownList ID="ddlEjes2" runat="server" CssClass="form-control" />
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Marca">
            <EditItemTemplate>
                <asp:TextBox ID="txb6" runat="server" Text='<%# Bind("Marca") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl6" runat="server" Text='<%# Bind("Marca") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew6" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Tara">
            <EditItemTemplate>
                <asp:TextBox ID="txb7" runat="server" Text='<%# Bind("Tara") %>' CssClass="form-control" MaxLength="30"></asp:TextBox>
                <asp:CompareValidator ID="vtxb7" runat="server" ControlToValidate="txb7" Display="Dynamic" SetFocusOnError="true" Text="" ErrorMessage="Se admiten sólo números" Operator="DataTypeCheck" Type="Integer" />
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl7" runat="server" Text='<%# Bind("Tara") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew7" runat="server" CssClass="form-control" MaxLength="30"></asp:TextBox>
                <asp:CompareValidator ID="vtxbNew7" runat="server" ControlToValidate="txbNew7" Display="Dynamic" SetFocusOnError="true" Text="" ErrorMessage="Se admiten sólo números" Operator="DataTypeCheck" Type="Integer" />
            </FooterTemplate>
        </asp:TemplateField>
        <asp:TemplateField HeaderText="Comentarios">
            <EditItemTemplate>
                <asp:TextBox ID="txb9" runat="server" Text='<%# Bind("Comentarios") %>' CssClass="form-control" MaxLength="100"></asp:TextBox>
            </EditItemTemplate>
            <ItemTemplate>
                <asp:Label ID="lbl9" runat="server" Text='<%# Bind("Comentarios") %>'></asp:Label>
            </ItemTemplate>
            <FooterTemplate>
                <asp:TextBox ID="txbNew9" runat="server" CssClass="form-control" MaxLength="100"></asp:TextBox>
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
<asp:HiddenField ClientIDMode="Static" ID="hdnCamionesCount" runat="server" />
