export interface GoodsResponseDetailsItem {
  id: string;
  product_id: string;
  name: string;
  img: string;
  cost: string;
}

export interface GoodsResponseItem {
  id: string;
  name: string;
  det: GoodsResponseDetailsItem[];
}

export type GoodsResponse = GoodsResponseItem[];

export type Good = GoodsResponseDetailsItem;

export interface CartItem {
  count: number;
  good: Good;
}

export type KaooCart = { [key: string]: CartItem }; // key is product_id

export interface KaooHistoryItemDetailsItem {
  id: string;
  order_id: string;
  goodsid: string;
  img: string;
  goodsname: string;
  goodscount: string;
  goodscost: string;
  product_id: string;
}

export interface KaooHistoryItem {
  id: string;
  dno: string;
  time: string;
  det: KaooHistoryItemDetailsItem[];
}

export type KaooHistory = KaooHistoryItem[];

export interface OrderResponse {
  code: number;
  msg: string;
  over: number;
  type: string;
  starttime: string;
}

export interface OrderRequest {
  shopid: string;
  ids: string[]; // Good.id
  nums: string[]; // CartItem.count
  table_num: string;
  person_count: number;
  adult: number;
  child: number;
}

export enum DisplayFilter {
  ALL = 'ALL',
  FAVORITE = 'FAVORITE',
  UNFAVORITE = 'UNFAVORITE',
}

export type DisplayFilterKeys = keyof typeof DisplayFilter;

export interface ShopInfo {
  max: string;
  intervaltime: string;
  shopname: string;
  shoplogo: string;
  phone: string;
  address: string;
  email: string;
}

export interface OrderedItem {
  product_id: string;
  count: number;
  cost: number;
  received: boolean;
  uuid: string;
}

export type OrderedItems = OrderedItem[];

export interface KaooState {
  goods: GoodsResponse | null;
  search: string | null;
  cart: KaooCart;
  history: KaooHistory | null;
  adult: number;
  child: number;
  shopid: string;
  filter: DisplayFilter;
  shopInfo: ShopInfo | null;
  inProgress: boolean;
}
