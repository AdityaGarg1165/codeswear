import React from 'react'

export default function Toploader({animation}) {
  console.log(animation)
  return (
    <div>
        <div className={`w-0 h-1 bg-indigo-600 animate-[${animation}_2s_ease-in-out]`}></div>
    </div>
  )
}
