import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message, ConfigProvider, theme } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import LyricsService from "../../../Services/LyricService";
const { Option } = Select;

const Lyrics = () => {
    const [lyrics, setLyrics] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingLyrics, setEditingLyrics] = useState(null);
    const [form] = Form.useForm();
    const pageSize = 10;

    const fetchLyrics = async () => {
        setLoading(true);
        try {
            const data = await LyricsService.getAllLyrics();
            setLyrics(data);
            message.success("Lấy danh sách lời bài hát thành công");
        } catch (error) {
            message.error("Lỗi khi lấy danh sách lời bài hát");
        } finally {
            setLoading(false);
        }
    };

    const fetchTracks = async () => {
        try {
            const data = await LyricsService.getAllTrack();
            setTracks(data);
        } catch (error) {
            message.error("Lỗi khi lấy danh sách bài hát");
        }
    };

    useEffect(() => {
        fetchLyrics();
        fetchTracks();
    }, []);

    const openModal = (record = null) => {
        setModalVisible(true);
        setEditingLyrics(record);

        if (record) {
            form.setFieldsValue({
                content: record.content,
                trackId: record.trackId ?? null,
            });
        } else {
            form.resetFields();
        }
    };

    const handleCreate = async () => {
        try {
            const values = await form.validateFields();

            const requestBody = {
                content: values.content,
                trackId: values.trackId,
            };

            await LyricsService.addLyrics(requestBody);
            message.success("Thêm mới lời bài hát thành công");
            setModalVisible(false);
            fetchLyrics();
        } catch (error) {
            message.error("Lỗi khi thêm mới lời bài hát");
        }
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            await LyricsService.updateLyrics(editingLyrics.lyricsId, values);
            message.success("Cập nhật lời bài hát thành công");
            setModalVisible(false);
            fetchLyrics();
        } catch (error) {
            message.error("Lỗi khi cập nhật lời bài hát");
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
            width: "50%",
        },
        {
            title: "Bài hát",
            dataIndex: "trackId",
            key: "trackId",
            align: "center",
            width: "30%",
            render: (trackId) => {
                const track = tracks.find((t) => t.trackId === trackId);
                return track ? track.title : "Không xác định";
            },
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
            width: "20%",
        },
    ];

    const darkThemeConfig = {
        algorithm: theme.darkAlgorithm,
        token: {
            colorPrimary: "#1db954",
            colorBgBase: "#111727",
            colorBgContainer: "#1a1f32",
            colorBgElevated: "#1a1f32",
            colorText: "#ffffff",
            colorBorder: "#2a3042",
        },
    };

    return (
        <ConfigProvider theme={darkThemeConfig}>
            <div className="w-full h-full bg-[#111727] text-white">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Quản lý Lời Bài Hát</h2>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => openModal()}
                            className="bg-[#1db954] hover:bg-[#1ed760]"
                        >
                            Thêm lời bài hát mới
                        </Button>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <Table
                            columns={columns}
                            dataSource={Array.isArray(lyrics) ? lyrics : []}
                            rowKey="lyricsId"
                            loading={loading}
                            pagination={{
                                current: currentPage,
                                pageSize: pageSize,
                                total: lyrics?.length || 0,
                                onChange: (page) => setCurrentPage(page),
                            }}
                            className="w-full"
                            scroll={{ x: true }}
                        />
                    </div>
                </div>

                <Modal
                    title={editingLyrics ? "Cập nhật Lời Bài Hát" : "Thêm mới Lời Bài Hát"}
                    open={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                    className="dark-modal"
                    width={800}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={editingLyrics ? handleUpdate : handleCreate}
                        className="w-full"
                    >
                        <Form.Item
                            label="Nội dung"
                            name="content"
                            rules={[{ required: true, message: "Vui lòng nhập nội dung lời bài hát" }]}
                        >
                            <Input.TextArea placeholder="Nhập lời bài hát" rows={4} />
                        </Form.Item>

                        <Form.Item label="Bài hát" name="trackId" rules={[{ required: true, message: "Vui lòng chọn bài hát" }]}>
                        <Select placeholder="Chọn bài hát">
                            {tracks.map((track) => (
                                <Option key={track.trackId} value={track.trackId}>{track.title}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => setModalVisible(false)}>Hủy</Button>
                        <Button type="primary" htmlType="submit" className="ml-2">Lưu</Button>
                    </Form.Item>
                        

                        <Form.Item className="flex justify-end space-x-2">
                            <Button onClick={() => setModalVisible(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit" className="bg-[#1db954]">
                                Lưu
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </ConfigProvider>
    );
};

export default Lyrics;
