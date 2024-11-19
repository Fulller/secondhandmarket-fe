import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Tabs, List, Card, Button, Spin, message } from 'antd';
import purchaseRequestService from "@services/purchaseRequest.service";

const { TabPane } = Tabs;

const PurchaseRequest = ({ isBuyer }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const [response, error] = isBuyer
        ? await purchaseRequestService.getBuyerRequests()
        : await purchaseRequestService.getSellerRequests();

      if (error || !Array.isArray(response.data)) {
        message.error('Không thể tải yêu cầu mua');
        setRequests([]);
      } else {
        setRequests(response.data);
      }
    } catch (err) {
      message.error('Đã xảy ra lỗi khi lấy yêu cầu mua.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [isBuyer]);

  const handleAction = async (purchaseRequestId, action) => {
    setButtonLoading(true);
    try {
      let response;
      if (action === 'accept') {
        response = await purchaseRequestService.acceptPurchaseRequest(purchaseRequestId);
        message.success('Yêu cầu mua đã được chấp nhận.');
      } else if (action === 'reject') {
        response = await purchaseRequestService.rejectPurchaseRequest(purchaseRequestId);
        message.success('Yêu cầu mua đã bị từ chối.');
      } else if (action === 'delete') {
        response = await purchaseRequestService.deletePurchaseRequest(purchaseRequestId);
        message.success('Yêu cầu mua đã bị xóa.');
      }

      if (response) fetchRequests();
    } catch (error) {
      message.error(`Đã xảy ra lỗi khi ${action === 'delete' ? 'xóa' : action === 'accept' ? 'chấp nhận' : 'từ chối'} yêu cầu mua.`);
    } finally {
      setButtonLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Không có';
    const parsedDate = parseISO(dateStr);
    return format(parsedDate, 'dd/MM/yyyy HH:mm:ss');
  };

  const renderList = (data) => (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(request) => {
        const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

        return (
          <List.Item>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: "2", paddingRight: '20px' }}>
                  <p><strong>Tên sản phẩm:</strong> {request.productName || 'Không có'}</p>
                  <p><strong>Giá:</strong> {request.productPrice ? `${request.productPrice} VND` : 'Không có'}</p>
                  <p><strong>Mô tả:</strong>
                    {isDescriptionExpanded ? request.productDescription || 'Không có mô tả' : `${request.productDescription?.slice(0, 100)}...`}
                    <Button type="link" onClick={() => setDescriptionExpanded(!isDescriptionExpanded)} style={{ padding: 0 }}>
                      {isDescriptionExpanded ? 'Ẩn bớt' : 'Xem thêm'}
                    </Button>
                  </p>
                  <p><strong>Email người mua:</strong> {request.buyerEmail || 'Không có email'}</p>
                  <p><strong>Tên người mua:</strong> {request.buyerName || 'Không có tên'}</p>
                  <p><strong>Tin nhắn:</strong> {request.message}</p>
                  <p><strong>Ngày đăng:</strong> {formatDate(request.postedAt)}</p>
                  <p><strong>Ngày hết hạn:</strong> {formatDate(request.expiredAt)}</p>
                  <p><strong>Trạng thái:</strong>
                    <span style={{
                      color: request.status === 'ACCEPTED' ? 'green' :
                             request.status === 'REJECTED' ? 'red' : 'orange',
                    }}>
                      {request.status}
                    </span>
                  </p>
                  {isBuyer ? (
                    request.status === 'PENDING' && (
                      <Button type="primary" loading={buttonLoading} onClick={() => handleAction(request.id, 'delete')}>
                        Xóa yêu cầu
                      </Button>
                    )
                  ) : (
                    request.status === 'PENDING' && (
                      <>
                        <Button type="primary" loading={buttonLoading} onClick={() => handleAction(request.id, 'accept')} style={{ marginRight: '10px' }}>
                          Chấp nhận
                        </Button>
                        <Button type="danger" loading={buttonLoading} onClick={() => handleAction(request.id, 'reject')}>
                          Từ chối
                        </Button>
                      </>
                    )
                  )}
                </div>
                <div style={{ flex: "1", textAlign: 'center' }}>
                  {request.thumbnail ? (
                    <img src={request.thumbnail} alt="Thumbnail" style={{ width: '100%', borderRadius: '5px', objectFit: 'cover' }} />
                  ) : (
                    <p>Không có ảnh</p>
                  )}
                </div>
              </div>
            </Card>
          </List.Item>
        );
      }}
    />
  );

  const getTabs = (requests) => {
    const groupedRequests = {
      pending: requests.filter(req => req.status === 'PENDING'),
      accepted: requests.filter(req => req.status === 'ACCEPTED'),
      rejected: requests.filter(req => req.status === 'REJECTED'),
    };

    return [
      { label: `Chờ xử lý (${groupedRequests.pending.length})`, key: '1', children: renderList(groupedRequests.pending) },
      { label: `Đã chấp nhận (${groupedRequests.accepted.length})`, key: '2', children: renderList(groupedRequests.accepted) },
      { label: `Đã từ chối (${groupedRequests.rejected.length})`, key: '3', children: renderList(groupedRequests.rejected) }
    ];
  };

  if (loading) return <div className="loading-container"><Spin size="large" /></div>;

  return (
    <div>
      <h2>{isBuyer ? 'Yêu cầu mua của người mua' : 'Yêu cầu mua của người bán'}</h2>
      <Tabs defaultActiveKey="1" items={getTabs(requests)} />
    </div>
  );
};

export default PurchaseRequest;
