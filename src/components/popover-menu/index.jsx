import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

const PopoverMenu = ({
  mainButtonText = "",
  children
}) => {
  return (
    <Popover>
      <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
        {mainButtonText}
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="rounded-xl shadow-2xl p-2 min-h-10 min-w-32 bg-white text-sm/6 transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        {children}
      </PopoverPanel>
    </Popover>
  )
}

export default PopoverMenu;