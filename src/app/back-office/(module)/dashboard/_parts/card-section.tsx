import React from 'react'
import DashboardCard from './card'

const CardSection = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>

        <DashboardCard
          title="Total Schedules"
          subtitle="schedules"
          count={10}
          icon="/img/icon/calendar.png"
          link="/back-office/schedule"
          is_curency={false}
        />
        <DashboardCard
          title="Total package"
          subtitle="schedules"
          count={10}
          icon="/img/icon/list.png"
          link="/back-office/schedule"
          is_curency={false}
        />
        <DashboardCard
          title="Schedule Booked"
          subtitle="schedules"
          count={10}
          icon="/img/icon/booked.png"
          link="/back-office/schedule"
          is_curency={false}
        />
        <DashboardCard
          title="Package Sold"
          subtitle="schedules"
          count={10}
          icon="/img/icon/sold.png"
          link="/back-office/schedule"
          is_curency={false}
        />
        <DashboardCard
          title="Total Income"
          count={100000000}
          icon="/img/icon/income.png"
          link="/back-office/schedule"
          is_curency={true}
        />
        <DashboardCard
          title="Total Customer"
          subtitle="customers"
          count={10}
          icon="/img/icon/customer.png"
          link="/back-office/schedule"
          is_curency={false}
        />
        <DashboardCard
          title="Total Staff"
          subtitle="staffs"
          count={10}
          icon="/img/icon/staff.png"
          link="/back-office/schedule"
          is_curency={false}
        />
        <DashboardCard
          title="Canceled Schedule"
          subtitle="schedules"
          count={10}
          icon="/img/icon/cancel.png"
          link="/back-office/schedule"
          is_curency={false}
        />

      </div>
  )
}

export default CardSection