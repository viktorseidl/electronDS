import React, { useEffect }  from 'react'
import { MdAttachment, MdDeleteForever, MdMarkEmailRead, MdMarkEmailUnread, MdPriorityHigh } from 'react-icons/md'
import { Link } from 'react-router-dom'

const RowMessage = ({item, erledigt,selected,selhandler,deleter,markread}) => {
    useEffect(()=>{ 
    },[selected.length])
  return (
    erledigt==0?
   <div className='w-full dark:bg-cyan-400/15 bg-orange-900/15 dark:hover:bg-blue-300/20 hover:bg-orange-900/20 cursor-pointer grid grid-cols-12 items-start justify-items-start'>
    <div className='w-full flex flex-row items-center justify-center py-2'>
    <input
             type="checkbox"
             checked={selected.includes(item.ID)}
             onChange={()=>selhandler(item.ID)}
             className=' w-4 aspect-square mr-4 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm'  
            /> 
    <Link to={'/message/'+item.ID} state={item} className='w-12 aspect-square dark:bg-blue-100 bg-blue-300 text-gray-800 rounded-full flex flex-col items-center justify-center' >
        <b className='text-sm uppercase'>{item.Sender.includes('+') ? item.Sender.replace(/\+/g, '') : item.Sender}</b>
    </Link>
    </div>
    <div className='w-full col-span-11 px-8  py-2 pl-0 flex flex-col items-start justify-start gap-y-2'>
        <Link to={'/message/'+item.ID} state={item} className='w-full flex flex-row items-start justify-between'>
            <b>{item.Betreff}</b>
            <div className='text-sm dark:text-white text-black font-sans font-semibold'>{item.FormattedDate}</div>
        </Link>
        <div className='w-full flex flex-row items-start justify-between'>
            <Link to={'/message/'+item.ID} state={item} className='text-[13px] text-gray-500 font-[arial] w-[90%] flex flex-row items-center justify-start'>
            {
                parseInt(item.Anhang)>0?
                <div className='w-6 aspect-square dark:text-gray-400 cursor-pointer dark:bg-gray-900 bg-gray-100 shadow-inner  shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-700 ring-gray-300'>
                    <MdAttachment  title='Nachricht beinhaltet Anhänge' className='inline' />
                </div>
                :''
            }
            {
                item.Wichtig>0?
                <div className='w-4 aspect-square cursor-pointer  dark:bg-red-800 bg-red-500 text-white shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-red-700 ring-red-600'>
                <MdPriorityHigh  title='Als wichtig makiert' className='inline' />
                </div>
                :''
            }
            <p className=' truncate'>{item.Nachricht}</p>
            </Link>
            <div className='text-sm flex flex-row items-start justify-start'>

            
            <div onClick={()=>deleter(item.ID)} className='w-6 aspect-square cursor-pointer dark:bg-red-800 bg-red-500 text-white shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-red-700 ring-red-600'>
                <MdDeleteForever  title='Löschen' className='inline' />
            </div>
            <div onClick={()=>markread(item.ID,1)} className='w-6 aspect-square cursor-pointer dark:bg-violet-800 bg-violet-500 text-white shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-violet-700 ring-violet-600'>
                <MdMarkEmailRead  title='Gelesen makieren' className='inline' />
            </div>

            </div>
        </div>
    </div>
</div> 
   :
   <div className='w-full dark:bg-gray-900 bg-white dark:hover:bg-orange-300/20 hover:bg-blue-500/10 cursor-pointer grid grid-cols-12 items-start justify-items-start'>
    <div className='w-full flex flex-row items-center justify-center py-2'>
    <input
            type="checkbox"
            checked={selected.includes(item.ID)}
            onChange={()=>selhandler(item.ID)}
            className=' w-4 aspect-square mr-4 dark:bg-[#19263a] bg-white shadow-inner  dark:shadow-[rgba(0,120,200,0.03)] shadow-gray-700/30 outline-none text-sm'  
            /> 
    <Link to={'/message/'+item.ID} state={item} className='w-12 aspect-square dark:bg-blue-100 bg-blue-300 text-gray-800 rounded-full flex flex-col items-center justify-center' >
                        <b className='text-sm uppercase'>{item.Sender.includes('+') ? (item.Sender.replace(/\+/g, '')[0]+item.Sender.replace(/\+/g, '')[1]) : (item.Sender[0]+item.Sender[1])}</b>
    </Link>
    </div>
    <div className='w-full col-span-11 px-8  py-2 pl-0 flex flex-col items-start justify-start gap-y-2'>
        <Link to={'/message/'+item.ID} state={item} className='w-full flex flex-row items-start justify-between'>
            <b>{item.Betreff}</b>
            <div className='text-sm dark:text-white text-black font-sans font-semibold'>{item.FormattedDate}</div>
        </Link>
        <div className='w-full flex flex-row items-start justify-between'>
            <Link to={'/message/'+item.ID} state={item} className='text-[13px] text-gray-500 font-[arial] w-[90%] flex flex-row items-center justify-start'>
            {
                parseInt(item.Anhang)>0?
                <div className='w-6 aspect-square dark:text-gray-400 cursor-pointer dark:bg-gray-900 bg-gray-100 shadow-inner  shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-gray-700 ring-gray-300'>
                    <MdAttachment  title='Nachricht beinhaltet Anhänge' className='inline' />
                </div>
                :''
            }
            {
                item.Wichtig>0?
                <div className='w-4 aspect-square cursor-pointer  dark:bg-red-800 bg-red-500 text-white shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-red-700 ring-red-600'>
                <MdPriorityHigh  title='Als wichtig makiert' className='inline' />
                </div>
                :''
            }
            <p className=' truncate'>{item.Nachricht.trim().length>0?item.Nachricht:'...'}</p>
            </Link>
            <div className='text-sm flex flex-row items-start justify-start'>  
            <div onClick={()=>deleter(item.ID)} className='w-6 aspect-square cursor-pointer dark:bg-red-800 bg-red-500 text-white shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-red-700 ring-red-600'>
                <MdDeleteForever  title='Löschen' className='inline' />
            </div> 
            <div onClick={()=>markread(item.ID,0)} className='w-6 aspect-square cursor-pointer dark:bg-yellow-800 bg-yellow-500 text-white shadow-inner dark:shadow-[rgba(255,255,255,0.1)] shadow-[rgba(0,0,0,0.1)] rounded mr-2 flex flex-col items-center justify-center ring-1 dark:ring-yellow-700 ring-yellow-600'>
                <MdMarkEmailUnread  title='Ungelesen makieren' className='inline' />
            </div>

            </div>
        </div>
    </div>
</div>                        
  )
}

export default RowMessage