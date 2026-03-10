


export async function load() {
    const [sunResponse, weatherResponse] = await Promise.all([
        fetch('https://api.sunrise-sunset.org/json?lat=30.3367&lng=-93.2583&formatted=0'),
        fetch('https://api.open-meteo.com/v1/forecast?latitude=30.3367&longitude=-93.2583&current=temperature_2m,relative_humidity_2m,precipitation_probability&hourly=precipitation_probability&temperature_unit=fahrenheit&forecast_days=2')
    ]);

    const sunData = await sunResponse.json();
    const weatherData = await weatherResponse.json();

    const now = new Date();
    const hours = weatherData.hourly.time;
    const probs = weatherData.hourly.precipitation_probability;

    let hoursUntilRain = null;
    for (let i = 0; i < hours.length; i++) {
        const forecastTime = new Date(hours[i]);
        if (forecastTime > now && probs[i] >= 40) {
            const diffMs = forecastTime - now;
            const diffHrs = Math.floor(diffMs / 1000 / 60 / 60);
            const diffMins = Math.floor((diffMs / 1000 / 60) % 60);
            hoursUntilRain = `${diffHrs}:${String(diffMins).padStart(2, '0')}`;
            break;
        }
    }

    return {
        sunrise: sunData.results.sunrise,
        sunset: sunData.results.sunset,
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        rainChance: weatherData.current.precipitation_probability,
        hoursUntilRain
    };
}