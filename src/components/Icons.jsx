export const CatIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cat">
      <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5ZM8 14v.5M16 14v.5"/>
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>
    </svg>    
  )
}

export const HeartIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor" stroke="currentColor" strokeWidth="0" className="lucide lucide-heart">
      <path d="m47.6 300.4 180.7 168.7c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l180.7-168.7c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141-45.6-7.6-92 7.3-124.6 39.9l-12 12-12-12c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
    </svg>
  )
}

export const TrashIcon = () => {
  return (
    <svg height="1em" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
    </svg>
  )
}

export const WomanIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      style={{
        fill: '#f81bf1',
      }}
      viewBox="0 0 384 512"
      {...props}
    >
      <path d="M80 176a112 112 0 1 1 224 0 112 112 0 1 1-224 0zm144 173.1c81.9-15 144-86.8 144-173.1C368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144 173.1V384h-32c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v32c0 17.7 14.3 32 32 32s32-14.3 32-32v-32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32h-32v-34.9z" />
    </svg>
  )
}

export const ManIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      style={{
        fill: '#5b88d7',
      }}
      viewBox="0 0 448 512"
      {...props}
    >
      <path d="M289.8 46.8c3.7-9 12.5-14.8 22.2-14.8h112c13.3 0 24 10.7 24 24v112c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4-52.6 52.6c19.5 28.4 31 62.7 31 99.8 0 97.2-78.8 176-176 176S0 401.2 0 304s78.8-176 176-176c37 0 71.4 11.4 99.8 31l52.6-52.6L295 73c-6.9-6.9-8.9-17.2-5.2-26.2zM400 80zM176 416a112 112 0 1 0 0-224 112 112 0 1 0 0 224z" />
    </svg>
  )
}

export const PhoneIcon = () => {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
  </svg>
  )
}

export const MailIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-at" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
   <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28"></path>
  </svg>
  )
}