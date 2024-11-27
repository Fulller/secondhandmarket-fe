import React from 'react';
import PurchaseRequest from "@components/PurchaseRequest";
function PurchaseRequestToMe() {
  return (
    <div>
      <h2>Trang của tôi (Người bán)</h2>
      <PurchaseRequest isSeller={true} />
    </div>
  );
}

export default PurchaseRequestToMe;
