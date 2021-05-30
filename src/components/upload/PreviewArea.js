import React from 'react'

const PreviewArea = props => {
    const list = props.fileList.map((item, i) => {
        return <li key={i}>{item.name}</li>
    })

    return <ul>{list}</ul>
}

export default PreviewArea
