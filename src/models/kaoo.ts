export interface GoodsResponseDetailsItem {
    id: string;
    product_id: string;
    name: string;
    img: string;
}

export interface GoodsResponseItem {
    id: string;
    name: string;
    det: GoodsResponseDetailsItem[];
}

export type GoodsResponse = GoodsResponseItem[];

export type GoodCategory = GoodsResponseItem;

export type Good = GoodsResponseDetailsItem;

export interface KaooState {
    goods: GoodsResponse | null;
    search: string | null;
}
