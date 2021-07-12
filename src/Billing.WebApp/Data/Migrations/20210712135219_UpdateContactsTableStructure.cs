using Microsoft.EntityFrameworkCore.Migrations;

namespace Billing.WebApp.Data.Migrations
{
    public partial class UpdateContactsTableStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Contact",
                newName: "LastName");

            migrationBuilder.AddColumn<string>(
                name: "BusinessName",
                table: "Contact",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Contact",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Favourited",
                table: "Contact",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Contact",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BusinessName",
                table: "Contact");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Contact");

            migrationBuilder.DropColumn(
                name: "Favourited",
                table: "Contact");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Contact");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Contact",
                newName: "Name");
        }
    }
}
