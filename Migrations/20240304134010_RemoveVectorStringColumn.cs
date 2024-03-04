using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShowPulse.Migrations
{
    /// <inheritdoc />
    public partial class RemoveVectorStringColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Vector",
                table: "Shows");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Vector",
                table: "Shows",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
