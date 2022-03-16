/**
 * ユーザークラス.
 * @remarks
 * ユーザー情報を表します。
 */
export type User = {
  // ユーザーID
  id: number;
  // 名前
  name: string;
  // Eメール
  email: string;
  // パスワード
  password: string;
  // 郵便番号
  zipcode: string;
  // 住所
  address: string;
  // 電話番号
  telephone: string;
};
