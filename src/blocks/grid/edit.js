import { __ } from '@wordpress/i18n'
import {
	InspectorControls,
	useBlockProps,
	InnerBlocks
} from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'
import { PanelBody, RangeControl } from '@wordpress/components'
import './editor.scss'

export default ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps()
	const className = blockProps.className + ' wp-block-rgdevme'
	const { amount } = attributes

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Grid options')} initialOpen>
					<RangeControl
						value={amount}
						onChange={v => setAttributes({ amount: v })}
						help='Please select how many itmes you would like to show per row.'
						initialPosition={3}
						label='Items per row'
						max={12}
						min={1}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} className={className} data-amount={amount}>
				<InnerBlocks />
			</div>
		</Fragment>
	)
}
