import {memo, useState} from "react";
import style from "./addresume.module.css";
import {Button, Card, message, Upload, UploadProps} from "antd";
import {Document, Page, pdfjs} from "react-pdf";
import {
    CloudUploadOutlined,
    LeftOutlined,
    LoadingOutlined,
    MinusOutlined,
    PlusOutlined,
    RightOutlined
} from "@ant-design/icons/lib";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cat.net/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface IProps{
    resumeUrl?: any;
    setResumeUrl?: any;
}

const UplaodPreview = (props: IProps, _:any) => {
    const [numPages, setNumPages] = useState<number>(1);
    let [pageNumber, setPageNumber] = useState<number>(1);
    let [scale, setScale] = useState<number>(1.2);
    // const { resumeUrl } = props
    const uploadProps: UploadProps = {
        name: 'file',
        action: `/upload`, // 直接使用上传地址
        headers: {
            authorization: 'authorization-text',
            token: localStorage.token
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
                console.log(info.file.response)
                const { name, response } = info.file
                if (name) {
                    const url = response
                    props.setResumeUrl(url.slice(0, url.indexOf("?")))
                } else {
                    message.warning("文件名解析不出来")
                }
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    function ResumeInfo(){
        return <div style={{display: 'flex', justifyContent: "space-between"}}>
            <div>简历预览</div>
            {props.resumeUrl ? <div>
                <Button type="text">
                    {pageNumber}
                </Button>/
                <Button type="text">
                    {numPages}
                </Button>
                <Button icon={<LeftOutlined/>} disabled={pageNumber <= 1} onClick={prevPage}>上一页</Button>
                <Button icon={<RightOutlined/>} disabled={pageNumber >= numPages} onClick={nextPage}>下一页</Button>
                <Button shape="circle" onClick={() => changeScale('add')} icon={<PlusOutlined/>}/>
                <Button shape="circle" onClick={() => changeScale('reduce')} icon={<MinusOutlined/>}/>
            </div> : null}
            <div>
                <Upload {...uploadProps}>
                    <Button type="text" icon={<CloudUploadOutlined/>}>{props.resumeUrl ? '重新上传' : '选择文件上传'}</Button>
                </Upload>
            </div>
        </div>;
    }
    return <div className={`${style.card} ${style.cardresume}`}>
        <Card title={<ResumeInfo/>}>
            <Document
                loading={<div><LoadingOutlined />加载中...</div>}
                noData={<div style={{textAlign: 'center'}}>暂无数据</div>}
                file={props.resumeUrl}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page
                    scale={scale}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    renderMode="canvas"
                    className={style.pagesetting}
                    pageNumber={pageNumber}/>
            </Document>
            {props.resumeUrl ? <div>
                当前第 {pageNumber}页 共{numPages}页
            </div> : '' }
        </Card>
    </div>
    function onDocumentLoadSuccess({ numPages }:{numPages: any}) { // 获取pdf页面总数
        // console.log(`获取第${numPages}页`)
        setNumPages(numPages);
    }
    function changeScale(field: string){
        if (field === 'add'){
            if (scale >= 1.7) {
                return
            } else {
                setScale(scale+=0.1)
            }
        } else if (field === 'reduce') {
            if (scale <= 0.7) {
                return
            } else {
                setScale(scale-=0.1)
            }
        }
    }
    function prevPage (){ // 展示上一页
        if (pageNumber <= 1){
            return
        } else {
            setPageNumber(pageNumber-=1)
        }
    }
    function nextPage () {// 展示下一页
        if (pageNumber > numPages){
            return
        } else {
            setPageNumber(pageNumber+=1)
        }
    }
}
export default UplaodPreview
