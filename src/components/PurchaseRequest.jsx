import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Tabs, List, Card, Button, Spin, message } from 'antd';
import purchaseRequestService from "@services/purchaseRequest.service";

const { TabPane } = Tabs;

const PurchaseRequest = ({ isBuyer }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  // Lấy danh sách yêu cầu
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const [response, error] = isBuyer
        ? await purchaseRequestService.getBuyerRequests()
        : await purchaseRequestService.getSellerRequests();

      if (error) {
        message.error('Không thể tải yêu cầu mua');
        setRequests([]);
        return;
      }

      if (Array.isArray(response.data)) {
        setRequests(response.data);
      } else {
        setRequests([]);
        message.error('Dữ liệu không hợp lệ.');
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

  // Hàm chấp nhận yêu cầu
  const handleAccept = async (purchaseRequestId) => {
    setButtonLoading(true);
    try {
      const [response, err] = await purchaseRequestService.acceptPurchaseRequest(purchaseRequestId);
      if (err) {
        message.error('Đã xảy ra lỗi khi chấp nhận yêu cầu mua.');
      } else {
        message.success('Yêu cầu mua đã được chấp nhận.');
        fetchRequests();
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi.');
    } finally {
      setButtonLoading(false);
    }
  };

  // Hàm từ chối yêu cầu
  const handleReject = async (purchaseRequestId) => {
    setButtonLoading(true);
    try {
      const response = await purchaseRequestService.rejectPurchaseRequest(purchaseRequestId);
      if (response) {
        message.success('Yêu cầu mua đã bị từ chối.');
        fetchRequests();
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi khi từ chối yêu cầu mua.');
    } finally {
      setButtonLoading(false);
    }
  };

  // Hàm xóa yêu cầu
  const handleDelete = async (purchaseRequestId) => {
    setButtonLoading(true);
    try {
      const response = await purchaseRequestService.deletePurchaseRequest(purchaseRequestId);
      if (response) {
        message.success('Yêu cầu mua đã bị xóa.');
        fetchRequests(); // Tải lại danh sách yêu cầu
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi khi xóa yêu cầu mua.');
    } finally {
      setButtonLoading(false);
    }
  };

  const renderList = (data) => (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(request) => {
        const [isDescriptionExpanded, setDescriptionExpanded] = useState(false); // Quản lý trạng thái mô tả xem đầy đủ hay không
  
        const formatDate = (dateStr) => {
          if (!dateStr) return 'Không có'; // Nếu không có giá trị, trả về "Không có"
          const parsedDate = parseISO(dateStr); // Chuyển chuỗi thời gian ISO thành đối tượng Date
          return format(parsedDate, 'dd/MM/yyyy HH:mm:ss'); // Định dạng ngày giờ theo mẫu dd/MM/yyyy HH:mm:ss
        };
  
        return (
          <List.Item>
            <Card >
              <div style={{ display: 'flex' , justifyContent: 'space-between'}}>
                <div style={{ flex: "2", paddingRight: '20px' }}>
                  <p><strong>Tên sản phẩm:</strong> {request.productName || 'Không có'}</p>
                  <p><strong>Giá:</strong> {request.productPrice ? `${request.productPrice} VND` : 'Không có'}</p>
    
                  <p><strong>Mô tả:</strong> 
                    {/* Hiển thị mô tả ngắn hoặc dài tùy thuộc vào trạng thái */}
                    {isDescriptionExpanded ? 
                      request.productDescription || 'Không có mô tả' : 
                      `${request.productDescription?.slice(0, 100)}...`}
                    <Button 
                      type="link" 
                      onClick={() => setDescriptionExpanded(!isDescriptionExpanded)} // Toggle trạng thái mô tả
                      style={{ padding: 0 }}
                    >
                      {isDescriptionExpanded ? 'Ẩn bớt' : 'Xem thêm'}
                    </Button>
                  </p>
    
                  <p><strong>Email người mua:</strong> {request.buyerEmail || 'Không có email'}</p> {/* Hiển thị email người mua */}
                  <p><strong>Tên người mua:</strong> {request.buyerName || 'Không có tên'}</p> {/* Hiển thị tên người mua */}
                  <p><strong>Tin nhắn:</strong> {request.message}</p>
                  <p><strong>Ngày đăng:</strong> {formatDate(request.postedAt)}</p>
                  <p><strong>Ngày hết hạn:</strong> {formatDate(request.expiredAt)}</p>
                  <p>
                    <strong>Trạng thái:</strong>
                    <span
                      style={{
                        color: request.status === 'ACCEPTED' ? 'green' :
                              request.status === 'REJECTED' ? 'red' : 'orange',
                      }}
                    >
                      {request.status}
                    </span>
                  </p>
    
                  {isBuyer ? (
                    request.status === 'PENDING' && (
                      <>
                        <Button
                          type="primary"
                          loading={buttonLoading}
                          onClick={() => handleDelete(request.id)} // Button xóa yêu cầu
                          style={{ marginRight: '10px' }}
                        >
                          Xóa yêu cầu
                        </Button>
                      </>
                    )
                  ) : (
                    request.status === 'PENDING' && (
                      <>
                        <Button
                          type="primary"
                          loading={buttonLoading}
                          onClick={() => handleAccept(request.id)}
                          style={{ marginRight: '10px' }}
                        >
                          Chấp nhận
                        </Button>
                        <Button
                          type="danger"
                          loading={buttonLoading}
                          onClick={() => handleReject(request.id)}
                        >
                          Từ chối
                        </Button>
                      </>
                    )
                  )}
                </div>
                <div style={{ flex: "1", textAlign: 'center' }}>
                {request.thumbnail ? (
                  <img
                    src={request.thumbnail}
                    alt="Thumbnail"
                    style={{
                      width: '100%',
                      borderRadius: '5px',
                      objectFit: 'cover',
                    }}
                  />
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
  

  const pendingRequests = requests.filter((req) => req.status === "PENDING");
  const acceptedRequests = requests.filter((req) => req.status === "ACCEPTED");
  const rejectedRequests = requests.filter((req) => req.status === "REJECTED");

  const tabs = [
    {
      label: `Chờ xử lý (${pendingRequests.length})`,
      key: '1',
      children: pendingRequests.length > 0 ? renderList(pendingRequests) : <p>Không có yêu cầu mua chờ xử lý.</p>
    },
    {
      label: `Đã chấp nhận (${acceptedRequests.length})`,
      key: '2',
      children: acceptedRequests.length > 0 ? renderList(acceptedRequests) : <p>Không có yêu cầu mua đã chấp nhận.</p>
    },
    {
      label: `Đã từ chối (${rejectedRequests.length})`,
      key: '3',
      children: rejectedRequests.length > 0 ? renderList(rejectedRequests) : <p>Không có yêu cầu mua đã từ chối.</p>
    }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <h2>{isBuyer ? 'Yêu cầu mua của người mua' : 'Yêu cầu mua của người bán'}</h2>
      <Tabs defaultActiveKey="1" items={tabs} />
    </div>
  );
};

export default PurchaseRequest;
