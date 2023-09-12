import type { KaooCart, OrderRequest } from '@src/models/kaoo';

export function generateOrder(
    cart: KaooCart,
    adult: number,
    child: number,
    table_num: string,
    shopid: string,
): OrderRequest {
    const request: OrderRequest = {
        child,
        adult,
        person_count: adult + child,
        table_num,
        shopid,
        ids: [],
        nums: [],
    };

    console.log('cart', JSON.stringify(cart, null, 4));

    for (const item of Object.values(cart)) {
        request.ids.push(item.good.id);
        request.nums.push(item.count.toString());
    }

    console.log('request', JSON.stringify(request, null, 4));

    return request;
}
