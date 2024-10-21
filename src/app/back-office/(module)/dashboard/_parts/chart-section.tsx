'use client'

import React, { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import api from '@/lib/api';
import { baseUrl } from '@/lib/variable';
import toast from 'react-hot-toast';
import { Console, log } from 'console';
import { AuthContex } from '@/providers/auth-provider';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartSection = () => {

  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>()

  const chartOptions = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        rotate: -45 // Rotate labels by -45 degrees
      }
    },
    colors: ['#85BFCB'],
    plotOptions: {
      bar : {
        borderRadius: 4,
        columnWidth: '40%',
        dataLabels: {
          enabled: false,
          textAnchor: 'start',
          position: 'top', // top, center, bottom
        },
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100]
      }
    },
    dataLabels: {
      enabled: false
    }
  };

  const init  = async () => {
    try {
      setLoading(true)
      const res = await api.get(`${baseUrl}/admin/dashboard-chart`)
      setData(Object.values(res.data))
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      console.log(toast.error(error.data.message))
    }
  }

  useEffect(() => {
    init()
  },[prefix])


  return (
    <div>
      <p className='text-gray-500 mb-4 font-semibold'>Transaction Chart</p>
      <Chart
        options={chartOptions}
        series={[
          {
            name: 'total income Rp.',
            // data: [2000000, 1000000, 2500000, 10000000, 15000000, 30000000, 14000000, 9000000, 17500000]
            data: [...data ?? []]
          }
        ]}
        type="bar"
        height={400}
      />
    </div>
  )
}

export default ChartSection