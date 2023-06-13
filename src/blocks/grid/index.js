import { registerBlockType } from '@wordpress/blocks'
import edit from './edit'
import save from './save'
import metadata from './block.json'
import './style.scss'

registerBlockType(metadata.name, {
	edit,
	save,
	icon: {
		src: (
			<svg
				width='17'
				height='17'
				viewBox='0 0 17 17'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					fill-rule='evenodd'
					clip-rule='evenodd'
					d='M8.9386 0.674988H14.1263C15.6795 0.674988 16.9386 1.93409 16.9386 3.48727V8.67499V13.8627C16.9386 15.4159 15.6795 16.675 14.1263 16.675H8.9386H3.75088C2.1977 16.675 0.938599 15.4159 0.938599 13.8627V8.67499V3.48727C0.938599 1.93409 2.1977 0.674988 3.75089 0.674988H8.9386ZM2.19457 8.047V3.48727C2.19457 2.62775 2.89136 1.93096 3.75089 1.93096H8.31061V8.047H2.19457ZM2.19457 9.30297V13.8627C2.19457 14.7222 2.89136 15.419 3.75088 15.419H8.31061V9.30297H2.19457ZM9.56659 15.419H14.1263C14.9858 15.419 15.6826 14.7222 15.6826 13.8627V9.30297H9.56659V15.419ZM15.6826 8.047H9.56659V1.93096H14.1263C14.9858 1.93096 15.6826 2.62775 15.6826 3.48727V8.047Z'
					fill='black'
				/>
			</svg>
		)
	}
})
