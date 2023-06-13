import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

export default props => {
	return (
		<div>
			<InnerBlocks.Content />
		</div>
	)
}
