# Herd Ledger — Livestock Profitability Calculator

A small, responsive, browser-based calculator for estimating livestock sale revenue, costs, profit or loss, margin, and break-even live-weight price.

## Run it

Open `index.html` in a modern browser. No build step, dependencies, account, or server are required.

## Use it

1. Choose a livestock type and currency.
2. Enter the number of animals, average live weight, and your expected sale price per kilogram.
3. Enter purchase/raising, feed, and health/other costs per animal, plus transport and other lot-level costs.
4. Review the estimate, which updates as you type.

The calculation is:

- **Revenue** = head count × average live weight × sale price per kg
- **Total cost** = head count × (purchase/raising + feed + health/other per animal) + lot costs
- **Profit or loss** = revenue − total cost
- **Profit margin** = profit or loss ÷ revenue × 100
- **Break-even price** = total cost ÷ total live weight

All values are entered by the user. The app does not fetch live market prices, save data, or account for commissions, taxes, shrink, grading, or other deductions unless you include them in lot costs. Use local units and sale terms consistently; this version assumes kilograms and price per kilogram. Estimates are for planning and are not financial advice.
