"use client"

import { useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RiAddCircleFill } from "react-icons/ri"
import CustomSheets from "@/components/ui/custom-sheets"
import {columns} from './_parts/column'
import { CUstomDataTable } from "@/components/ui/custom-data-table"
import { useSheet } from "@/store/use-sheet"
import { useLocation } from "@/store/use-location"
import { baseUrl } from "@/lib/variable"
import LocationForm from "./_parts/form"
import CustomModal from "@/components/ui/custoom-dialog"
import { useModal } from "@/store/use-modal"
import LoadingIcons from "react-loading-icons"
import toast from "react-hot-toast"
import { AuthContex } from "@/providers/auth-provider"
import { CheckAvaibilityAction } from "@/lib/utils"


const RoomPage = () => {
  
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const { isOpen, setIsOpen } = useSheet()
  const { locations, loading, getAllLocation, locationAttributes, deleteLocation, locationUrl } : any = useLocation()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()
  

  useEffect(() => {
    getAllLocation(`${baseUrl}${prefix}/location`)
  }, [prefix])

  const handleDelete = async () => {
    try {
      await deleteLocation(`${baseUrl}${prefix}/location/${modalId}`)
      await getAllLocation(locationUrl)
      toast.success('Location deleted successfully')
      setIsOpenModal(false)
    } catch (error:any) {
      setIsOpenModal(false)
      toast.error(error.data.message)
    }
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800">Location</h2>
          <p className="text-gray-500 text-sm">List Locations</p>
        </div>
        {
          CheckAvaibilityAction(permision,'view','location', role) && prefix &&
          <div>
            <Button onClick={() => setIsOpen(true)}> <RiAddCircleFill className="mr-2"/> Add Location</Button>
          </div>
        }
      </div>
      
      {/* <RoomTable /> */}
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={locations} 
          loading={loading} 
          dataPage={locationAttributes.to}
          dataTotal={locationAttributes.total}
          totalPages={locationAttributes.last_page}
          links= {locationAttributes.links}
          nextPage={getAllLocation}
        />
      </div>
        
      <CustomSheets isOpen={isOpen} title="Add Location" close={() => setIsOpen(false)}>
        <LocationForm/>
      </CustomSheets>

      <CustomModal
        open={isOpenModal} 
        onOpenChange={() => setIsOpenModal(false)} 
        title='Delete Data'
      >
          <div>
            <p className='text-gray-700 my-6 text-center'>
              Are you sure you want to delete this data?
              <br />
              <b>This action cannot be undone</b>
            </p>
            <div className='flex justify-end gap-4'>
              <Button onClick={() => setIsOpenModal(false)} variant={"outline"}>Cancel</Button>
              <Button onClick={() => handleDelete()}
                disabled={loading}
              >
                {loading &&
                  <LoadingIcons.Oval stroke='#fff' strokeWidth={5} className="w-4 h-4 mr-3" />
                }
                delete
              </Button>
            </div>
          </div>
      </CustomModal>
    </>
  )
}

export default RoomPage
