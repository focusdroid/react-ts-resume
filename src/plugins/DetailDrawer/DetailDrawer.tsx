import {Button, Card, Col, Drawer, Row, Tag} from "antd";
import {forwardRef, useState} from "react";
import styles from '../../view/resumeManagement/resume.module.css'
import {levelField} from "../../utils/types";

interface IProps {
    ref: any,
    resumeDetail: any
}

const DetailDrawer = (props:IProps, ref:any) => {
    const [open, setOpen] = useState<boolean>(false);
    const { resumeDetail } = props
    return <Drawer
        title={`${resumeDetail?.name} 简历详情  / 当前年月日: ${new Date().toLocaleDateString().replaceAll("/", "-")}`}
        placement="right"
        width={800}
        onClose={onClose}
        open={open}>
        <Card>
            <Row gutter={[16, 16]}>
                <Col span={8}><span className={styles.fontStyle}>姓名: {resumeDetail?.name}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>性别: {resumeDetail?.gender}</span></Col>
                <Col span={8}><span
                    className={styles.fontStyle}>级别: {getLevelField(resumeDetail?.level, resumeDetail?.jobbed)}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>邮箱: {resumeDetail?.email}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>电话: {resumeDetail?.phone}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>工作年限: {resumeDetail?.jobbed_year}年</span></Col>
                <Col span={8}><span className={styles.fontStyle}>是否重点关注: {resumeDetail?.follow ?
                    <Tag style={{marginLeft: 10}} color="#87d068">
                        重点关注
                    </Tag> : ""}</span></Col>
            </Row>
        </Card>
        <Card style={{marginTop: 10}}>
            <Row gutter={[16, 16]}>
                <Col span={8}><span className={styles.fontStyle}>目标公司: {resumeDetail?.target_company}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>入职负责人: {resumeDetail?.person_charge}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>几号入职: {resumeDetail?.time_induction}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>岗位工资: {resumeDetail?.post_salary}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>入职意向: {resumeDetail?.employment_intention}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>首次联系时间: {resumeDetail?.first_contact_time}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>备注信息: {resumeDetail?.remarks}</span></Col>
            </Row>
        </Card>
        <Button style={{marginTop: 10}} type="primary">在线查看简历</Button>
    </Drawer>;
    function onClose () {
        setOpen(false);
    }
    const OnOpenDrawer = () => {
        setOpen(true);
    }
    function getLevelField(level: string | undefined, jobbed: string | undefined) {
        return `${levelField.get(level as string)} ${jobbed}`
    }
}

export default forwardRef(DetailDrawer)
