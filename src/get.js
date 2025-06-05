const apiLink = "https://steamcommunity.com/market/priceoverview/?appid=322330&currency=15&market_hash_name=BODY_BUTTONS_BLUE_SAPPHIRE"

const getData = async () => {
    const response = await fetch(apiLink);
    const data = await response.json();
    console.log(data);
}

getData();