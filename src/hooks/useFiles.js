import { useState, useCallback } from 'react'

import { uploadFiles } from '../apis/apis'

const useFiles = options => {
    const { maxFiles = Infinity, overloadMsg } = options

    const [fileList, setFileList] = useState([])

    const addFileHandler = useCallback(
        FileList => {
            const fileAmount = fileList.length > 0 ? fileList.length : 0
            const isOverUpload = FileList.length + fileAmount > maxFiles

            if (isOverUpload) {
                window.alert(overloadMsg)
            } else {
                setFileList(prevState => [...prevState, ...FileList])
            }
        },
        [fileList, maxFiles, overloadMsg]
    )

    const addSelectedFileHandler = useCallback(
        e => {
            const { files } = e.target
            if (files) {
                addFileHandler(files)
            }
        },
        [addFileHandler]
    )

    const uploadFileHandler = useCallback(async (data, config) => {
        try {
            const res = await uploadFiles(data, config)

            if (!res.error) {
                return res.error
            }

            return res
        } catch (error) {
            return error
        }
    }, [])

    const submitHandler = useCallback(
        e => {
            e.preventDefault()

            if (fileList.length > 0) {
                const config = {
                    headers: { 'content-type': 'multipart/form-data' },
                }

                let dataArr = []

                for (const val of fileList) {
                    dataArr.push(val)
                }

                console.log(dataArr)
                const dataForm = new FormData()
                dataForm.append('data', dataArr[0])

                uploadFileHandler(dataForm, config)
            }
        },
        [fileList, uploadFileHandler]
    )

    return {
        fileList,
        addSelectedFileHandler,
        addFileHandler,
        submitHandler,
    }
}
export default useFiles
