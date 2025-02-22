import React from 'react';
import { ModalProvider } from 'styled-react-modal'
import { StyledModal } from './styled'


interface HelpModalProps{
    isOpen:boolean;
    onRequestClose:()=>void;
}


const HelpModal:React.FC<HelpModalProps>=({isOpen,onRequestClose})=>{

    return(
        <ModalProvider>
            <StyledModal isOpen={isOpen} onBackgroundClick={onRequestClose}  onEscapeKeydown={onRequestClose} allowScroll={true} >
                <div className='modal-header'>
                        使用帮助
                </div>
                <hr></hr>
                <div>
                    <h6><strong>Markdown语法参考</strong></h6>
                    <a href='https://www.markdown.cn/' >Markdown语法说明(简体中文)</a>
                    <h6 style={{marginTop: '12px'}}><strong>键盘快捷键</strong></h6>
                    <p>如果您要使用快捷键，请您聚焦于输入框</p>
                    <table className='modal-table'>
                        <thead>
                            <tr>
                                <th>键盘快捷键</th>
                                <th>说明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ctrl + B </td>
                                <td>加粗</td>
                            </tr>
                            <tr>
                                <td>Ctrl + H </td>
                                <td>插入水平线</td>
                            </tr>
                            <tr>
                                <td>Ctrl + Q </td>
                                <td>插入引用</td>
                            </tr>
                            <tr>
                                <td>Ctrl + 1~6 </td>
                                <td>插入H1~H6标题</td>
                            </tr>
                            <tr>
                                <td>Ctrl + E </td>
                                <td>导出文件</td>
                            </tr>
                            <tr>
                                <td>Ctrl + Shirt + S </td>
                                <td>插入删除线</td>
                            </tr>
                            <tr>
                                <td>Ctrl + Shift + I  </td>
                                <td>插入图片</td>
                            </tr>
                            <tr>
                                <td>Ctrl + I </td>
                                <td>插入斜体</td>
                            </tr>
                            <tr>
                                <td>Ctrl + T </td>
                                <td>插入表格</td>
                            </tr>
                            <tr>
                                <td>Ctrl + L </td>
                                <td>插入链接</td>
                            </tr>
                            <tr>
                                <td>Ctrl + U </td>
                                <td>插入无序表格</td>
                            </tr>
                            <tr>
                                <td>Ctrl + O </td>
                                <td>插入有序表格</td>
                            </tr>
                        </tbody>
                    </table>
                    <h6 style={{marginTop: '12px'}}><strong>联系我们</strong></h6>
                    <p>如果还有什么疑惑或建议，欢迎联系wx：18259115926</p>
                    <p>
                        <button onClick={onRequestClose} className='modal-button'>取消</button>
                    </p>
                </div>
            </StyledModal>
        </ModalProvider>
    )
}

export default HelpModal