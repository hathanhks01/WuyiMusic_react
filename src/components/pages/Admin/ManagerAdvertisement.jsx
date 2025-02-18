import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message, ConfigProvider, theme } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { App } from "antd"; // Thêm App vào import
import AdvertisementService from "../../../Services/AdvertisementServices";
import UserService from "../../../Services/UserService";

const { Option } = Select;

const Advertisement = () => {
    const [advertisements, setAdvertisements] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingAdvertisement, setEditingAdvertisement] = useState(null);
    const [form] = Form.useForm();
    const pageSize = 10;

    const fetchAdvertisements = async () => {
        setLoading(true);
        try {
            const data = await AdvertisementService.getAllAdvertisements();
            setAdvertisements(data);
            message.success("Lấy danh sách quảng cáo thành công");
        } catch (error) {
            message.error("Lỗi khi lấy danh sách quảng cáo");
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await UserService.getAllUsers();
    
            // Chỉ lọc bỏ user có userid là null
            const filteredUsers = data.filter(user => user.userid !== null);
    
            console.log("Danh sách người dùng sau khi lọc:", filteredUsers);
            setUsers(filteredUsers);
        } catch (error) {
            message.error("Lỗi khi lấy danh sách người dùng");
        }
    };
    

    useEffect(() => {
        fetchAdvertisements();
        fetchUsers();
    }, []);

    const openModal = (record = null) => {
        console.log("Record khi mở modal:", record);
        setModalVisible(true);
        setEditingAdvertisement(record);
    
        if (record) {
            form.setFieldsValue({
                content: record.content,
                userId: record.userId ?? null, // Kiểm tra userId khi mở Modal
            });
            console.log("Set userId:", record.userId);
        } else {
            form.resetFields();
        }
    };
    


    const handleCreate = async () => {
        try {
            const values = await form.validateFields();
            console.log("Creating new advertisement with values:", values); // Kiểm tra giá trị form trước khi gửi đi
    
            // Xử lý gửi yêu cầu tạo mới quảng cáo với chỉ content và userId
            const requestBody = {
                content: values.content,  // Nội dung quảng cáo
                userId: values.userId     // UserId đã được chọn trong form
            };
    
            await AdvertisementService.addAdvertisement(requestBody);
            message.success("Thêm mới quảng cáo thành công");
            setModalVisible(false);
            fetchAdvertisements();
        } catch (error) {
            message.error("Lỗi khi thêm mới quảng cáo");
            console.error("Error during create:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            console.log("Updating advertisement with values:", values); // Kiểm tra giá trị form trước khi gửi đi
            await AdvertisementService.updateAdvertisement(editingAdvertisement.advertisementId, values);
            message.success("Cập nhật quảng cáo thành công");
            setModalVisible(false);
            fetchAdvertisements();
        } catch (error) {
            message.error("Lỗi khi cập nhật quảng cáo");
            console.error("Error during update:", error);
        }
    };
    

    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
            width: 70,
            align: "center",
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
            align: "center",
            width: '50%',
        },
        {
            title: "Người đăng",
            dataIndex: "userId",
            key: "userId",
            align: "center",
            width: '30%',
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <div className="space-x-2">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => openModal(record)}
                        className="bg-[#1db954] hover:bg-[#1ed760]"
                    >
                        Sửa
                    </Button>                    
                </div>
            ),
            align: "center",
            width: '20%',
        },
    ];

    const darkThemeConfig = {
        algorithm: theme.darkAlgorithm,
        token: {
            colorPrimary: '#1db954',
            colorBgBase: '#111727',
            colorBgContainer: '#1a1f32',
            colorBgElevated: '#1a1f32',
            colorText: '#ffffff',
            colorBorder: '#2a3042',
        },
    };

    return (
        <ConfigProvider theme={darkThemeConfig}>
            <div className="w-full h-full bg-[#111727] text-white">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Quản lý Quảng Cáo</h2>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => openModal()}
                            className="bg-[#1db954] hover:bg-[#1ed760]"
                        >
                            Thêm quảng cáo mới
                        </Button>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <Table
                            columns={columns}
                            dataSource={Array.isArray(advertisements) ? advertisements : []}
                            rowKey="advertisementId"
                            loading={loading}
                            pagination={{
                                current: currentPage,
                                pageSize: pageSize,
                                total: advertisements?.length || 0,
                                onChange: (page) => setCurrentPage(page),
                            }}
                            className="w-full"
                            scroll={{ x: true }}
                        />
                    </div>
                </div>

                <Modal
                    title={editingAdvertisement ? "Cập nhật Quảng Cáo" : "Thêm mới Quảng Cáo"}
                    open={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                    className="dark-modal"
                    width={800}
                >
                    <Form form={form} layout="vertical" onFinish={editingAdvertisement ? handleUpdate : handleCreate} className="w-full">
    <Form.Item
        label="Nội dung"
        name="content"
        rules={[{ required: true, message: "Vui lòng nhập nội dung quảng cáo" }]}
    >
        <Input.TextArea placeholder="Nhập nội dung quảng cáo" rows={4} />
    </Form.Item>

    <Form.Item
    label="Người dùng"
    name="userId"
    rules={[{ required: true, message: "Vui lòng chọn người dùng" }]}
>
    <Select
        placeholder="Chọn người dùng"
        onChange={(value) => {
            // Khi người dùng chọn, giá trị sẽ là userId (Guid)
            console.log("Selected userId:", value);
        }}
    >
        {users.map((user, index) => (
            <Option key={user.userid || index} value={user.userid}>
                {user.username} {/* Hiển thị username */}
            </Option>
        ))}
    </Select>
</Form.Item>

    <Form.Item className="flex justify-end space-x-2">
        <Button onClick={() => setModalVisible(false)}>Hủy</Button>
        <Button type="primary" htmlType="submit" className="bg-[#1db954]">Lưu</Button>
    </Form.Item>
</Form>
                </Modal>
            </div>
        </ConfigProvider>
    );
};

export default Advertisement;