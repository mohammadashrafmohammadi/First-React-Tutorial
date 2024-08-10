import React from 'react'
import { useParams } from "react-router-dom"

export function PostDetail() {
    const {post_id} = useParams()
    console.log(post_id)
  return (
    <div>PostDetail</div>
  )
}



