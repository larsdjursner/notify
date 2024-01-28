import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreatePage } from '../../hooks/api/use-create-page.mutation'
import TooltipButton from '../generic/TooltipButton'
import Pages from './Pages'
import ProfileFlyout from './ProfileFlyout'
import TrashFlyout from './TrashFlyout'

export const Sidebar = () => {
    const [open, setOpen] = useState(true)
    const navigate = useNavigate()

    const createPage = useCreatePage()
    const handleCreatePage = async () => {
        try {
            const page = await createPage?.mutateAsync()

            if (!page) {
                return
            }

            const { id } = page

            navigate(`/app/page/${id}`)
        } catch (error) {
            navigate(`/`)

            console.error(error)
        }
    }

    return (
        <>
            <div className="flex relative">
                {open && (
                    <div className="w-60 h-full bg-white border-r px-2 py-2 flex flex-col">
                        <ProfileFlyout />
                        <Pages />

                        <span className="border-t rounded-full my-2" />

                        <TooltipButton
                            button={
                                <button
                                    onClick={handleCreatePage}
                                    className="w-full h-8 flex justify-start items-center hover:bg-slate-200 rounded-sm px-4">
                                    <PlusIcon className="h-4 w-4 mr-4" />
                                    <p>Add page</p>
                                </button>
                            }
                            tooltip={'Add a new untitled document page'}
                        />

                        {/* <TrashFlyout /> */}
                    </div>
                )}
                <ArrowRightIcon
                    className={classNames(
                        'h-6 w-6 absolute inset-y-1/2 -right-8 cursor-pointer z-50 text-gray-400',
                        'hover:scale-110 transition-all duration-200 hover:text-gray-600',
                        open ? 'rotate-180' : 'rotate-0',
                    )}
                    onClick={() => {
                        setOpen((prev) => !prev)
                    }}
                />
            </div>
        </>
    )
}
