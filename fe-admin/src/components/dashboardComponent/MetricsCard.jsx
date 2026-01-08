import React from 'react'
import { IoIosPeople } from 'react-icons/io'

const MetricsCard = ({title, Icon, total}) => {
  return (
    <>
            <div className='border shadow rounded d-flex gap-3 p-3'>
              <div>
                <Icon style={{color:"#be2684ff"}} size={50} />
              </div>
              <div>
                <span className='fw-bold'>
                {title}
                </span>
                <h4>{total}</h4>
                {/* <span>This Month</span> */}
              </div>
            </div>
    </>
  )
}

export default MetricsCard