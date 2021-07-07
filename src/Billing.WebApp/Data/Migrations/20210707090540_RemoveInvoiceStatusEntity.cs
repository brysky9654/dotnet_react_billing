using Microsoft.EntityFrameworkCore.Migrations;

namespace Billing.WebApp.Data.Migrations
{
    public partial class RemoveInvoiceStatusEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_InvoiceStatus_InvoiceStatusId",
                table: "Invoice");

            migrationBuilder.DropTable(
                name: "InvoiceStatus");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_InvoiceStatusId",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "InvoiceStatusId",
                table: "Invoice");

            migrationBuilder.AddColumn<string>(
                name: "InvoiceStatus",
                table: "Invoice",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InvoiceStatus",
                table: "Invoice");

            migrationBuilder.AddColumn<int>(
                name: "InvoiceStatusId",
                table: "Invoice",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "InvoiceStatus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvoiceStatus", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_InvoiceStatusId",
                table: "Invoice",
                column: "InvoiceStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_InvoiceStatus_InvoiceStatusId",
                table: "Invoice",
                column: "InvoiceStatusId",
                principalTable: "InvoiceStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
