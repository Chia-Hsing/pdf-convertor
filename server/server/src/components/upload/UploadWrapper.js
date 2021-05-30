import React from 'react'

import { useIndex } from '../../hooks/useIndex'
import UploadBox from './UploadBox'
import PreviewArea from './PreviewArea'

const UploadWrapper = () => {
    const { isDragIn, dropEleRef, fileList, addSelectedFileHandler, submitHandler } = useIndex()

    return (
        <section>
            <div>
                <UploadBox boxRef={dropEleRef} isDragIn={isDragIn} />
                <input type="file" multiple name="files" onChange={addSelectedFileHandler} />
                <button onClick={submitHandler}> convert </button>
            </div>
            <div>
                <PreviewArea fileList={fileList} />
            </div>
        </section>
    )
}

export default UploadWrapper
