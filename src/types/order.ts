import { User } from "./user";
import { OrderItem } from "./orderItem"
/**
 *注文を表すドメインクラス.
 */
export type Order = {
    //orderID
     id: number;
    //ユーザーID
     userId: number;
    //入金状況
     status: number;
    //合計金額
     totalPrice: number;
    //注文日
     orderDate: Date;
    //宛先氏名
     destinationName: string;
    //宛先Eメールアドレス
     destinationEmail: string;
    //宛先郵便番号
     destinationZipcode: string;
    //宛先住所
     destinationAddress: string;
    //宛先電話番号
     destinationTel: string;
    //配達日時
     deliveryTime: Date;
    //支払い方法
     paymentMethod: number;
    //ユーザー
     user: User | null;
    //注文商品リスト
     orderItemList: Array<OrderItem>

}
