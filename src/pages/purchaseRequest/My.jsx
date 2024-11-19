import React from 'react';
import PurchaseRequest from "@components/PurchaseRequest";
function MyPurchaseRequest() {
  return (
    <div>
      <h2>Trang của tôi (Người mua)</h2>
      <PurchaseRequest isBuyer={true} />
    </div>
  );
}

export default MyPurchaseRequest;
