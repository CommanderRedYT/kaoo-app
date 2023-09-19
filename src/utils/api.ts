// react-native
import type {
  OrderRequest,
  OrderResponse,
  GoodsResponse,
  ShopInfo,
} from '@src/models/kaoo';

export async function request(path: string, options: RequestInit = {}) {
  const response = await fetch(path, options);
  return await response.json();
}

export async function getGoods(shopId: string): Promise<GoodsResponse> {
  // http://order.huaqiaobang.com/index.php?ctrl=shop&action=jmGetGoodsType&id=323
  console.log('Getting goods...');
  return await request(
    `http://order.huaqiaobang.com/index.php?ctrl=shop&action=jmGetGoodsType&id=${shopId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

export async function getOrderHistory(shopId: string, table_num: string) {
  console.log('Getting order history...');
  // http://order.huaqiaobang.com/index.php?ctrl=order&action=jmOrderHistory&shopid=323&table_num=A16
  return await request(
    `http://order.huaqiaobang.com/index.php?ctrl=order&action=jmOrderHistory&shopid=${shopId}&table_num=${table_num}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

export async function makeOrder(
  order: OrderRequest,
): Promise<OrderResponse | void> {
  // http://order.huaqiaobang.com/index.php?ctrl=order&action=makeorder&sho/pid=323&contactname=1&address=1&minit=81000&ids=24833,24834,24837&nums=1,1,1&table_num=B20&person_count=8&adult=4&child=4&pscost=0.00
  const { shopid, ids, nums, table_num, person_count, adult, child } = order;

  const url = `http://order.huaqiaobang.com/index.php?ctrl=order&action=makeorder&shopid=${shopid}&contactname=1&address=1&minit=81000&ids=${ids.join(
    ',',
  )}&nums=${nums.join(
    ',',
  )}&table_num=${table_num}&person_count=${person_count}&adult=${adult}&child=${child}&pscost=0.00`;
  console.log('Making order...', url);
  return await request(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getShopInfo(shopId: string): Promise<ShopInfo> {
  // http://order.huaqiaobang.com/index.php?ctrl=shop&action=jmGetShopInfo&id=319
  return await request(
    `http://order.huaqiaobang.com/index.php?ctrl=shop&action=jmGetShopInfo&id=${shopId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
