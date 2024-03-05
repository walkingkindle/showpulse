using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShowPulse.Migrations
{
    /// <inheritdoc />
    public partial class ReleaseYear : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReleaseDate",
                table: "Shows");

            migrationBuilder.AddColumn<int>(
                name: "ReleaseYear",
                table: "Shows",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReleaseYear",
                table: "Shows");

            migrationBuilder.AddColumn<DateTime>(
                name: "ReleaseDate",
                table: "Shows",
                type: "datetime2",
                nullable: true);
        }
    }
}
