const form = document.querySelector('#calculator-form');
const currency = document.querySelector('#currency');
const currencySymbols = { USD: '$', INR: '₹', GBP: '£', EUR: '€', AUD: 'A$', CAD: 'C$', ZAR: 'R' };
const fields = ['head', 'weight', 'price', 'purchase', 'feed', 'health', 'lot-costs'];

function readNumber(id) {
  const value = Number(document.getElementById(id).value);
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function money(value, digits = 0) {
  const code = currency.value;
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency', currency: code, maximumFractionDigits: digits,
      minimumFractionDigits: digits
    }).format(Number.isFinite(value) ? value : 0);
  } catch {
    return `${currencySymbols[code] || ''}${(value || 0).toFixed(digits)}`;
  }
}

function updateEstimate() {
  const head = readNumber('head');
  const weight = readNumber('weight');
  const price = readNumber('price');
  const totalWeight = head * weight;
  const revenue = totalWeight * price;
  const perAnimalCosts = readNumber('purchase') + readNumber('feed') + readNumber('health');
  const costs = head * perAnimalCosts + readNumber('lot-costs');
  const profit = revenue - costs;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const breakEven = totalWeight > 0 ? costs / totalWeight : 0;

  document.querySelector('#profit-label').textContent = profit >= 0 ? 'ESTIMATED PROFIT' : 'ESTIMATED LOSS';
  document.querySelector('#profit-value').textContent = money(Math.abs(profit));
  document.querySelector('#profit-per-head').textContent = `${money(head > 0 ? Math.abs(profit) / head : 0)} ${profit >= 0 ? 'profit' : 'loss'} per head`;
  document.querySelector('#profit-card').classList.toggle('is-loss', profit < 0);
  document.querySelector('#revenue-value').textContent = money(revenue);
  document.querySelector('#cost-value').textContent = money(costs);
  document.querySelector('#margin-value').textContent = `${margin.toFixed(1)}%`;
  document.querySelector('#breakeven-value').innerHTML = `${money(breakEven, 2)} <small>/ kg</small>`;
  document.querySelector('#price-symbol').textContent = currencySymbols[currency.value] || currency.value;
  document.querySelectorAll('.currency-symbol').forEach((el) => {
    el.textContent = currencySymbols[currency.value] || currency.value;
  });
}

fields.forEach((id) => document.getElementById(id).addEventListener('input', updateEstimate));
currency.addEventListener('change', updateEstimate);
form.addEventListener('reset', () => requestAnimationFrame(updateEstimate));
updateEstimate();
