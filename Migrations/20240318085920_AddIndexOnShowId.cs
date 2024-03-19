using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShowPulse.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexOnShowId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Shows_Id",
                table:"Shows",
                column: "Id"
                );

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Shows_Id",
                table: "Shows"
                );

        }
    }
}
