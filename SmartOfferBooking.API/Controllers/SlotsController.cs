using System;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOfferBooking.API.DTOs.Slots;
using SmartOfferBooking.API.Interfaces;

namespace SmartOfferBooking.API.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class SlotsController : ControllerBase
    {
        private readonly ISlotService _slotService;

        public SlotsController(ISlotService slotService)
        {
            _slotService = slotService;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateSlot([FromBody] CreateSlotDto dto)
        {
            var result = await _slotService.CreateAsync(dto);
            if (!result.Success)
            {
                return BadRequest(result);
            }

            return CreatedAtAction(nameof(GetSlotById), new { id = result.Data?.Id }, result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSlots([FromQuery] SlotFilterDto filter)
        {
            var result = await _slotService.GetPagedAsync(filter);
            return Ok(result);
        }
        
        [HttpGet("~/api/v{version:apiVersion}/offers/{offerId}/slots")]
        public async Task<IActionResult> GetSlotsByOfferId(Guid offerId, [FromQuery] SlotFilterDto filter)
        {
            filter.OfferId = offerId;
            var result = await _slotService.GetPagedAsync(filter);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSlotById(Guid id)
        {
            var result = await _slotService.GetByIdAsync(id);
            if (!result.Success)
            {
                return NotFound(result);
            }

            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateSlot(Guid id, [FromBody] UpdateSlotDto dto)
        {
            var result = await _slotService.UpdateAsync(id, dto);
            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSlot(Guid id)
        {
            var result = await _slotService.DeleteAsync(id);
            if (!result.Success)
            {
                return NotFound(result);
            }

            return Ok(result);
        }
    }
}
