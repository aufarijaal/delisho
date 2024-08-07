// // solved via direct dom manipulation
// function LayoutWithPageTransition(Page) {
// 	const transitionedEl = useRef(null)

//   const handleTransition = useCallback(() => {
//     transitionedEl.current.classList.toggle('animate-fade')
//     transitionedEl.current.classList.toggle('animate__fadeOut')
//   }, [])

//   useEffect(() => {
//     Inertia.on('start', handleTransition)
//     Inertia.on('finish', handleTransition)
//   }, [])

// 	return <div
//         ref={transitionedEl}
//         className='animate__animated animate-fade'>
//         {Page}
// 	</div>
// }
