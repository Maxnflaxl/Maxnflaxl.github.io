function calculate() {
    const networkHashrate = parseFloat(document.getElementById('networkHashrate').value) * 1e6;
    const yourHashrate = parseFloat(document.getElementById('yourHashrate').value) * 1e3;
    const networkDifficulty = networkHashrate / yourHashrate;
    const blockTargetTime = parseFloat(document.getElementById('blockTargetTime').value);
    const timeToSolveBlockSeconds = networkDifficulty * blockTargetTime * 60;
    const blockReward = parseFloat(document.getElementById('blockReward').value);
    const exchangePrice = parseFloat(document.getElementById('exchangePrice').value);
    const powerConsumptionWatts = parseFloat(document.getElementById('powerConsumptionWatts').value);
    const costPerKWH = parseFloat(document.getElementById('costPerKWH').value);

    const powerCost = (powerConsumptionWatts / 1000) * costPerKWH * (timeToSolveBlockSeconds / 3600);
    const totalRewardUSD = blockReward * exchangePrice;
    const breakEvenCoinPrice = (powerCost / totalRewardUSD) * exchangePrice;
    const minutesInADay = 24 * 60;
    const coinsPerDay = (minutesInADay / blockTargetTime) * blockReward;
    const totalValuePerDay = coinsPerDay * exchangePrice;
    const yourCoinsPerDay = (yourHashrate / networkHashrate) * coinsPerDay;
    const yourValuePerDay = yourCoinsPerDay * exchangePrice;
    const dailyPowerCost = (powerConsumptionWatts / 1000) * costPerKWH * 24;
    const Dailyprofitatexchagneprice = yourValuePerDay - dailyPowerCost;
    const profitpercent = breakEvenCoinPrice / exchangePrice;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p>The network gets approximately ${coinsPerDay.toFixed(2)} coins per day.</p>
        <p>The total value of the coins per day the network gets = $${totalValuePerDay.toFixed(2)}.</p>
        <br>
        <p>It would take approximately ${Math.floor(timeToSolveBlockSeconds / (24 * 3600))} days and ${Math.floor((timeToSolveBlockSeconds % (24 * 3600)) / 3600)} hours to solve a block.</p>
        <p>If you solve a block, your total reward would be: $${totalRewardUSD.toFixed(2)}.</p>
        <p>The estimated cost of power during the time to solve a block is: $${powerCost.toFixed(2)}.</p>
        <br>
        <p>Your Miner should avg approximately ${yourCoinsPerDay.toFixed(2)} coins per day.</p>
        <p>The value of coins you get per day = $${yourValuePerDay.toFixed(2)}.</p>
        <p>The daily cost of power is: $${dailyPowerCost.toFixed(2)}.</p>
        <p>The daily profit: $${Dailyprofitatexchagneprice.toFixed(2)}.</p>
        <br>
        <p>With the current cost of coins being: $${exchangePrice.toFixed(2)}</p>
        <p>Sell your coins at least: $${breakEvenCoinPrice.toFixed(2)} to break even in power.</p>
    `;
}
