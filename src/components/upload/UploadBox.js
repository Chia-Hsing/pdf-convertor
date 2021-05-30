import React from 'react'

import '../../scss/uploadArea.scss'

const UploadBox = ({ boxRef, isDragIn }) => {
    return <div id="uploadBox" ref={boxRef} className={isDragIn ? 'dragIn' : 'dragOut'}></div>
}

export default UploadBox
