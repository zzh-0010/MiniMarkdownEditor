import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { ModalProvider } from 'styled-react-modal'
import { StyledModal } from './styled'


interface ExportModalProps{
    isOpen:boolean;
    onRequestClose:()=>void;
    content:string;
}

const ExportModal:React.FC<ExportModalProps>=({isOpen,onRequestClose,content})=>{

    const [filename, setFilename] = useState('exported');
    const [format, setFormat] = useState('html');

    const handleExport=(content:string,filename: string, format: string)=>{
        if (content==="<p></p>"){
            alert("导出内容为空，请填写内容后重试。");
            return;      //ps：可以加个提示
        } 
        if (format === 'html') {
            content = `<!DOCTYPE html><html><head><title>${filename}</title></head><body><pre>${content}</pre></body></html>`;
            const blob = new Blob([content], { type: 'text/html' });
            saveAs(blob, `${filename}.html`);
        } else if (format === 'text') {
            const blob = new Blob([content], { type: 'text/plain' });
            saveAs(blob, `${filename}.txt`);
        }else if (format === 'pdf') {

            // 使用html2canvas渲染，缺点：由于html和pdf样式不同，字会挤在一起
            const container = document.getElementById('html-container');
            if (!container) return;
            html2canvas(container).then((canvas:HTMLCanvasElement) => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, width - 20, height - 20);
            pdf.save(filename);
            });

            //未渲染的pdf
            // const pdf = new jsPDF();
            // const lines = content.split('\n');
            // let yPos = 10;
            // lines.forEach((line: string | string[]) => {
            //   pdf.text(line, 10, yPos);
            //   yPos += 10; 
            // });
            // const pdfBytes = pdf.output('arraybuffer');
            // const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            // saveAs(blob, `${filename}.pdf`);
        }
        onRequestClose();
    }

    return(
         <ModalProvider>
            <StyledModal isOpen={isOpen} onBackgroundClick={onRequestClose}  onEscapeKeydown={onRequestClose} allowScroll={true} >
                <div className='modal-header'>
                        导出设置
                </div>
                <hr></hr>
                <div>
                    <p>
                        <label>
                            文件名:
                            <input type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
                        </label>
                    </p>
                    <p>
                        <label>
                            导出格式:
                            <select value={format} onChange={(e) => setFormat(e.target.value)}>
                                <option value="html">HTML</option>
                                <option value="text">Text</option>
                                <option value="pdf">PDF</option>
                            </select>
                        </label>
                    </p>
                    <p>
                        <button onClick={onRequestClose} className='modal-button'>取消</button>
                        <button onClick={()=>handleExport(content,filename,format)} className='modal-button'>确定</button>
                    </p>
                </div>
            </StyledModal>
        </ModalProvider>
    )
}

export default ExportModal