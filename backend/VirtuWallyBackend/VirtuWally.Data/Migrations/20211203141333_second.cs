using Microsoft.EntityFrameworkCore.Migrations;

namespace VirtuWally.Data.Migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Docs_Categories_CategoryId",
                table: "Docs");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Docs",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Docs_Categories_CategoryId",
                table: "Docs",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Docs_Categories_CategoryId",
                table: "Docs");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Docs",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Docs_Categories_CategoryId",
                table: "Docs",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
