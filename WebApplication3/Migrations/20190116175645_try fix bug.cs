using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication3.Migrations
{
    public partial class tryfixbug : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SensorHistories_Houses_HouseId",
                table: "SensorHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_SensorHistories_Sensors_SensorId",
                table: "SensorHistories");

            migrationBuilder.DropIndex(
                name: "IX_SensorHistories_HouseId",
                table: "SensorHistories");

            migrationBuilder.DropIndex(
                name: "IX_SensorHistories_SensorId",
                table: "SensorHistories");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_SensorHistories_HouseId",
                table: "SensorHistories",
                column: "HouseId");

            migrationBuilder.CreateIndex(
                name: "IX_SensorHistories_SensorId",
                table: "SensorHistories",
                column: "SensorId");

            migrationBuilder.AddForeignKey(
                name: "FK_SensorHistories_Houses_HouseId",
                table: "SensorHistories",
                column: "HouseId",
                principalTable: "Houses",
                principalColumn: "HouseId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SensorHistories_Sensors_SensorId",
                table: "SensorHistories",
                column: "SensorId",
                principalTable: "Sensors",
                principalColumn: "SensorId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
