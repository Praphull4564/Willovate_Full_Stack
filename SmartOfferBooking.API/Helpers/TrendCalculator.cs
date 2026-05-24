using System;

namespace SmartOfferBooking.API.Helpers
{
    public static class TrendCalculator
    {
        public static double CalculateGrowthPercentage(decimal currentPeriodValue, decimal previousPeriodValue)
        {
            if (previousPeriodValue == 0)
            {
                return currentPeriodValue > 0 ? 100 : 0;
            }

            var growth = ((currentPeriodValue - previousPeriodValue) / previousPeriodValue) * 100;
            return Math.Round((double)growth, 2);
        }
    }
}
