const initAccordion = () => {
	const nodes = document.querySelectorAll('.wp-block-rgdevme-accordion')
	const accordions = [...nodes]

	/** @type {(event: MouseEvent, target: HTMLDivElement) => void} */
	const handleToggle = (e, parent) => {
		e.stopPropagation()
		e.preventDefault()

		/** @type {HTMLDivElement} */
		const target = parent.querySelector('.rgdevme-accordion-content')

		/** @type {HTMLDivElement} */
		const toggle = parent.querySelector('.rgdevme-accordion-arrow')

		/** @type {HTMLDivElement} */
		const content = target.querySelector(':scope > div')

		const height = content.offsetHeight
		const state = target.dataset.open !== 'true'

		toggle.dataset.open = state
		target.dataset.open = state
		target.style.height = state ? `${height}px` : 0
	}

	accordions.forEach(accordion => {
		/** @type {HTMLDivElement} */
		const toggle = accordion.querySelector('.rgdevme-accordion-arrow')
		accordion.addEventListener('click', e => handleToggle(e, accordion))
	})
}

document.addEventListener('DOMContentLoaded', initAccordion)
