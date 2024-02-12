using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShowPulse.Migrations
{
    /// <inheritdoc />
    public partial class ReseedIdentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DBCC CHECKIDENT('Shows' , RESEED, 1)");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
