import { __ } from '@wordpress/i18n'
import {
	InspectorControls,
	useBlockProps,
	InnerBlocks
} from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'
import { PanelBody, TextControl } from '@wordpress/components'
import image from '../../assets/arrow-down.svg'
import './editor.scss'

const ALLOWED_BLOCKS = ['core/image', 'core/paragraph']

export default ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps()
	const className = blockProps.className + ' wp-block-rgdevme'
	const { title } = attributes

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Accordion options')} initialOpen>
					<TextControl
						value={title}
						onChange={v => setAttributes({ title: v })}
						label='Title'
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} className={className}>
				<div className='rgdevme-accordion-title'>
					<span>{title}</span>
				</div>
				<div className='rgdevme-accordion-content' data-open={true}>
					<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
				</div>
				<div class='rgdevme-accordion-arrow' data-open={true}>
					<img src={image} />
				</div>
			</div>
		</Fragment>
	)
}
