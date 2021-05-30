import useDragAndDrop from './useDragAndDrop'
import useFiles from './useFiles'

export const useIndex = () => {
    const options = { maxFiles: 20, overloadMsg: `Oops... upload file limit is 20.` }

    const { fileList, addSelectedFileHandler, addFileHandler, submitHandler } = useFiles(options)
    const dragAndDropProps = useDragAndDrop(addFileHandler)

    return { ...dragAndDropProps, fileList, addSelectedFileHandler, submitHandler }
}
