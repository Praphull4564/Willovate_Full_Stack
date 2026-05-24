using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartOfferBooking.API.Migrations
{
    /// <inheritdoc />
    public partial class AddSlotIndexesAndEnums : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_OfferSlots_SlotDate",
                table: "OfferSlots",
                column: "SlotDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OfferSlots_SlotDate",
                table: "OfferSlots");
        }
    }
}
