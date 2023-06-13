import { __ } from '@wordpress/i18n'
import {
	InspectorControls,
	useBlockProps,
	InnerBlocks
} from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components'
import './editor.scss'

const ALLOWED_BLOCKS = ['rgdevme/slide', 'core/group']

export default ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps()
	const className = blockProps.className + ' wp-block-rgdevme'
	const { slidesToShow, slidesToScroll, showButtons, showDots } = attributes

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Slider options')} initialOpen>
					<ToggleControl
						checked={showButtons}
						onChange={() => setAttributes({ showButtons: !showButtons })}
						label='Show buttons'
					/>
					<ToggleControl
						checked={showDots}
						onChange={() => setAttributes({ showDots: !showDots })}
						label='Show dots'
					/>
					<RangeControl
						value={slidesToShow}
						onChange={v => setAttributes({ slidesToShow: v })}
						help='Please select how many items you would like to show on screen'
						initialPosition={1}
						label='Items per row'
						max={12}
						min={1}
					/>
					<RangeControl
						value={slidesToScroll}
						onChange={v => setAttributes({ slidesToScroll: v })}
						help='Please select how many items you would like to scroll'
						initialPosition={3}
						label='Step size'
						max={6}
						min={1}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} className={className}>
				<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
			</div>
		</Fragment>
	)
}
