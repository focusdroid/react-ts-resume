import {Button, Card, Col, Drawer, Row, Tag} from "antd";
import styles from '../../view/resumeManagement/resume.module.css'
import {formatTime, loadMF, getLevelField} from "../../utils/common";

interface IProps {
    open?: boolean,
    resumeDetail?: any,
    closePriviewNotes: () => void
}

const DetailDrawer = (props:IProps) => {
    const { resumeDetail, open } = props
    return <Drawer
        title={`${resumeDetail?.name} 简历详情  / 当前年月日: ${new Date().toLocaleDateString().replaceAll("/", "-")}`}
        placement="right"
        width={1200}
        onClose={() => props?.closePriviewNotes()}
        open={open}>
        <Card>
            <Row gutter={[16, 16]}>
                <Col span={8}><span className={styles.fontStyle}>姓名: {resumeDetail?.name}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>性别: {loadMF(resumeDetail?.gender)}</span></Col>
                <Col span={8}><span
                    className={styles.fontStyle}>级别: {getLevelField(resumeDetail?.level, resumeDetail?.jobbed)}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>邮箱: {resumeDetail?.email}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>电话: {resumeDetail?.phone}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>工作年限: {resumeDetail?.jobbed_year}{resumeDetail?.jobbed_year ? <span>年</span> : null}</span></Col>
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
                <Col span={8}><span className={styles.fontStyle}>几号入职: {formatTime(resumeDetail?.time_induction)}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>岗位工资: {resumeDetail?.post_salary}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>入职意向: {resumeDetail?.employment_intention}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>首次联系时间: {formatTime(resumeDetail?.first_contact_time)}</span></Col>
                <Col span={8}><span className={styles.fontStyle}>备注信息: {resumeDetail?.remarks}</span></Col>
            </Row>
        </Card>
        <Button style={{marginTop: 10}} type="primary">在线查看简历</Button>
    </Drawer>;
}

export default DetailDrawer
