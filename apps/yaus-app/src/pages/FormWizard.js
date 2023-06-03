import { useState } from "react";
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Steps, Input, Select, Tooltip, Button, Space, Layout } from "antd";
import { Checkbox, message, Card, Modal, Menu, Avatar, Alert, Upload, Row, Col } from "antd";
import axios from 'axios';
import { CopyOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import Interaction from "../components/layout/Interaction";
import { nanoid } from 'nanoid';
import {
    LOVE_ICON,
    COMMENT_ICON,
    SHARE_ICON,
} from "../components/layout/icons"
const { Header, Footer, Content } = Layout;
const { Option } = Select;
const { Step } = Steps;
const { Item } = Form;
const { Meta } = Card;


const children = [];
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};


const FormDemo = () => {

    const baseUrl = " https://yaus.xyz";
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const [formLayout, setFormLayout] = useState('vertical');
    const [selectedMenuItem, setSelectedMenuItem] = useState('useUrl');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modal1Visible, setModal1Visible] = useState(false);

    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const history = useHistory();

    const routeChange = () => {
        let path = `/dashboard`;
        history.push(path);
    }
    const selectBefore = (
        <Select defaultValue="Default" className="select-before">
            <Option value="WebUrl">Web Url</Option>
            <Option value="DeepView">Deep View</Option>
            <Option value="Defaultt">Default</Option>
        </Select>
    );
    const selectBeforeLink = (
        <Select defaultValue="Deeplink_path" className="select-before">
            <Option value="Deeplink_path">$deeplink_path</Option>
            <Option value="ios">$ios_deeplink_path</Option>
            <Option value="amndroid">$android_deeplink_path</Option>
            <Option value="desktop">$desktop_deeplink_path</Option>
        </Select>
    );

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    const [state, setState] = useState({
        userID: '0fe6ff38-fc46-11ec-b939-0242ac120001',
        url: '',
        project: '0fe6ff38-fc46-11ec-b939-0242ac120002',
        customHashId: nanoid(6),
        titleImage: '',
        urlImg: '',
        description: '',
    });
    const handleSubmit = (e) => {
        const userData = {
            customHashId: state.customHashId,
            project: state.project,
            url: state.url,
            userID: state.userID
        };
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT fefege...',
            "Access-Control-Allow-Origin": "*"
        }
        console.log(userData);  
        axios.post(`${baseUrl}/register`, userData, { headers: headers }).then((response) => {
            console.log(response.status);
            console.log(response.data.token);
            console.log(`${baseUrl}/${state.customHashId}`);

        });

    }
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const handleClickNext = () => {
        form
            .validateFields()
            .then(() => {
                // Here make api call of something else
                setCurrent(current + 1);
            })
            .catch((err) => console.log(err));
    };
    const handleClickPrev = () => {
        setCurrent(current - 1);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        /* console.log(`${baseUrl}/${state.customHashId}`); */
        setState({
            ...state,
            [e.target.name]: value

        });
    };
    const componentsSwtich = (key) => {
        switch (key) {
            case 'useUrl':
                return (<>
                    <h5 style={{ width: 500, marginTop: "10px" }}>Please provide a valid image file url from the web ending in .png, .jpg, or .jpeg or upload your own valid image.</h5>
                    <Form.Item label="Image Url" style={{ marginTop: "10px" }}>
                        <Space>
                            <Form.Item
                                noStyle
                                rules={[
                                    {
                                        required: false,
                                        message: 'title',
                                    },
                                ]}
                            >
                                <Input
                                    name="urlImg"
                                    id="urlImg" value={state.urlImg}
                                    style={{
                                        width: 500,
                                    }}
                                    placeholder="e.g https://website.com.tree.jpg"

                                    onChange={handleChange}
                                />

                            </Form.Item>
                        </Space>
                    </Form.Item>
                </>
                );
            case 'upload':
                return (<>
                    <h5 style={{ width: 500, marginTop: "10px" }}>Please provide a valid image file url from the web ending in .png, .jpg, or .jpeg or upload your own valid image.</h5>
                    <Upload {...props}>
                        <Button type='dashed'>
                            Click to Upload
                        </Button>
                    </Upload>
                </>);
        }
    };
    const formItemLayout =
        formLayout === 'vertical'
            ? {
                labelCol: {
                    span: 80,
                },
                wrapperCol: {
                    span: 1,
                },
            }
            : null;
    return (
        <div classname="layout-content">
            <Steps current={current}>
                <Step key={0} title="Step 1" />
                <Step key={1} title="Step 2" />
                <Step key={2} title="Step3 " />
                <Step key={3} title="Step 4" />
                <Step key={4} title="Step 5" />
            </Steps>
            <div style={{ margin: "50px 10px" }}>
                <Form form={form}
                    justify="center"
                    align="middle"
                    margin="auto"
                    id="myForm"

                    style={{ minHeight: '20vh' }}
                    {...formItemLayout}
                    layout={formLayout}
                    onSubmit={e => e.preventDefault()}
                    onFinish={handleSubmit}

                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 2,
                    }}
                >
                    {current === 0 && (
                        <>
                            <div className="steps-content">
                                <h3>Name Your Link </h3>
                                <h5>Let's start by naming your link and creating an alias. Make the link title easy to remember for you , as it will be displayed in the Quick Links table.</h5>
                                <div style={{ marginLeft: "30%" }}>
                                    <Form.Item label="Link Title" name="linkTitle" required tooltip="This is a required field" value="vertical" rules={[
                                        {
                                            required: true,
                                            message: 'Title is required',
                                        },
                                    ]}>
                                        <Input
                                            style={{
                                                width: 500,
                                            }}
                                            placeholder="Please Enter Title of Link"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Link Domain" required tooltip="This is a required field" rules={[
                                        {
                                            required: true,
                                            message: 'Province is required',
                                        },
                                    ]}>
                                        <Input.Group compact>

                                            <Input addonBefore="yaus.xyz/" initialValues="TT141kANAe" style={{
                                                width: 500,
                                            }} id="customHashId" name="customHashId" value={state.customHashId}
                                                onChange={handleChange} />
                                        </Input.Group>
                                    </Form.Item>
                                    <Form.Item label="Original Web URL" tooltip={{
                                        title: 'Tooltip with customize icon',
                                        icon: <InfoCircleOutlined />,
                                    }} rules={[
                                        {
                                            required: true,
                                            message: 'Url is required',
                                        },
                                    ]} name="url">
                                        <Space>
                                            <Input
                                                style={{
                                                    width: 500,
                                                }}
                                                placeholder="Paste a Web URL "
                                                id="url"
                                                name="url"
                                                value={state.url}
                                                onChange={handleChange}
                                            />
                                        </Space>
                                    </Form.Item>
                                </div>
                            </div>
                        </>
                    )}

                    {current === 1 && (
                        <>
                            <div className="steps-content">
                                <h3>Analytics Tags </h3>
                                <h5>We recommend adding analytics tags that can be used to filter and compare performance of various links</h5>
                                <div style={{ marginLeft: "30%" }}>
                                    <Form.Item label="Feature (utm_medium)" tooltip={{
                                        title: 'Feature should describe the action or product where this link is placed. In the UTM world, this is typically utm_medium.',
                                        icon: <InfoCircleOutlined />,
                                    }} rules={[
                                        {
                                            required: false,
                                            message: '(utm_medium)',
                                        },
                                    ]} name="feature">
                                        <Space>
                                            <Input
                                                style={{
                                                    width: 500,
                                                }}
                                                placeholder="marketing"
                                            /* onChange={handleChange} */
                                            />
                                        </Space>
                                    </Form.Item>
                                    <Form.Item label="Channel (utm_source)" tooltip={{
                                        title: 'Tags are a free-form list of meaningful labels that can be used as filters in the Quick Links table. Use them to keep your analytics organized.',
                                        icon: <InfoCircleOutlined />,
                                    }} rules={[
                                        {
                                            required: false,
                                            message: '(utm_source)',
                                        },
                                    ]} name="channel">
                                        <Space>
                                            <Input
                                                style={{
                                                    width: 500,
                                                }}
                                                placeholder="e.g.Facebook,Twitter"
                                            /* onChange={handleChange} */
                                            />
                                        </Space>
                                    </Form.Item>
                                    <Form.Item label="Campaign (utm_campaign)" tooltip={{
                                        title: 'Campaign varies from company to company, but it should describe the theme of the link. In the UTM world, this is typically utm_campaign..',
                                        icon: <InfoCircleOutlined />,
                                    }} rules={[
                                        {
                                            required: false,
                                            message: 'campain',
                                        },
                                    ]} name="campaign">
                                        <Space>
                                            <Input

                                                style={{
                                                    width: 500,
                                                }}
                                                placeholder="Black Friday"
                                            /*  onChange={handleChange} */
                                            />
                                        </Space>
                                    </Form.Item>
                                    <Form.Item label="Tags" tooltip={{
                                        title: 'Tags are a free-form list of meaningful labels that can be used as filters in the Quick Links table. Use them to keep your analytics organized.',
                                        icon: <InfoCircleOutlined />,
                                    }} rules={[
                                        {
                                            required: false,
                                            message: 'Tags',
                                        },
                                    ]} name="tags">
                                        <Space>
                                            <Select
                                                mode="tags"
                                                style={{
                                                    width: 500,
                                                }}
                                                placeholder="e.g. June Offer, Summer"
                                            /* onChange={handleChange} */
                                            >
                                                {children}
                                            </Select>
                                        </Space>
                                    </Form.Item>
                                </div>
                            </div>
                        </>
                    )}
                    {current === 2 && (
                        <>
                            <div className="steps-content">
                                <h3>Redirects </h3>
                                <h5>Tell us what to do if the app is not installed when the user clicks on the link. We can take the user to the app store, open a web page, or open adeepview.</h5>
                                <div style={{ marginLeft: "30%" }}>
                                    <Form.Item label="iOS" rules={[
                                        {
                                            required: false,
                                            message: '(ios)',
                                        },

                                    ]} name="ios">
                                        <Space>

                                            <Input addonBefore={selectBefore} defaultValue="Enter Url" style={{
                                                width: 500,
                                            }} />
                                        </Space>
                                    </Form.Item>
                                    <Form.Item label="Android" rules={[
                                        {
                                            required: false,
                                            message: '(ios)',
                                        },
                                    ]} name="android" >
                                        <Space>

                                            <Input addonBefore={selectBefore} defaultValue="Enter Url" style={{
                                                width: 500,
                                            }} />
                                        </Space>
                                    </Form.Item>
                                    <Form.Item label="Desktop" name="desktop"
                                        rules={[
                                            {
                                                required: false,
                                                message: '(ios)',
                                            },
                                        ]}>
                                        <Space>
                                            <Input addonBefore={selectBefore} defaultValue="Enter Url" style={{
                                                width: 500,
                                            }} />
                                        </Space>
                                    </Form.Item>
                                    <Form.Item label=" " colon={false}>
                                        <Checkbox onChange={onChange} style={{ width: 500 }} >Web Only Link</Checkbox>
                                        <h5 style={{ marginRight: '10%', width: 500 }}>Always redirect to web, even if the app is installed. Please note that the toggle only affects iOS links by default</h5>

                                    </Form.Item>
                                </div>
                            </div>
                        </>
                    )}
                    {current === 3 && (
                        <>
                            <div className="steps-content">
                                <h3>Link Data </h3>
                                <h5>Add the data that you want to be passed to your app via this link. This data is also used to configure link functions like routing, attribution windows, etc. All keys and values are case-sensitive</h5>
                                <div style={{ marginLeft: "30%" }}>
                                    <Form.Item label="Key-Value" name="ios"
                                        rules={[
                                            {
                                                required: false,
                                                message: '(ios)',
                                            },
                                        ]}>
                                        <Space>
                                            <Input addonBefore={selectBeforeLink} style={{
                                                width: 500,
                                            }} />

                                        </Space>
                                    </Form.Item>
                                    <Form.Item label="Key-Value" name="ios2"
                                        rules={[
                                            {
                                                required: false,
                                                message: '(ios2)',
                                            },
                                        ]}>
                                        <Space>
                                            <Input addonBefore={selectBeforeLink} style={{
                                                width: 500,
                                            }} />
                                        </Space>
                                    </Form.Item>
                                </div>
                            </div>
                        </>
                    )}
                    {current === 4 && (
                        <>
                            <div className="steps-content">
                                <h3>Social Media Tags </h3>
                                <h5 >When a link is shared on social media platforms, it generally shows a preview of title, description, and image</h5>
                                <div style={{ marginLeft: "30%" }}>
                                    <Form.Item label="Title" tooltip={{
                                        title: 'Title of Shorten Url',
                                        icon: <InfoCircleOutlined />,
                                    }} rules={[
                                        {
                                            required: false,
                                            message: 'title',
                                        },
                                    ]}>
                                        <Space>

                                            <Input
                                                style={{
                                                    width: 500,
                                                }}
                                                id="titleImage" name="titleImage" value={state.titleImage}
                                                onChange={handleChange}
                                            />
                                        </Space>
                                    </Form.Item>
                                    <Form.Item label="Description" rules={[
                                        {
                                            required: false,
                                            message: 'description',
                                        },
                                    ]}>
                                        <Space>
                                            <Input
                                                id="description" name="description" value={state.description}
                                                onChange={handleChange}
                                                style={{
                                                    width: 500,
                                                }}
                                            />
                                        </Space>
                                    </Form.Item>
                                    <Form.Item label="Image URL" tooltip={{
                                        title: 'Note that your image may be cropped and aligned differently depending on the social platform.',
                                        icon: <InfoCircleOutlined />,
                                    }}>
                                        <Menu style={{ width: 500 }} selectedKeys={selectedMenuItem} mode="horizontal" onClick={(e) =>
                                            setSelectedMenuItem(e.key)}>
                                            <Menu.Item key="useUrl" >
                                                Use Url
                                            </Menu.Item>
                                            <Menu.Item key="upload" >
                                                Upload Image
                                            </Menu.Item>
                                        </Menu>
                                        <div>
                                            {componentsSwtich(selectedMenuItem)}
                                        </div>
                                    </Form.Item>
                                    <Form.Item label=" " colon={false}>
                                        <Button type="preview" align="right" onClick={showModal}>
                                            Preview
                                        </Button>
                                        <Modal title="Preview" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={550}>
                                            <Card
                                                hoverable
                                                style={{
                                                    width: 440,
                                                }}
                                            /* cover={<img alt="example" src={state.urlImg} />} */
                                            >

                                                <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} title="Akshay" description={"10 hours ago • Algeria"} />
                                                <br></br>
                                                <LinkPreview url={state.url} title="Aksjat" width='400px' fallbackImageSrc="https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg" explicitImageSrc={state.urlImg} />
                                                <br></br>
                                                <Footer>
                                                    <br></br>
                                                    <div class="flexbox-container" justify-content="space-between">
                                                        &nbsp;&nbsp;<Interaction icon={LOVE_ICON} count={12} style={{ paddingTop: "10px" }} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <Interaction icon={COMMENT_ICON} count={2} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <Interaction icon={SHARE_ICON} count={1} />
                                                    </div>
                                                </Footer>
                                            </Card>
                                        </Modal>
                                    </Form.Item>

                                </div>
                            </div>
                        </>
                    )}
                </Form>
            </div>
            <div className="steps-action" align="right" style={{ marginRight: "50px" }}>
                {current > 0 && (
                    <Button onClick={handleClickPrev} style={{
                        margin: '0 8px',
                    }}>Previous</Button>
                )}
                {current < 4 && (
                    <Button type="primary" onClick={handleClickNext}>Next</Button>
                )}
                {current === 4 && (
                    <>
                        {/*  <Button form="myForm" type="submit" htmlType="submit" align="right" onClick={() => navigator.clipboard.writeText(`${baseUrl}/${state.customHashId}`)}>
                        Done
                    </Button> */}
                        <Button form="myForm" type="submit" htmlType="submit" align="right" onClick={() => setModal1Visible(true)}>
                            Done
                        </Button>
                        <Modal
                            title="Summary"
                            width={1000}
                            style={{
                                top: 20,
                            }}
                            visible={modal1Visible}
                            onOk={() => setModal1Visible(false)}
                            onCancel={() => setModal1Visible(false)}
                        >

                            <Row gutter={[24, 0]}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                                    <Alert message="Naming Link" type="success" showIcon />
                                    <br></br>
                                    <Alert message="Analytics Tags" type="success" showIcon />
                                    <br></br>
                                    <Alert message="Redirect" type="warning" showIcon />
                                    <br></br>
                                    <Alert message="Social Media tags" type="success" showIcon />

                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                                    <h2>Preview...</h2>
                                    <Card
                                        hoverable
                                        style={{
                                            width: 440,
                                        }}                              
                                    >
                                        <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} title="Akshay" description={"10 hours ago • Algeria"} />
                                        <br></br>
                                        <LinkPreview url={state.url} title="Akshay" width='400px' fallbackImageSrc="https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg" explicitImageSrc={state.urlImg} />
                                        <br></br>
                                        <Footer>
                                            <br></br>
                                            <div class="flexbox-container" justify-content="space-between">
                                                &nbsp;&nbsp;<Interaction icon={LOVE_ICON} count={12} style={{ paddingTop: "10px" }} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Interaction icon={COMMENT_ICON} count={2} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Interaction icon={SHARE_ICON} count={1} />
                                            </div>
                                        </Footer>
                                    </Card>
                                    <br></br>
                                    <Input.Group compact>
                                        <Input
                                            style={{
                                                width: 'calc(100% - 200px)',
                                            }}
                                            value={`${baseUrl}/${state.customHashId}`}
                                        />
                                        <Tooltip title="copy git url">
                                            <Button size="small" icon={<CopyOutlined size="large" style={{ fontSize: '150%' }} />} onClick={() => navigator.clipboard.writeText(`${baseUrl}/${state.customHashId}`)} />
                                        </Tooltip>
                                    </Input.Group>
                                </Col>
                            </Row>


                        </Modal>

                    </>

                )}
            </div>


        </div>
    );
};

export default FormDemo;