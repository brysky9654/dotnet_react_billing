using Microsoft.EntityFrameworkCore.Migrations;

namespace Billing.WebApp.Data.Migrations
{
    public partial class UpdateInvoiceItemsTaxReference : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceItem_InvoiceTax_InvoiceTaxId",
                table: "InvoiceItem");

            migrationBuilder.AlterColumn<int>(
                name: "InvoiceTaxId",
                table: "InvoiceItem",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceItem_InvoiceTax_InvoiceTaxId",
                table: "InvoiceItem",
                column: "InvoiceTaxId",
                principalTable: "InvoiceTax",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceItem_InvoiceTax_InvoiceTaxId",
                table: "InvoiceItem");

            migrationBuilder.AlterColumn<int>(
                name: "InvoiceTaxId",
                table: "InvoiceItem",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceItem_InvoiceTax_InvoiceTaxId",
                table: "InvoiceItem",
                column: "InvoiceTaxId",
                principalTable: "InvoiceTax",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
