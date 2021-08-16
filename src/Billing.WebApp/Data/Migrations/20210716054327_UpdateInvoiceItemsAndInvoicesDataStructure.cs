using Microsoft.EntityFrameworkCore.Migrations;

namespace Billing.WebApp.Data.Migrations
{
    public partial class UpdateInvoiceItemsAndInvoicesDataStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaxInclusive",
                table: "InvoiceItem");

            migrationBuilder.AddColumn<int>(
                name: "InvoiceTaxId",
                table: "InvoiceItem",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "TaxInclusive",
                table: "Invoice",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceItem_InvoiceTaxId",
                table: "InvoiceItem",
                column: "InvoiceTaxId");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceItem_InvoiceTax_InvoiceTaxId",
                table: "InvoiceItem",
                column: "InvoiceTaxId",
                principalTable: "InvoiceTax",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceItem_InvoiceTax_InvoiceTaxId",
                table: "InvoiceItem");

            migrationBuilder.DropIndex(
                name: "IX_InvoiceItem_InvoiceTaxId",
                table: "InvoiceItem");

            migrationBuilder.DropColumn(
                name: "InvoiceTaxId",
                table: "InvoiceItem");

            migrationBuilder.DropColumn(
                name: "TaxInclusive",
                table: "Invoice");

            migrationBuilder.AddColumn<bool>(
                name: "TaxInclusive",
                table: "InvoiceItem",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }
    }
}
