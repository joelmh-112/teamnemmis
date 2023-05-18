import {useState} from 'react'

interface Props{
  open: boolean;
}

export default function Sidebar(props:Props) {

  const {open} = props;
  return (
    <aside className={`${open ? 'w-56' : 'w-16'} bg-black opacity-70 h-screen ease-in-out transition-all`}></aside>
  )
}
