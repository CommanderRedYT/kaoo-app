// react-native

// kaoo http api

export async function request(path: string, options: RequestInit = {}) {
    const response = await fetch(path, options);
    return await response.json();
}

export async function getGoods() {
    // http://order.huaqiaobang.com/index.php?ctrl=shop&action=jmGetGoodsType&id=323
    return await request("http://order.huaqiaobang.com/index.php?ctrl=shop&action=jmGetGoodsType&id=323", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}
