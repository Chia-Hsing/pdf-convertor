import { useCallback, useEffect, useRef, useState } from 'react'

const useDragAndDrop = addFileHandler => {
    const dropEleRef = useRef(null)

    const [isDragIn, setIsDragIn] = useState(false)
    const [dragEle, setDragEle] = useState(0)

    const checkDraggingItems = e => e.dataTransfer.items && e.dataTransfer.items.length > 0
    // check if there is an item being dragged.
    // dataTransfer.items gives a object which is a list of all of the drag data.

    const stopEventDefault = e => {
        e.preventDefault()
        e.stopPropagation()
    }
    // stop the event's default behavior.

    const dragEnterHandler = useCallback(e => {
        stopEventDefault(e)

        setDragEle(prevState => prevState++)

        const draggingItems = checkDraggingItems(e)

        if (draggingItems) {
            setIsDragIn(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const dragLeaveHandler = useCallback(e => {
        stopEventDefault(e)

        setDragEle(prevState => prevState--)

        if (dragEle === 0) {
            setIsDragIn(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const dragOverHandler = useCallback(e => {
        stopEventDefault(e)
    }, [])

    const dropHandler = useCallback(e => {
        stopEventDefault(e)

        setIsDragIn(false)

        const draggingItems = checkDraggingItems(e)

        if (draggingItems && e.dataTransfer.files) {
            addFileHandler && addFileHandler(e.dataTransfer.files)
            e.dataTransfer.clearData()
            setDragEle(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const ele = dropEleRef.current
        if (ele) {
            ele.addEventListener('dragenter', dragEnterHandler)
            ele.addEventListener('dragleave', dragLeaveHandler)
            ele.addEventListener('dragover', dragOverHandler)
            ele.addEventListener('drop', dropHandler)

            return () => {
                ele.removeEventListener('dragenter', dragEnterHandler)
                ele.removeEventListener('dragleave', dragLeaveHandler)
                ele.removeEventListener('dragover', dragOverHandler)
                ele.removeEventListener('drop', dropHandler)
            }
        }
    }, [dragEnterHandler, dragLeaveHandler, dragOverHandler, dropHandler])

    return {
        isDragIn,
        dropEleRef,
    }
}

export default useDragAndDrop
