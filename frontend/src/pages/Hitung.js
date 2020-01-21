import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Popconfirm, Icon, Input, Radio } from 'antd';
import Axios from 'axios';
import UserContext from '../util/UserContext';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';

export default function Hitung() {

    let [loading, setLoading] = useState(false);
    const lelang = useContext(UserContext);

    async function submit(e) {
        setLoading(true);
        e.preventDefault();
        try {
            const token = await Axios.post('http://localhost:5000/lelang/');
            localStorage.setItem('token', token.data.token);
            window.location.replace('/')
        }
        catch (e) {
            alert("error")
        }
        setLoading(false);
    }

    return (
        <div>

            <Form style={{ textAlign: "left", marginLeft: 40 }} onSubmit={(e) => submit(e)}>
                <h1 style={{ textAlign: 'center' }}>Input Penilaian {lelang.data}</h1>
                <div>
                    <h3 style={{ textAlign: 'center' }}>1. Administrasi </h3>
                    <Form.Item label="Nama Perusahaan">
                        <Input style={{ width: '20%' }} />
                    </Form.Item>

                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>2. Peminatan Tower Power </h3>
                    <Form.Item label="Tower">
                        <Radio.Group>
                            <Radio value={1}>
                                Ada
                    </Radio>
                            <Radio value={2}>
                                Tidak ada
                    </Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>

                <div>
                    <h3 style={{ textAlign: 'center' }}>3. Financial Capability</h3>
                    <Form.Item label="Bank Support/Jaminan Bank">
                        <Radio.Group>
                            <Radio value={1}>
                                <Input style={{ width: '80%' }} />
                            </Radio>
                            <Radio value={2}>
                                Ada
                    </Radio>
                            <Radio value={3}>
                                Tidak ada
                    </Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>

                <div>
                    <h3 style={{ textAlign: 'center' }}>4. Pengalaman</h3>

                    <Form.Item label="Scope">
                        <Radio.Group>
                            <Radio value={1}>
                                Ada
                    </Radio>
                            <Radio value={2}>
                                Tidak ada
                    </Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>5. Team Availability</h3>
                    <Form.Item label="Jumlah team">
                        <Input style={{ width: '20%' }} />
                    </Form.Item>
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>6. Stock Material dan Logistik</h3>

                    <Form.Item label="Tower dan Aksesorisnya">
                        <Radio.Group>
                            <Radio value={1}>
                                Ada
                    </Radio>
                            <Radio value={2}>
                                Tidak ada
                    </Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>7. Peralatan yang Digunakan</h3>

                    <Form.Item label="RF Survey Tools">
                        <Radio.Group>
                            <Radio value={1}>
                                Ada
                    </Radio>
                            <Radio value={2}>
                                Tidak ada
                    </Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <br />
                <div style={{ textAlign: "center" }}>
                    <button className="submit" style={{ backgroundColor: "#2a339c", color: "white", width: "80px", height: "40px", borderRadius: "5px" }}
                        type={"submit"}>{loading ? "Loading.." : "Input"}</button>
                    <br />
                    <br />
                </div>
            </Form>
        </div>
    );
}
